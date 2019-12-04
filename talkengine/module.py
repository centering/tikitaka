#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Ownership: Piglet team, AI Center, SK Telecom

import random
import faiss
import math
import numpy as np
import difflib

from faiss import normalize_L2
from collections import Counter
from typing import Optional, Tuple

from .abstract import AbstractConvEngine
from .data_util import ScenarioDataController
from .utils import normalize_text

import eeyore
from eeyore.models.slang_filtering.Detection import SlangDetectionInferencer
from eeyore.models.smalltalk.RetrievalDialog import RetrievalDialogInferencer
from eeyore.models.smalltalk.WEAN import SmalltalkWEANInferencer


class ConversationEngine(AbstractConvEngine):
    def __init__(self,
                 scenario_model: AbstractConvEngine,
                 smalltalk_model: AbstractConvEngine):

        self.scenario_model = scenario_model
        self.smalltalk_model = smalltalk_model

    def predict(self, text: str) -> str:
        # 0) text normalize
        text = normalize_text(text)

        # 1) scenario analysis
        response = self.scenario_model.predict(text)

        # 2) smalltalk model
        if not response:
            response = self.smalltalk_model.predict(text)

        return response


class SmalltalkEngine(AbstractConvEngine):
    def __init__(self):
        super().__init__()

        # future work: DB connection
        self.slang_responses = [r'바르고 고운말을 씁시다 ^^', r'욕하지 말아주세요 ㅠㅠ', r'욕은 정신건강에 좋지 않아요']
        self.cant_responses = [r"죄송합니다. 이해하지 못했어요 ㅠㅠ", r'잘 못들었지 말입니다??', r'무슨 말씀이신지 이해하지 못했습니다.']
        self.cant_responses_short = [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']

        wean_args = eeyore.model_config.smalltalk.WEAN
        self.inferencer = SmalltalkWEANInferencer(wean_args)
        self.inferencer.load_model()

        slang_args = eeyore.model_config.slang_filtering.Detection
        self.slang_detector = SlangDetectionInferencer(slang_args)
        self.slang_detector.load_model()

    def predict(self, text: str) -> str:
        if not text:
            return self._generate_cant_response(is_short=True)

        # Filter slangs
        responses, probs = self.slang_detector.infer(text)
        print(responses, probs)
        if responses[0] == 1:
            return self._generate_slang_response(probs[0])

        response = self.inferencer.infer(text)[0]

        # 3) Post processing
        if not response:
            response = self._generate_cant_response(is_short=(len(text) <= 5))

        return response

    def _generate_slang_response(self, prob: float) -> str:
        res = '고객님, {}%의 확률로 욕이 탐지되었습니다. '.format(min(prob * 100, 99.))
        res_candidates = [res + s for s in self.slang_responses]
        return random.choice(res_candidates)

    def _generate_cant_response(self, is_short: bool) -> str:
        responses = self.cant_responses_short if is_short else self.cant_responses
        return random.choice(responses)


class ScenarioAnalysisEngine(AbstractConvEngine):
    def __init__(self,
                 data_controller: ScenarioDataController,
                 k: int):

        retrieval_args = eeyore.model_config.smalltalk.RetrievalDialog
        self.inferencer = RetrievalDialogInferencer(retrieval_args)
        self.inferencer.load_model()

        self.data_controller = data_controller

        self.ques_embedding_dict = data_controller.query_embedding_dict
        self.querys = self.ques_embedding_dict['sentences']
        self.response_cluster_dict = data_controller.response_cluster_dict
        self.thres_prob = data_controller.threshold_dict['scenario_similarity_threshold']

        self.k = k

        self.faiss_index, self.class_list = self._faiss_indexing()

    def predict(self, text: str) -> str:
        response = ""
        # update
        ques_embedding_dict, response_cluster_dict = self.data_controller.update()
        if self.ques_embedding_dict != ques_embedding_dict:
            self.ques_embedding_dict = ques_embedding_dict
            self.querys = self.ques_embedding_dict['sentences']
            self.faiss_index, self.class_list = self._faiss_indexing()

        if self.response_cluster_dict != response_cluster_dict:
            self.response_cluster_dict = response_cluster_dict

        self.thres_prob = self.data_controller.threshold_dict['scenario_similarity_threshold']

        # 1) exact matching
        res_class = self._exact_matching(text)
        if res_class:
            response = self._generate_response(res_class)

        # 2) similarity analysis
        else:
            # a) character similarity
            res_class = self._char_similarity_analysis(text)
            if res_class:
                response = self._generate_response(res_class)
            # b) semantic similarity
            else:
                query_vec = self.inferencer.infer(text)
                query_vec = np.array(query_vec).astype(np.float32)

                if len(query_vec) == 0:
                    return ""

                normalize_L2(query_vec)

                D, I = self.faiss_index.search(query_vec, self.k)
                topk_class = [self.class_list[i] for i in I[0]]

                pred_counts = Counter(topk_class)
                res_class = max(pred_counts)
                max_prob = D[0].max()

                if pred_counts[res_class] >= math.ceil(self.k / 2) and max_prob >= self.thres_prob:
                    response = self._generate_response(res_class)
        return response

    def _generate_response(self, res_class: int) -> str:
        res_candidates = self.response_cluster_dict[res_class]
        return random.choice(res_candidates)

    def _faiss_indexing(self) -> Tuple[Optional[faiss.IndexFlatIP], list]:
        query_vectors = self.ques_embedding_dict['vectors']
        class_list = self.ques_embedding_dict['class']

        if len(query_vectors) == 0:
            return None, []

        normalize_L2(query_vectors)
        index = faiss.IndexFlatIP(512)
        index.add(query_vectors)
        return index, class_list

    def _exact_matching(self, query: str) -> Optional[int]:
        response_class = None

        query_wo_space = query.replace(" ", "")

        preset_sents = self.ques_embedding_dict['sentences']
        preset_sents_wo_space = [s.replace(" ", "") for s in preset_sents]

        if query_wo_space in preset_sents_wo_space:
            preset_classes = self.ques_embedding_dict['class']
            response_class = preset_classes[preset_sents_wo_space.index(query_wo_space)]
        return response_class

    def _char_similarity_analysis(self, text: str) -> Optional[int]:
        # TBD: draw cutoff threshold from DB
        response_class = None
        out = difflib.get_close_matches(text, self.querys, n=1, cutoff=0.5)
        if len(out) == 1:
            idx = self.querys.index(out[0])
            response_class = self.ques_embedding_dict['class'][idx]
        return response_class

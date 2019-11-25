#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Ownership: Piglet team, AI Center, SK Telecom

import random
import requests
import faiss
import math
import numpy as np

from faiss import normalize_L2
from collections import Counter
from abstract import AbstractConvEngine


class ConversationEngine(AbstractConvEngine):
    def __init__(self,
                 scenario_model,
                 smalltalk_model):

        self.scenario_model = scenario_model
        self.smalltalk_model = smalltalk_model

    def predict(self, text):
        # 1) scenario analysis
        response = self.scenario_model.predict(text)

        # 2) smalltalk model
        if not response:
            response = self.smalltalk_model.predict(text)

        return response


class SmalltalkEngine(AbstractConvEngine):
    def __init__(self,
                 slangmodel_endpoint_path: str,
                 talkmodel_endpoint_path: str):
        super().__init__()

        # future work: DB connection
        self.slang_responses = [r'바르고 고운말을 씁시다 ^^', r'욕하지 말아주세요 ㅠㅠ', r'욕은 정신건강에 좋지 않아요']
        self.cant_responses = [r"죄송합니다. 이해하지 못했어요 ㅠㅠ", r'잘 못들었지 말입니다??', r'무슨 말씀이신지 이해하지 못했습니다.']
        self.cant_responses_short = [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']

        self.talkmodel_endpoint_path = talkmodel_endpoint_path
        self.slangmodel_endpoint_path = slangmodel_endpoint_path

    def predict(self, text: str):
        query = {'query': text}
        # 1) slang detection
        #response = requests.post(self.slangmodel_endpoint_path, json=query).json()
        #response = response['result'][0]
        #s_match = response['type']
        #prob = response['score']

        #if s_match == 1:
        #    response = self._generate_slang_response(prob)
        # 2) Conversation model
        #elif s_match == 0:
        query = {'query': text}
        response = requests.post(self.talkmodel_endpoint_path, json=query).json()
        response = response['answer'][0]

        # 3) Post processing
        if response == '' and len(text) <= 5:
            response = self._generate_cant_response(is_short=True)
        elif response == '':
            response = self._generate_cant_response(is_short=False)
        return response

    def _generate_slang_response(self, prob: float):
        res = '고객님, {}%의 확률로 욕이 탐지되었습니다. '.format(min(99., prob*100))
        res_candidates = [res + s for s in self.slang_responses]
        return random.sample(res_candidates, 1)[0]

    def _generate_cant_response(self, is_short: bool):
        if is_short:
            return random.sample(self.cant_responses_short, 1)[0]
        else:
            return random.sample(self.cant_responses, 1)[0]


class ScenarioAnalysisEngine(AbstractConvEngine):
    def __init__(self,
                 input_embedding_endpoint: str,
                 ques_embedding_dict: dict,
                 response_cluster_dict: dict,
                 k: int,
                 thres_prob: float):

        self.input_embedding_endpoint = input_embedding_endpoint
        self.ques_embedding_dict = ques_embedding_dict
        self.response_cluster_dict = response_cluster_dict
        self.k = k
        self.thres_prob = thres_prob

        self.faiss_index, self.class_list = self._faiss_indexing()

    def predict(self, text):
        response = None

        # 1) exact matching
        res_class = self._exact_matching(text)
        if res_class:
            response = self._generate_response(res_class)

        # 2) similarity analysis
        else:
            query = {'query': text}
            res = requests.post(self.input_embedding_endpoint, json=query).json()
            query_vec = np.array(res['vectors']).astype(np.float32)
            normalize_L2(query_vec)

            D, I = self.faiss_index.search(query_vec, self.k)
            topk_class = [self.class_list[i] for i in I[0]]

            pred_counts = Counter(topk_class)
            res_class = max(pred_counts)
            max_prob = D[0].max()

            if pred_counts[res_class] >= math.ceil(self.k / 2) and max_prob >= self.thres_prob:
                response = self._generate_response(res_class)
        return response

    def _generate_response(self, res_class):
        res_candidates = self.response_cluster_dict[res_class]
        return random.sample(res_candidates, 1)[0]

    def _faiss_indexing(self):
        query_vectors = self.ques_embedding_dict['vectors']
        class_list = self.ques_embedding_dict['class']

        index = faiss.IndexFlatIP(512)
        normalize_L2(query_vectors)
        index.add(query_vectors)
        return index, class_list

    def _exact_matching(self, query: str):
        response_class = None

        query_wo_space = ''.join(query.split(" "))

        preset_sents = self.ques_embedding_dict['sentences']
        preset_sents_wo_space = [''.join(s.split(" ")) for s in preset_sents]

        preset_classes = self.ques_embedding_dict['class']

        if query_wo_space in preset_sents_wo_space:
            response_class = preset_classes[preset_sents_wo_space.index(query_wo_space)]
        return response_class
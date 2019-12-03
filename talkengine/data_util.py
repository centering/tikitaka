import pandas as pd
import numpy as np

import importlib

import sys
import os

from .utils import normalize_text

root_path = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(root_path + '/backend')

mod = importlib.import_module('model.scenario_dao')
ScenarioDao = mod.ScenarioDao

mod_set = importlib.import_module('model.setting_dao')
SettingDao = mod_set.SettingDao


class DataController:
    def __init__(self, inferencer):
        self.inferencer = inferencer
        self.init_setup()

    def init_setup(self):
        (query_class, querys), (res_class, self.responses) = self._get_query_response()
        self.threshold_dict = self._get_threshold()

        self.query_embedding_dict = construct_ques_embed_dict(querys, query_class, self.inferencer)
        self.response_cluster_dict = construct_res_cluster_dict(self.responses, res_class)
        return self.query_embedding_dict, self.response_cluster_dict

    def update(self):
        query_embedding_dict, response_cluster_dict = self._update_query_response()
        return query_embedding_dict, response_cluster_dict

    def _update_query_response(self):
        self.threshold_dict = self._get_threshold()
        (query_class, querys), (response_class, responses) = self._get_query_response()

        # update query
        pre_query_set = [(i, t) for i, t in
                         zip(self.query_embedding_dict['class'], self.query_embedding_dict['sentences'])]
        new_query_set = [(i, t) for i, t in zip(query_class, querys)]

        new_query = list(set(new_query_set).difference(pre_query_set))
        delete_query = list(set(pre_query_set).difference(new_query_set))
        remain_idx = [i for i in range(len(pre_query_set)) if pre_query_set[i] not in delete_query]

        if len(delete_query) > 0:
            self.query_embedding_dict['sentences'] = [self.query_embedding_dict['sentences'][i] for i in remain_idx]
            self.query_embedding_dict['vectors'] = [self.query_embedding_dict['sentences'][i] for i in remain_idx]
            self.query_embedding_dict['class'] = [self.query_embedding_dict['sentences'][i] for i in remain_idx]

        if len(new_query) > 0:
            new_query_class = [q[0] for q in new_query]
            new_querys = [q[1] for q in new_query]
            new_query_embedding_dict = construct_ques_embed_dict(new_querys, new_query_class, self.inferencer)

            query_embed_dict = {}
            for k in self.query_embedding_dict.keys():
                if self.query_embedding_dict[k].__class__ == np.ndarray:
                    query_embed_dict[k] = [d[k] for d in
                                           np.concatenate([self.query_embedding_dict, new_query_embedding_dict])]
                else:
                    query_embed_dict[k] = [d[k] for d in [self.query_embedding_dict, new_query_embedding_dict]]
            self.query_embedding_dict = query_embed_dict

        # update response
        if responses == self.responses:
            response_cluster_dict = self.response_cluster_dict
        else:
            response_cluster_dict = construct_res_cluster_dict(responses, response_class)
            self.responses = responses

        return self.query_embedding_dict, response_cluster_dict

    def _get_query_response(self):
        query_response = ScenarioDao.get_entire_scenario_query_response()

        query_class, scenario_query = [], []
        for res in query_response[0]:
            query_class.append(res['scenario_id'])
            scenario_query.append(normalize_text(res['text']))

        response_class, scenario_response = [], []
        for res in query_response[1]:
            response_class.append(res['scenario_id'])
            scenario_response.append(res['text'])
        return (query_class, scenario_query), (response_class, scenario_response)

    def _get_threshold(self):
        output = {}
        for res in SettingDao.get_setting_list():
            output[res['name']] = res['value']
        return output


def construct_ques_embed_dict(querys: list, cateogry: list, inferencer):
    vectors = inferencer.infer(querys)
    vectors = np.array(vectors).astype(np.float32)

    out_dict = {}
    out_dict['sentences'] = querys
    out_dict['vectors'] = vectors
    out_dict['class'] = cateogry
    return out_dict


def construct_res_cluster_dict(responses: list, category: list):
    output = {}
    for cate in list(set(category)):
        output[cate] = []

    for res, cate in zip(responses, category):
        output[cate].append(res)

    for key in output.keys():
        output[key] = list(set(output[key]))
    return output


def construct_output(dataset: pd.DataFrame):
    res_cluster = construct_res_cluster_dict(dataset['sentence2'].tolist(), dataset['class'].tolist())
    ques_embed = construct_ques_embed_dict(dataset['sentence1'].tolist(), dataset['class'].tolist())
    return res_cluster, ques_embed

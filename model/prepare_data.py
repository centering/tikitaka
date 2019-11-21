#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Ownership: Piglet team, AI Center, SK Telecom

import pandas as pd
import requests
import numpy as np
import pickle
import argparse

from config import ModelConfig as config

parser = argparse.ArgumentParser()

parser.add_argument('-root_path',
                    type=str,
                    default=None,
                    help='resource folder path')

parser.add_argument('-input_path',
                    type=str,
                    default=None,
                    help='input data tsv path')

args = parser.parse_args()


def construct_ques_embed_dict(querys: list, cateogry: list):
    url = config.Retrieval_Encoder.endpoint

    query = {'query': querys}
    response = requests.post(url, json=query).json()
    vectors = response['vectors']
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
    return output


if __name__ == '__main__':
    data = pd.read_csv(args.input_path, sep='\t')

    res_cluster_dict = construct_res_cluster_dict(data['sentence2'].tolist(), data['class'].tolist())
    with open(args.root_path + '/res_cluster_dict.pkl', 'wb') as file:
        pickle.dump(res_cluster_dict, file)
    print('* response - cluster dictionary is saved')

    ques_embed_dict = construct_ques_embed_dict(data['sentence1'].tolist(), data['class'].tolist())
    with open(args.root_path + '/ques_embed_dict.pkl', 'wb') as file:
        pickle.dump(ques_embed_dict, file)
    print('* question - embedding dictionary is saved')
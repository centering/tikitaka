#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Ownership: Piglet team, AI Center, SK Telecom

import pandas as pd
import requests
import numpy as np
import pickle
import argparse
import os

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

    for key in output.keys():
        output[key] = list(set(output[key]))

    return output


def construct_output(dataset: pd.DataFrame):
    res_cluster = construct_res_cluster_dict(dataset['sentence2'].tolist(), data['class'].tolist())
    ques_embed = construct_ques_embed_dict(dataset['sentence1'].tolist(), data['class'].tolist())
    return res_cluster, ques_embed


def save_output(res_cluster: dict, ques_embed: dict):
    # save
    with open(args.root_path + '/res_cluster_dict.pkl', 'wb') as file:
        pickle.dump(res_cluster, file)
    print('* response - cluster dictionary is saved')

    with open(args.root_path + '/ques_embed_dict.pkl', 'wb') as file:
        pickle.dump(ques_embed, file)
    print('* question - embedding dictionary is saved')


if __name__ == '__main__':
    data = pd.read_csv(args.input_path, sep='\t')
    res_cluster_dict, ques_embed_dict = {}, {}

    if os.path.isfile(args.root_path + '/ques_embed_dict.pkl'):
        with open(args.root_path + '/ques_embed_dict.pkl', 'rb') as file:
            ques_embed_dict_old = pickle.load(file)

        uniq_sents = list(set(data['sentence1'].tolist()).difference(set(ques_embed_dict_old['sentences'])))
        uniq_idx = [i for i, s in enumerate(data['sentence1'].tolist()) if s in uniq_sents]
        data_new = data.iloc[uniq_idx]

        if len(uniq_idx) == 0:
            print("* No new sentences are added")
            pass
        else:
            res_cluster_dict, ques_embed_dict_new = construct_output(data_new)

            ques_embed_dict = {}
            for k in ques_embed_dict_old.keys():
                ques_embed_dict[k] = [d[k] for d in [ques_embed_dict_old, ques_embed_dict_new]]

            print(" {} more sentences are added".format(len(uniq_idx)))

            # save
            save_output(res_cluster_dict, ques_embed_dict)
    else:
        res_cluster_dict, ques_embed_dict = construct_output(data)
        # save
        save_output(res_cluster_dict, ques_embed_dict)
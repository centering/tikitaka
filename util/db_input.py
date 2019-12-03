import pandas as pd
import json
import pymysql
from tqdm import tqdm
import requests

data = pd.read_csv('./tikitaka_data/takgu_smalltalk_sample.tsv', sep='\t', header=None)

output = {}
for i in range(int(len(data)/3)):
    scenario_group = data.iloc[i*3].tolist()[0]
    output[scenario_group] = {}

for i in range(int(len(data) / 3)):
    scenario_group = data.iloc[i * 3].tolist()[0]
    scenario = data.iloc[i*3].tolist()[1]
    query = data.iloc[i*3+1].dropna().tolist()[1:]
    answer = data.iloc[i*3+2].dropna().tolist()[1:]

    output[scenario_group][scenario] = {}
    output[scenario_group][scenario]["query"] = query
    output[scenario_group][scenario]["answer"] = answer

scenario_groups = list(output.keys())

## 1) scenario group
# 1) existing info
url = 'http://52.141.21.117:8080/api/v1/scenario_group/'
response = requests.get(url).json()
id_sgroup = response['data']

group_id = {}
for res in id_sgroup:
    group_id[res['name']] = res['id']

new_sgroup = list(set(list(output.keys())).difference(set(group_id.keys())))

if len(new_sgroup) == 0:
    new_sgroup = list(output.keys())

for group_name in tqdm(new_sgroup):
    body = {"name": group_name}
    res = requests.post(url, json=body)

## 2) scenario
# 1. get scenario group id
url = 'http://52.141.21.117:8080/api/v1/scenario_group/'
response = requests.get(url).json()
id_sgroup = response['data']

group_id = {}
for res in id_sgroup:
    group_id[res['name']] = res['id']

output['취향']

# 2. put new instance
url = 'http://52.141.21.117:8080/api/v1/scenario/'

for key in tqdm(list(group_id.keys())):
    key = '취향'
    for scenario_name in list(output[key].keys()):
        body = {"scenario_group_id": group_id[key]}
        req = requests.post(url, json=body)

        req = requests.get(url+"?scenario_group_id="+str(group_id[key]))
        scenario_id = req.json()['data'][-1]['id']

        body = {
            "scenario_id": scenario_id,
            "scenario_query": output[key][scenario_name]['query'],
            "scenario_response": output[key][scenario_name]['answer']
        }
        req = requests.put(url, json=body)
        print(req)

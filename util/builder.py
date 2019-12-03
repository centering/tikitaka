import pandas as pd
import json

data = pd.read_csv('./tikitaka_data/takgu_smalltalk_sample.tsv', sep='\t', header=None)
output = {}
for i in range(int(len(data)/3)):
    class_name = "_".join(data.iloc[i*3].tolist()[:2])
    query = data.iloc[i*3+1].dropna().tolist()[1:]
    answer = data.iloc[i*3+2].dropna().tolist()[1:]

    output[class_name] = {}
    output[class_name]["query"] = query
    output[class_name]["answer"] = answer

with open('./tikitaka_data/data_json.json', 'w', encoding='utf-8') as file:
    json.dump(output, file, ensure_ascii=False)

sentence1, sentence2 = [], []
for key in output.keys():
    sent1 = output[key]['query']
    sent2 = output[key]['answer']

    for s1 in sent1:
        for s2 in sent2:
            sentence1.append(s1)
            sentence2.append(s2)

result = pd.DataFrame()
result['sentence1'] = sentence1
result['sentence2'] = sentence2
result.to_csv('./tikitaka_data/tikitaka_pair.tsv', sep='\t', index=False, encoding='utf-8')
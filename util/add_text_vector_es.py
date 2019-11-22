from requests.auth import HTTPBasicAuth

import requests
import json

host = 'http://52.141.6.60'
port = 9200
index_name = 'twd_log_response'

elastic_user = 'elastic'
elastic_pw = 'crowdworks'

url = host  + ':' + str(port) + '/' + index_name + '/1'
headers = { 'Content-Type': 'application/json', }

data = {
    'text':'agent_response',
    'vector':[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,1.9]
}

response = requests.post(url, headers=headers, data=json.dumps(data), auth=HTTPBasicAuth(elastic_user, elastic_pw))

print (url)
print (response.content)

"""
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "my_vector": {
        "type": "dense_vector",
        "dims": 3  
      },
      "my_text" : {
        "type" : "keyword"
      }
    }
  }
}
'
curl -X PUT "localhost:9200/my_index/_doc/1?pretty" -H 'Content-Type: application/json' -d'
{
  "my_text" : "text1",
  "my_vector" : [0.5, 10, 6]
}
'
curl -X PUT "localhost:9200/my_index/_doc/2?pretty" -H 'Content-Type: application/json' -d'
{
  "my_text" : "text2",
  "my_vector" : [-0.5, 10, 10]
}
"""

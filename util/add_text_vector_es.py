import requests

hots = 'http://52.141.6.60'
port = 9200

url = host  + ':' + str(port) + '/_sql?format=json'
headers = { 'Content-Type': 'application/json', }

response = requests.p
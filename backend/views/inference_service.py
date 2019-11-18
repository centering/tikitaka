from multiprocessing.pool import ThreadPool
from flask import request
from flask_restplus import Resource, fields

try:
    from urllib.parse import urlparse
except ImportError:
    from urlparse import urlparse

from views.api import api, inference_ns
from .config import Inference_connection_info

import requests

utterance_proto = inference_ns.model("utterance_proto", {
    "query": fields.String("utterance")
})

pool = ThreadPool(processes=2)

def inference_func(query):
    url = "http://{}:{}/AMC_infer_utterance".format(Inference_connection_info.host, Inference_connection_info.port)

    response = requests.post(url, json={'query':query})

    response_obj = response.json()

    return  response_obj

def utterance_inference(query):
    return inference_func(query)

def dialog_inference(query):
    pass

@inference_ns.route('/')
@api.doc(response={404: 'error'})
class InferenceService(Resource):

    @api.expect(utterance_proto)
    def post(self):
        body = request.json

        async_result = pool.apply_async(utterance_inference, (body['query'],))
        utterance_infer_result = async_result.get()

        return {'code':'ok', 'data': utterance_infer_result}

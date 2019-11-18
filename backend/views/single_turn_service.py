from flask_restplus import Resource, fields
from views.api import api, singleTurn_ns
from flask import request, redirect, url_for

from .config import log_connection_info, Inference_connection_info
from .inference_service import pool, utterance_inference

from elasticsearch import Elasticsearch
from datetime import datetime
from multiprocessing.pool import ThreadPool
from flask_jwt_extended import jwt_required
import redis
import requests
import uuid
import os, sys
import multiprocessing

singleTurn_proto = singleTurn_ns.model("single_turn_proto", {
    "project_id": fields.Integer("Project Id"),
    "job_id": fields.Integer("Job Id"),
    "text": fields.String("Text"),
    "status": fields.String("Single Turn Generation Status")
})

singleTurn_update_proto = singleTurn_ns.model("single_turn_update_proto", {
    "project_id": fields.Integer("Project Id"),
    "job_id": fields.Integer("Job Id"),
    "gen_id": fields.Integer("Single Turn Generation Id"),
    "text": fields.String("Text"),
    "status": fields.String("Single Turn Generation Status")
})

parser = api.parser()
parser.add_argument('domain', location='args')

singleTurn_delete_parser = api.parser()
singleTurn_delete_parser.add_argument('project_id', location='args')
singleTurn_delete_parser.add_argument('job_id', location='args')
singleTurn_delete_parser.add_argument('gen_id', location='args')

singleTurn_get_parser = api.parser()
singleTurn_get_parser.add_argument('project_id', location='args')
singleTurn_get_parser.add_argument('job_id', location='args')
singleTurn_get_parser.add_argument('from', location='args')
singleTurn_get_parser.add_argument('size', location='args')

conn = redis.StrictRedis()

pool = ThreadPool(processes=multiprocessing.cpu_count())

def ELK_background_log_upsert(id, body):
    es = Elasticsearch(
        hosts=log_connection_info.host,
        http_auth=(log_connection_info.elastic_user, log_connection_info.elastic_pw),
        port=log_connection_info.port,
        timeout=20, max_retries=10, retry_on_conflict=2
    )

    es.index(index=log_connection_info.woz_log_index, id=id, body=body)

@singleTurn_ns.route('/')
@api.doc(responses={404: 'error'})
class SingleTurnService(Resource):

    @jwt_required
    @api.expect(singleTurn_proto)
    def post(self):
        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        body = request.json

        body['timestamp'] = datetime.now()

        if 'predict_req' in body.keys() and body['predict_req'] == True:
            utterance_infer_result = pool.apply_async(utterance_inference, (body['text'],))
            tag_infer_result = utterance_infer_result.get()
            body['taginfo'] = tag_infer_result['taginfo'][0]

        response = es.index(
                            index=log_connection_info.single_turn_gen_index, 
                            doc_type="single_turn_gen",
                            id=str(uuid.uuid1()),
                            body=body)

        if response['result'] == 'created':
            return {'code': 'ok', 'message': 'successed single turn generation data insert'}
        else:
            return {'code': 'error', 'message': 'fail to data insert'}

    @jwt_required
    @api.expect(singleTurn_get_parser)
    def get(self):
        args = singleTurn_get_parser.parse_args()
        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        response = es.search(
                        index=log_connection_info.single_turn_gen_index, 
                        body={
                                "query":
                                {
                                    "match":{"project_id":args['project_id']},
                                    "match":{"job_id":args['job_id']}
                                }
                            }
                        )
                        # sort='timestamp:desc') request amc

        total = response['hits']['total']

        response = es.search(
            index=log_connection_info.single_turn_gen_index,
            body={
                "query":
                    {
                        "match": {"project_id": args['project_id']},
                        "match": {"job_id": args['job_id']}
                    }
            },
            sort='_id:desc', # request amc
            from_=args['from'],
            size=args['size'])

        hit_data = []
        for eachData in response['hits']['hits']:
            gen_data = {}
            gen_data['gen_id'] = eachData['_id']
            gen_data['text'] = eachData['_source']['text']
            gen_data['status'] = eachData['_source']['status']
            if 'taginfo' in eachData['_source'].keys():
                gen_data['taginfo'] = eachData['_source']['taginfo']

            hit_data.append(gen_data)

        return { 'code':'ok', 'data': hit_data, 'total': total }

    @jwt_required
    @api.expect(singleTurn_update_proto)
    def put(self):
        args = request.json
        args['timestamp'] = datetime.now()
        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        gen_id =args.pop('gen_id')

        if 'predict_req' in args.keys() and args['predict_req'] == True:
            utterance_infer_result = pool.apply_async(utterance_inference, (args['text'],))
            tag_infer_result = utterance_infer_result.get()
            args['taginfo'] = tag_infer_result['taginfo'][0]
            args['predict_req'] = False

        response = es.update(
                        index=log_connection_info.single_turn_gen_index, 
                        doc_type="single_turn_gen",
                        id=gen_id,
                        body = {"doc": args }
                    )

        if response['result'] == 'updated':
            return {'code':'ok', 'messgae': 'successed single turn generation data update' }
        else:
            return {'code': 'error', 'message': 'fail to data update'}

    @jwt_required
    @api.expect(singleTurn_delete_parser)
    def delete(self):
        args = singleTurn_delete_parser.parse_args()

        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        response = es.delete(
                        index=log_connection_info.single_turn_gen_index, 
                        doc_type="single_turn_gen",
                        id=args['gen_id']
                    )

        if response['result'] == 'deleted':
            return {'code': 'ok', 'message': 'successed data delete'}
        else:
            return {'code': 'error', 'message': 'fail to data delete'}



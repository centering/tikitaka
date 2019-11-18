from flask_restplus import Resource, fields
from views.api import api, multiTurn_logging_ns
from flask import request
from elasticsearch import Elasticsearch
from datetime import datetime

from .config import log_connection_info, Inference_connection_info
from .inference_service import utterance_inference, pool

import requests
import uuid
import os, sys
from flask_jwt_extended import jwt_required
multiTurn_proto = multiTurn_logging_ns.model("multi_turn_logging_proto", {
    "project_id": fields.Integer("Project Id"),
    "job_id": fields.Integer("Job Id"),
    "status": fields.String("Dialog Working Status"),
    "dialog": fields.Raw("Dialog Object(Sentence List) Information")
})

multiTurn_update_proto = multiTurn_logging_ns.model("multi_turn_logging_update_proto", {
    "project_id": fields.Integer("Project Id"),
    "job_id": fields.Integer("Job Id"),
    "talk_id": fields.String("Talk Unique Id"),
    "status": fields.String("Dialog Working Status"),
    "dialog": fields.Raw("Dialog Object(Sentence List) Information")
})

multiTurn_delete_parser = api.parser()
multiTurn_delete_parser.add_argument('project_id', location='args')
multiTurn_delete_parser.add_argument('job_id', location='args')
multiTurn_delete_parser.add_argument('talk_id', location='args')

multiTurn_update_parser = api.parser()
multiTurn_update_parser.add_argument('project_id', location='args')
multiTurn_update_parser.add_argument('job_id', location='args')
multiTurn_update_parser.add_argument('talk_id', location='args')
multiTurn_update_parser.add_argument('status', location='args')

multiTurn_get_parser = api.parser()
multiTurn_get_parser.add_argument('job_id', location='args')

@multiTurn_logging_ns.route('/')
@api.doc(responses={404: 'error'})
class MultiTurnLoggingService(Resource):
    @jwt_required
    @api.expect(multiTurn_proto)
    def post(self):
        es = Elasticsearch(
            hosts=log_connection_info.host, 
            port=log_connection_info.port,
            timeout=20, max_retries=10, retry_on_timeout=True
        )

        body = request.json

        body['modify_dt'] = datetime.now() #replace timestamp to modify_dt to record modified time
        body['job_ids'] = []

        inference_target_utterance = []
        for eachDialog in body['dialog']:
            inference_target_utterance.append(eachDialog['text'])

        utterance_infer_result = pool.apply_async(utterance_inference, (inference_target_utterance,))
        tag_infer_result = utterance_infer_result.get()

        for i, eachDialog in enumerate(body['dialog']):
            eachDialog['taginfo'] = tag_infer_result['taginfo'][i]

        talk_id = ''
        if 'talk_id' in body.keys():
            talk_id = body['talk_id']
        else:
            talk_id = str(uuid.uuid1())

        response = es.index(
                            index=log_connection_info.multi_turn_log_index, 
                            doc_type="multi_turn_logging",
                            id=str(uuid.uuid1()),
                            body=body)

        if response['result'] == 'created':
            return {'code': 'ok', 'message': 'successed multi turn logging data insert'}
        else:
            return {'code': 'error', 'message': 'fail to data insert'}

    @jwt_required
    @api.expect(multiTurn_get_parser)
    def get(self):
        args = multiTurn_get_parser.parse_args()

        body = { 
                'query': 
                { 
                    'constant_score': 
                    {
                        'filter' : 
                        {
                            'bool': 
                            {
                                'must': 
                                [
                                    {'term':{"job_id":args['job_id']}}
                                ]
                            }
                        }
                    }
                }
            }

        #check filter condition
        range_filter = {}
        range_filter['range'] = {}

        status_filter = {}
        status_filter['term'] = {}

        if 'filters' in args.keys():
            for eachFilter in args['filters']:
                if 'type' in eachFilter.keys() and eachFilter['type'] == 'time':
                    range_filter['range']['timestamp'] = {}
                    range_filter['range']['timestamp']['gte'] = eachFilter['type'][0]
                    range_filter['range']['timestamp']['lte'] = eachFilter['type'][1]
                    
                    body['query']['constant_score']['filter']['bool']['must'].append(range_filter)

                elif 'type' in eachFilter.keys() and eachFilter['type'] == 'status':
                    status_filter['term']['status'] = eachFilter['value']

                    body['query']['constant_score']['filter']['bool']['must'].append(status_filter)

        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        response = es.search(
                        index=log_connection_info.multi_turn_log_index, 
                        body=body,
                        sort='_id:desc')

        hit_data = []
        for eachData in response['hits']['hits']:
            source_data = eachData['_source']
            source_data['talk_id'] = eachData['_id']
            hit_data.append(source_data)

        return {'code':'ok', 'data': hit_data}

    @jwt_required
    @api.expect(multiTurn_update_proto)
    def put(self):
        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        args = request.json
        args['modify_dt'] = datetime.now() #replace timestamp to modify_dt to record modified time
    
        talk_id = args.pop('talk_id')

        inference_target_utterance = []
        for eachDialog in args['dialog']:
            if 'predict_req' not in eachDialog.keys() or eachDialog['predict_req'] == False:
                continue

            inference_target_utterance.append(eachDialog['text'])

        utterance_infer_result = pool.apply_async(utterance_inference, (inference_target_utterance,))
        tag_infer_result = utterance_infer_result.get()

        for i, eachDialog in enumerate(body['dialog']):
            eachDialog['taginfo'] = tag_infer_result['taginfo'][i]
            eachDialog['predict_req'] = False

        response = es.update(
                        index=log_connection_info.multi_turn_log_index, 
                        doc_type="multi_turn_logging",
                        id=talk_id,
                        body = {"doc": args }
                    )

        if response['result'] == 'updated':
            return {'code':'ok', 'messgae': 'successed multi turn logging data update' }
        else:
            return {'code': 'error', 'message': 'fail to data update'}

    @jwt_required
    @api.expect(multiTurn_delete_parser)
    def delete(self):
        args = multiTurn_delete_parser.parse_args()

        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
        response = es.delete(
                        index=log_connection_info.multi_turn_log_index, 
                        doc_type="multi_turn_logging",
                        id=args['talk_id']
                    )

        if response['result'] == 'deleted':
            return {'code': 'ok', 'message': 'successed multi turn generation data delete'}
        else:
            return {'code': 'error', 'message': 'fail to data delete'}



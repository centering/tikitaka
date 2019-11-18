from flask_restplus import Resource,fields
from views.api import api, job_ns
from flask import request
from elasticsearch import Elasticsearch
from .inference_service import pool, utterance_inference
from .config import log_connection_info
from .DB_connector import create_job, get_job_list, update_job, delete_job, _get_job_kind_from_job
# from .inference_service import utterance_inference, pool
import csv
# import ast
from datetime import datetime
import uuid
from flask_jwt_extended import jwt_required
job_create_proto = job_ns.model("job_create_proto", {
    "project_id": fields.Integer("project id"),
    "job_type": fields.String("job type name"),
    "assign_cnt": fields.Integer("assigning sentence number"),
    "assigner": fields.String("job assigner"),
    "file_name":fields.String("File Upload Name"),
    "file_delimiter":fields.String("File Upload delimiter"),


})

job_modi_proto = job_ns.model("job_modify_proto", {
    "project_id": fields.Integer("project id"),
    "job_id": fields.Integer("job id"),
    "job_type": fields.String("job type name"),
    "assign_cnt": fields.Integer("assigning sentence number"),
    "assigner": fields.String("job assigner"),
    # "file_name":fields.String("File Upload Name"),
    # "file_delimiter":fields.String("File Upload delimiter"),


})
job_del_proto = job_ns.model("job_del_proto", {
    # "project_id": fields.Integer("project id"),
    "job_id": fields.Integer("job id"),
    # "job_type": fields.String("job type name"),
    # "assign_cnt": fields.Integer("assigning sentence number"),
    # "assigner": fields.String("job assigner"),
    # "file_name":fields.String("File Upload Name"),
    # "file_delimiter":fields.String("File Upload delimiter"),


})


job_get_proto = job_ns.model("job_get_proto", {
    "project_id": fields.Integer("project id"),
    "job_type": fields.String("jot type name")
})

parser = api.parser()
parser.add_argument('project_id', location='args')
parser.add_argument('job_type', location='args')
parser.add_argument('assignee', location='args')
parser.add_argument('from', location='args')
parser.add_argument('size', location='args')
parser.add_argument('sort', location='args')
parser.add_argument('order_type', location='args')

@job_ns.route('/')
@api.doc(responses={404: 'error'})
class JobService(Resource):
    @jwt_required
    @api.expect(job_create_proto)
    def post(self):
        args = request.json
        job_id = create_job(args)

        # print(args['file_name'])

        if 'multi_turn_log' in _get_job_kind_from_job(job_id):
            #assign job id for valid dialog
            script = {}
            script['inline'] = "ctx._source.job_id={}".format(job_id)
            script['lang'] = "painless"

            query = {
                'constant_score':
                    {
                        'filter':
                            {
                                'bool':
                                    {
                                        'must': []
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
                        range_filter['range']['timestamp']['gte'] = eachFilter['value'][0]
                        range_filter['range']['timestamp']['lte'] = eachFilter['value'][1]

                        query['constant_score']['filter']['bool']['must'].append(range_filter)

                    elif 'type' in eachFilter.keys() and eachFilter['type'] == 'status':
                        status_filter['term']['status'] = eachFilter['value']

                        query['constant_score']['filter']['bool']['must'].append(status_filter)
            q={}
            q['script'] = script
            q['query'] = query

            es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
            es.update_by_query(body=q, index=log_connection_info.multi_turn_log_index)

        elif 'single_turn_generation' in _get_job_kind_from_job(job_id):
            if args['file_name'] !='':
                count=0
                success=0
                with open(args['file_name'],newline='') as csvfile:
                    reader = csv.reader(csvfile, delimiter='\n',
                                        quotechar='\'',
                                        doublequote = True,
                                        skipinitialspace = False,
                                        quoting=csv.QUOTE_ALL

                                        )
                    for idx,row in enumerate(reader):
                        # print(row)
                        count+=1
                        data = {
                            'project_id':args['project_id'],
                            'job_id':job_id,
                            'text':row[0],
                            'predict_req':args['predict_req'],
                            'taginfo': {'entity':{'result':[]}},
                            'status':'done',
                            'timestamp': datetime.now()
                        }
                        if args['predict_req'] ==True:
                            utterance_infer_result = pool.apply_async(utterance_inference, (row[0],))
                            tag_infer_result = utterance_infer_result.get()
                            data['taginfo'] = tag_infer_result['taginfo'][0]


                        es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
                        response = es.index(
                            index=log_connection_info.single_turn_gen_index,
                            doc_type="single_turn_gen",
                            id=str(uuid.uuid1()),
                            body=data)

                        if response['result'] == 'created':
                            success+=1

                return {'code': 'ok', 'data': 'successed job data insert and %s/%s uploaded' %(str(success),str(count))}


        return {'code': 'ok', 'data': 'successed job data insert'}

    @jwt_required
    @api.expect(parser)
    def get(self):
        args = parser.parse_args()

        job_list, count = get_job_list(args)

        return {'code':'ok', 'data': job_list, 'count': count}

    @jwt_required
    @api.expect(job_modi_proto)
    def put(self):
        args = request.json
        update_job(args)

        if 'multi_turn_log' in _get_job_kind_from_job(args['job_id']):
            #recover prev assigned dialog to job_d = -1
            script = {}
            script['inline'] = "ctx._source.job_id=-1"
            script['lang'] = "painless"

            query = {
                'match':
                    {
                        'job_id': args['job_id']
                    }
            }
            q = {}
            q['script'] = script
            q['query'] = query

            es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
            es.update_by_query(body=q, index=log_connection_info.multi_turn_log_index)


            #assign job id for valid dialog
            script = {}
            script['inline'] = "ctx._source.job_id={}".format(args['job_id'])
            script['lang'] = "painless"

            query = {
                'constant_score':
                    {
                        'filter':
                            {
                                'bool':
                                    {
                                        'must': []
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
                        range_filter['range']['timestamp']['gte'] = eachFilter['value'][0]
                        range_filter['range']['timestamp']['lte'] = eachFilter['value'][1]

                        query['constant_score']['filter']['bool']['must'].append(range_filter)

                    elif 'type' in eachFilter.keys() and eachFilter['type'] == 'status':
                        status_filter['term']['status'] = eachFilter['value']

                        query['constant_score']['filter']['bool']['must'].append(status_filter)

            q['script'] = script
            q['query'] = query
            print(q)
            es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
            es.update_by_query(body=q, index=log_connection_info.multi_turn_log_index)

        return {'code':'ok', 'data': 'successed job data update'}

    @jwt_required
    @api.expect(job_del_proto)
    def delete(self):
        args = request.json


        if 'multi_turn_log' in _get_job_kind_from_job(args['job_id']):
            #recover assigned dialog to job_id = -1
            script = {}
            script['inline'] = "ctx._source.job_id=-1"
            script['lang'] = "painless"

            query = {
                'match':
                    {
                        'job_id': args['job_id']
                    }
            }
            q = {}
            q['script'] = script
            q['query'] = query

            es = Elasticsearch(hosts=log_connection_info.host, port=log_connection_info.port)
            es.update_by_query(body=q, index=log_connection_info.multi_turn_log_index)

        delete_job(args)


        return {'code':'ok', 'data': 'successed job data delete'}


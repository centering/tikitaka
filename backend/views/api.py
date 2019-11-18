from flask import Blueprint
from flask_restplus import Api
from flask_cors import CORS

#api_v1 = Blueprint('api', __name__, url_prefix='/api/v1')
#api = Api(api_v1, version='1.0', title='Piglet API', description='Piglet API')
api_v2 = Blueprint('api', __name__, url_prefix='/api/v2')
api = Api(api_v2, version='2.0', title='Piglet API', description='Piglet API')

CORS(api_v2, supports_credentials=True)

file_ns = api.namespace('file', 'File Service')
auth_ns = api.namespace('auth', 'Auth Service')

project_ns = api.namespace('project', 'Project Service')
task_ns = api.namespace('task', 'Task Service')
user_group_ns = api.namespace('user_group', 'User Group Service')
user_ns = api.namespace('user', 'User Service')

domain_ns = api.namespace('domain', 'Domain Service')
intent_ns = api.namespace('intent', 'Intent Service')
dialogAct_ns = api.namespace('dialogAct', 'DialogAct Service')
entity_ns = api.namespace('entity', 'Entity Service')

job_ns = api.namespace('job', 'Job Service')

inference_ns = api.namespace('inference', 'Model Inference Service')
blacklist= set()
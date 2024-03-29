from flask import Blueprint
from flask_restplus import Api
from flask_cors import CORS

api_v1 = Blueprint('api', __name__, url_prefix='/api/v1')
api = Api(api_v1, version='1.0', title='tikitaka API', description='tikitaka API')

CORS(api_v1, supports_credentials=True)

scenario_group_ns = api.namespace('scenario_group', 'Scenario Group Service')
scenario_ns = api.namespace('scenario', 'Scenario Service')
reaction_group_ns = api.namespace('reaction_group', 'Reaction Group Service')
reaction_ns = api.namespace('reaction', 'Reaction Service')
blacklist_group_ns = api.namespace('blacklist_group', 'Blacklist Group Service')
blacklist_ns = api.namespace('blacklist', 'Blacklist Service')
setting_ns = api.namespace('setting', 'Setting Service')
chat_ns = api.namespace('chat', 'chat Service')

intent_ns = api.namespace('intent', 'Intent Service')
entity_ns = api.namespace('entity', 'Entity Service')

dialog_flow_ns = api.namespace('dialog_flow', 'Dialog Flow Service')
dialog_ns = api.namespace('dialog', 'Dialog Service')

blacklist= set()
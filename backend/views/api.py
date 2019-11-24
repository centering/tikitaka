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
setting_ns = api.namespace('setting', 'Setting Service')

intent_ns = api.namespace('intent', 'Intent Service')
entity_ns = api.namespace('entity', 'Entity Service')
dialog_ns = api.namespace('dialog', 'Dialgo Service')

blacklist= set()
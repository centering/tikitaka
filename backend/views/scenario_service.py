from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, scenario_ns, scenario_group_ns

from model.scenario_dao import ScenarioDao, ScenarioGroupDao

scenario_group_create_proto = scenario_group_ns.model("scenario_group_create_proto", {
    "name": fields.String("scenario_group name")
})
scenario_group_delete_parser = api.parser()
scenario_group_delete_parser.add_argument('id', location='args')

@scenario_group_ns.route('/')
@api.doc(responses={404: 'error'})
class ScenarioGroupService(Resource):
    @api.expect(scenario_group_create_proto)
    def post(self):         #C
        args = request.json
        scenario_group_id = ScenarioGroupDao.create_scenario_group(args['name'])

        return {'code':'ok', 'message': 'successed scenario group create'}

    def get(self):          #R
        result = ScenarioGroupDao.get_scenario_group_list()

        return {'code':'ok', 'data': result}

    @api.expect(scenario_group_delete_parser)
    def delete(self):       #D
        args = scenario_group_delete_parser.parse_args()
        ScenarioGroupDao.delete_scenario_group(args['id'])

        return {'code':'ok', 'message':'successed scenario group delete'}

scenario_create_proto = scenario_ns.model("scenario_create_proto", {
    "scenario_group_id": fields.Integer("scenario group id")
})

scenario_update_proto = scenario_ns.model("scenario_update_proto", {
    "scenario_id":          fields.Integer("scenario id"),
    "scenario_query":       fields.Raw("scenario queries"),
    "scenario_response":    fields.Raw("scenario responses")
})

scenario_get_parser = api.parser()
scenario_get_parser.add_argument('scenario_group_id', location='args')

scenario_delete_parser = api.parser()
scenario_delete_parser.add_argument('scenario_id', location='args')

@scenario_ns.route('/')
@api.doc(responses={404: 'error'})
class ScenarioService(Resource):
    @api.expect(scenario_create_proto)
    def post(self):         #C
        args = request.json
        scenario_id = ScenarioDao.create_scenario(args['scenario_group_id'])

        return {'code':'ok', 'message': 'successed scenario create'}

    @api.expect(scenario_get_parser)
    def get(self):          #R
        args = scenario_get_parser.parse_args()
        result = ScenarioDao.get_scenario_list(args['scenario_group_id'])

        for each_scenario in result:
            each_scenario['scenario_query'] = ScenarioDao.get_scenario_query(each_scenario['id'])
            each_scenario['scenario_response'] = ScenarioDao.get_scenario_response(each_scenario['id'])

        return {'code':'ok', 'data': result}

    @api.expect(scenario_update_proto)
    def put(self):         #U
        args = request.json
        scenario_id = ScenarioDao.update_scenario(args['scenario_id'], args['scenario_query'], args['scenario_response'])

        return {'code':'ok', 'message': 'successed scenario update'}

    @api.expect(scenario_delete_parser)
    def delete(self):       #D
        args = scenario_delete_parser.parse_args()
        ScenarioDao.delete_scenario(args['scenario_id'])

        return {'code':'ok', 'message':'successed scenario delete'}

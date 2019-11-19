from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, scenario_ns, scenario_group_ns

from model import ScenarioDao, ScenarioGroupDao

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

    def get(self):          #R
        result = ScenarioGroupDao.get_scenario_group_list()

        return {'code':'ok', 'data': result}

    @api.expect(scenario_group_delete_parser)
    def delete(self):       #D
        args = project_delete_parser.parse_args()
        ScenarioGroupDao.delete_scenario_group(args['id'])

        return {'code':'ok', 'message':'successed project delete'}

scenario_create_proto = scenario_group_ns.model("scenario_group_create_proto", {
    "name": fields.String("scenario_group name")
})

scenario_get_parser = api.parser()
scenario_get_parser.add_argument('scenario_group_id', location='args')

scenario_delete_parser = api.parser()
scenario_delete_parser.add_argument('id', location='args')

@scenario_ns.route('/')
@api.doc(responses={404: 'error'})
class ScenarioService(Resource):
    @api.expect(scenario_create_proto)
    def post(self):         #C
        args = request.json
        scenario_id = ScenarioDao.create_scenario_group(args['name'])

    @api.expect(scenario_get_parser)
    def get(self):          #R
        args = scenario_get_parser.parse_args()
        result = ScenarioDao.get_scenario_list(args['scenario_group_id'])

        return {'code':'ok', 'data': result}

    @api.expect(scenario_delete_parser)
    def delete(self):       #D
        args = project_delete_parser.parse_args()
        ScenarioDao.delete_scenario(args['scenario_id'])

        return {'code':'ok', 'message':'successed project delete'}










@scenario_ns.route('/')
@api.doc(responses={404: 'error'})
class ScenarioService(Resource):
    @api.expect(project_create_proto)
    def post(self):         #C
        args = request.json

        project_id = ProjectDao.create_project(args['project_name'], args['project_desc'], desc=None if 'project_desc' not in args.keys() else args['project_desc'])

        #create default admin, guest user group
        user_group_info = {}
        user_group_info['project_id'] = project_id
        
        user_group_info['name'] = 'Guest'
        guest_group_id = UserGroupDao.create_user_group(user_group_info['name'], user_group_info['project_id'], 'Guest')
        
        user_group_info['name'] = 'Admin'
        admin_group_id = UserGroupDao.create_user_group(user_group_info['name'], user_group_info['project_id'], 'Admin')

        #assign project creation user to default admin group
        UserGroupDao.assign_user_to_user_group(args['email'], admin_group_id)

        return {'code': 'ok', 'message': 'SUCCESS_CREATE_PROJECT', 'data':UserDao.get_user_project_list(args['email'])}

    @api.expect(project_get_parser)
    def get(self):          #R
        args = project_get_parser.parse_args()
        result = ProjectDao.get_project_list(args['id'])

        return {'code':'ok', 'data': result}

    @api.expect(project_update_proto)   
    def put(self):          #U
        args = request.json

        ProjectDao.modify_project(args['id'], args['name'], args['desc'])

        return {'code':'ok', 'message':'SUCCESS_PROJECT_MODIFY'}
      
    @api.expect(project_delete_parser)
    def delete(self):       #D
        args = project_delete_parser.parse_args()
        ProjectDao.delete_project(args['id'])

        return {'code':'ok', 'message':'successed project delete'}

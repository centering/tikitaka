from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, project_ns

from model import ProjectDao, UserDao, UserGroupDao

project_create_proto = project_ns.model("project_create_proto", {
    "project_name": fields.String("project name"),
    "project_desc": fields.String("proejct description"),
    'email':fields.String("user email"),
})

project_update_proto = project_ns.model("project_update_proto", {
    "id": fields.Integer("project id"),
    "name": fields.String("project name"),
    "desc": fields.String("proejct description")
})

project_get_parser = api.parser()
project_get_parser.add_argument('id', location='args')
project_get_parser.add_argument('name', location='args')

project_delete_parser = api.parser()
project_delete_parser.add_argument('id', location='args')

@project_ns.route('/')
@api.doc(responses={404: 'error'})
class ProjectService(Resource):
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

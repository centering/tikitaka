from flask_restplus import Resource,fields
from views.api import api, user_group_ns
from flask import request

from email.mime.text import MIMEText

from model import UserGroupDao
from .config import mail_info

import smtplib

from flask_jwt_extended import jwt_required

user_group_get_parser = api.parser()
user_group_get_parser.add_argument('project_id', location='args')
user_group_get_parser.add_argument('from', location='args')
user_group_get_parser.add_argument('size', location='args')
user_group_get_parser.add_argument('sort', location='args')
user_group_get_parser.add_argument('order', location='args')
user_group_get_parser.add_argument('search_col', location='args')
user_group_get_parser.add_argument('search_val', location='args')

user_group_delete_parser = api.parser()
user_group_delete_parser.add_argument('user_group_id', location='args')

user_group_add_proto = user_group_ns.model("user_group_update_proto", {
    "project_id": fields.Integer("project id"),
    "user_group_name": fields.String("user group name"),
    "user_group_desc": fields.String("user group desc"),
    "role": fields.String("user group role")
})

user_group_update_proto = user_group_ns.model("user_group_update_proto", {
    "user_group_id": fields.Integer("user group id"),
    "user_group_name": fields.String("user group name"),
    "user_group_desc": fields.String("user group desc"),
    "role": fields.String("user group role")
})

@user_group_ns.route('/')
@api.doc(responses={404: 'error'})
class UserGroupService(Resource):
    @api.expect(user_group_add_proto)
    def post(self):
        args = request.json

        if args['user_group_name'] in ['Admin', 'Guest']:
            return {'code': 'ng', 'message':'FAIL_ADD_USER_GROUP("Admin" or "Guest" user group can not be created!)'}

        UserGroupDao.create_user_group(args['project_id'], args['user_group_name'], args['user_group_desc'], args['role'])

        return {'code': 'ok', 'message':'SUCCESS_ADD_USER_GROUP'}
        
    @api.expect(user_group_get_parser)
    def get(self):
        args = user_group_get_parser.parse_args()

        if args['search_col'] is not None and args['search_val'] is not None:
            if args['search_col'] == 'user_group_id': args['search_col'] = 'USER_GROUP.id'
            elif args['search_col'] == 'user_group_name': args['search_col'] = 'USER_GROUP.name'
            elif args['search_col'] == 'user_group_desc': args['search_col'] = 'USER_GROUP.desc'
            elif args['search_col'] == 'role': args['search_col'] = 'ROLE.name'

        data = UserGroupDao.get_user_group(args['project_id'], args['size'], args['from'], args['sort'], args['order'], args['search_col'], args['search_val'])
        total_cnt = len(data)

        if args['from'] is not None and args['size'] is not None:
            data = data[int(args['from']):int(args['from']) + int(args['size'])]
        
        return {'code': 'ok', 'message':'SUCCESS_GET_USER_GROUP', 'total_cnt':total_cnt, 'data':data}
        
    @api.expect(user_group_update_proto)
    def put(self):
        args = request.json

        if 'user_group_name' in args.keys():
            if args['user_group_name'] in ['Admin', 'Guest']:
                return {'code':'ng', 'message': 'FAIL_MODIFY_USER_GROUP'}

        if not UserGroupDao.check_editable_user_group(args['user_group_id']):
            return {'code':'ng', 'message': 'FAIL_MODIFY_USER_GROUP'}

        UserGroupDao.update_user_group(args['user_group_id'],args['user_group_name'],args['user_group_desc'],args['role'])
        
        return {'code':'ok', 'message': 'SUCCESS_MODIFY_USER_GROUP'}

    @api.expect(user_group_delete_parser)
    def delete(self):
        args = user_group_delete_parser.parse_args()

        UserGroupDao.delete_user_group(args['user_group_id'])

        return {'code':'ok', 'message': 'SUCCESS_DELETE_USER_GROUP'}
        

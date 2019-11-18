from flask_restplus import Resource,fields
from flask import request
from email.mime.text import MIMEText
from datetime import datetime

from .config import mail_info
from views.api import api, user_ns
from model import UserDao, UserGroupDao

import smtplib

from flask_jwt_extended import jwt_required

user_invite_proto = user_ns.model("user_invite_proto", {
    "project_id": fields.Integer("project id"),
    "emails": fields.Raw("target email list"),
    "redirect_url": fields.Raw("target redirect_url list"),
    "expire_time_str":fields.String('expire time')
})

user_create_proto = user_ns.model("user_create_proto", {
    "email": fields.String("user email"),
    "name": fields.String("user name")
})

user_update_proto = user_ns.model("user_update_proto", {
    "email": fields.String("user email"),

    #optional
    "name": fields.String("user name"),

    "cur_password": fields.String("user current password"),
    "password": fields.String("user password"),

    "activate": fields.String("user activate status"),
    "user_groups": fields.Raw("user group ids")
})

new_user_update_proto = user_ns.model("new_user_update_proto", {
    "project_id": fields.Integer("project id"),
    "emails": fields.String("user email"),
    "password": fields.String("user password"),
    "name": fields.String("user name")
})

user_get_parser = api.parser()
user_get_parser.add_argument('project_id', location='args')
user_get_parser.add_argument('from', location='args')
user_get_parser.add_argument('size', location='args')
user_get_parser.add_argument('sort', location='args')
user_get_parser.add_argument('order', location='args')
user_get_parser.add_argument('search_col', location='args')
user_get_parser.add_argument('search_val', location='args')

user_delete_parser = api.parser()
user_delete_parser.add_argument('email', location='args')

@user_ns.route('/')
@api.doc(responses={404: 'error'})
class UserService(Resource):
    @api.expect(user_create_proto)
    def post(self):
        msg = request.json
        print(msg)
        return {'msg': 'ok'}

    @api.expect(user_get_parser)
    def get(self):
        args = user_get_parser.parse_args()
        data = []

        total_users = UserDao.get_project_total_users(args['project_id'], args['sort'], args['order'], args['search_col'], args['search_val'])
        total_cnt = len(total_users)

        if args['from'] is not None and args['size'] is not None:
            total_users = total_users[int(args['from']):int(args['from']) + int(args['size'])]

        for i, each_user_info in enumerate(total_users):
            each_user_info['create_dt'] = each_user_info['create_dt'].strftime("%Y-%m-%d %H:%M:%S")
            each_user_info['modify_dt'] = each_user_info['modify_dt'].strftime("%Y-%m-%d %H:%M:%S")

            each_user_info['user_groups'] = UserDao.get_user_assigned_user_group(each_user_info['user_id'], args['project_id'])
            data.append(each_user_info)

        return {'code':'ok', 'message': 'SUCCESS_GET_USER', 'total_cnt': total_cnt, 'data': data}
        

    @api.expect(user_update_proto)
    def put(self):
        args = request.json
        
        if UserDao.update_user(**args):
            if args['user_groups'] is not None:
                #re-assign user group
                UserGroupDao.delete_user_from_user_group(args['email'])

                for each_group in args['user_groups']:
                    UserGroupDao.assign_user_to_user_group(args['email'], each_group['user_group_id'])

            return {'code':'ok', 'message': 'SUCCESS_UPDATE_USER'}
        else:
            return {'code':'ng', 'message': 'FAIL_UPDATE_USER'}

    @api.expect(user_delete_parser)
    def delete(self):
        args = user_delete_parser.parse_args()
        UserDao.delete_user(args['email'])

        return {'code':'ok', 'message': 'SUCCESS_DELETE_USER'}

@user_ns.route('/new/')
@api.doc(responses={404: 'error'})
class NewUserService(Resource):
    @api.expect(new_user_update_proto)
    def put(self):
        args = request.json

        if user_activate_check(args['emails']):
            return {'code':'ng', 'message': 'user already activated'}
        else:
            update_user(args)
            return {'code':'ok', 'message': 'success update user'}

@user_ns.route('/invite/')
@api.doc(responses={404: 'error'})
class UserInviteService(Resource):
    @api.expect(user_invite_proto)
    def post(self):
        args = request.json

        smtp = smtplib.SMTP(mail_info.mail_server, mail_info.mail_port)
        smtp.starttls()

        smtp.login(mail_info.mail_host, mail_info.mail_password)

        msg = MIMEText("Hi I'm piglet, nice to meet you!")
        msg['Subject'] = "Invitation from Piglet! \n Please access this Link \n\n "

        if len(args['emails']) != len(args['redirect_url']):
            raise ValueError('given email length and given redirect_url length should be same')

        success_mail_num = 0
        fail_mail_num = 0

        try:
            for i, email in enumerate(args['emails']):
                #check user already exist
                if UserDao.check_user_exist(email):
                    if UserDao.check_user_assigned_to_project(email):
                        fail_mail_num += 1
                    else:
                        msg = MIMEText("Hi I'm piglet, nice to meet you! \n Please access this Link \n\n {} \n"
                                "(This Link will expire {})"
                                "".format(args['old_person_url'][i],args['expire_time_str']))
                        msg['Subject'] = "Invitation from Piglet!"
                        msg['To'] = email

                        smtp.sendmail(mail_info.mail_host, email, msg.as_string())
                        success_mail_num += 1    
                else:
                    #add user in advance
                    UserDao.create_user(email, args['project_id'])

                    msg = MIMEText("Hi I'm piglet, nice to meet you! \n Please access this Link \n\n {} \n"
                                "(This Link will expire {})"
                                "".format(args['new_person_url'][i],args['expire_time_str']))
                    msg['Subject'] = "Invitation from Piglet!"
                    msg['To'] = email

                    smtp.sendmail(mail_info.mail_host, email, msg.as_string())
                    success_mail_num += 1
            
            smtp.quit()

            return {'code': 'ok', 'message': 'SUCCEESS_INVITE_PEOPLE', 'data': {'total':len(args['emails']), 'success':success_mail_num, 'fail':fail_mail_num}}

        except:

            smtp.quit()

            return {'code': 'ng', 'message': 'FAIL_INVITE_PEOPLE'}

        

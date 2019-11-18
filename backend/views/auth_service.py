from flask_restplus import Resource,fields
from views.api import api, auth_ns,blacklist
from flask import request,jsonify,after_this_request
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity,get_raw_jwt,set_access_cookies,set_refresh_cookies,unset_jwt_cookies,get_csrf_token
)

from model import Access_info, UserDao
import jwt
import logging
# from app import blacklist
logger = logging.getLogger('piglet')

login_proto = auth_ns.model("login_proto", {
    "auth_info": fields.String("User email & password jwt encoded string")
})

parser = api.parser()
parser.add_argument('Authorization', location='headers')

@auth_ns.route('/login')
@api.doc(responses={404: 'error'})
class AuthService(Resource):
    @api.expect(login_proto)
    def post(self):
        logger.info('Try Login..')

        login_info = jwt.decode(request.json.get('auth_info'), Access_info.SECRET_KEY, algorithms=['HS256'])

        res = UserDao.get_auth_user(login_info['email'], login_info['password'])

        info=[]
        if len(res) != 0:
            user_name = res[0]['name']
            info.append({'email': login_info['email'], 'name':user_name})

            access_token = create_access_token(identity=info)
            refresh_token= create_refresh_token(identity=info)

            user_info = {}
            user_info= {'email':login_info['email'], 'name':user_name}
            user_info['projects'] = UserDao.get_user_project_list(login_info['email'])

            ret = jsonify({
                "code:":"ok",
                "message": "SUCCESS_LOGIN",
                "data":
                    {
                        'access_csrf': get_csrf_token(access_token),
                        'refresh_csrf': get_csrf_token(refresh_token),
                        'user': user_info
                    }

            })

            set_access_cookies(ret, access_token)

            return ret
            
        else:
            return {"code": "ng", "message": "FAIL_LOGIN"}, 200



@auth_ns.route('/refresh_token')
@api.doc(responses={404: 'error'})
class AuthService(Resource):

    @api.expect(login_proto)
    def post(self):
        '''
            Test
            return: ok

        '''
        current_user = get_jwt_identity()
        ret = {
            'access_token': create_access_token(identity=current_user)
        }
        return {'ok': True, 'data': ret}, 200


@auth_ns.route('/auth_check')
class AuthTestService(Resource):

    @jwt_required
    @api.expect(parser)
    def post(self):
        '''
            Test
            return: ok

        '''
        user = get_jwt_identity()
        return {'message':'ok','logged_in_as':user}, 200




@auth_ns.route('/logout')
class AuthLogoutService(Resource):

    @jwt_required
    def delete(self):
        '''
            Test
            return: ok

        '''
        jti = get_raw_jwt()['jti']
        # print(jti)
        blacklist.add(jti)

        res = jsonify({"message": "ok"})
        unset_jwt_cookies(res)
        return res

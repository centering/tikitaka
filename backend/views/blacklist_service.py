from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, blacklist_ns, blacklist_group_ns

from model.blacklist_dao import BlacklistDao, BlacklistGroupDao

blacklist_group_create_proto = blacklist_group_ns.model("blacklist_group_create_proto", {
    "name": fields.String("blacklist_group name")
})
blacklist_group_delete_parser = api.parser()
blacklist_group_delete_parser.add_argument('id', location='args')

@blacklist_group_ns.route('/')
@api.doc(responses={404: 'error'})
class BlacklistGroupService(Resource):
    @api.expect(blacklist_group_create_proto)
    def post(self):         #C
        args = request.json
        blacklist_group_id = BlacklistGroupDao.create_blacklist_group(args['name'])

        return {'code':'ok', 'message': 'successed blacklist group create'}

    def get(self):          #R
        result = BlacklistGroupDao.get_blacklist_group_list()

        return {'code':'ok', 'data': result}

    @api.expect(blacklist_group_delete_parser)
    def delete(self):       #D
        args = blacklist_group_delete_parser.parse_args()
        BlacklistGroupDao.delete_blacklist_group(args['id'])

        return {'code':'ok', 'message':'successed blacklist group delete'}

blacklist_create_proto = blacklist_ns.model("blacklist_create_proto", {
    "blacklist_group_id": fields.Integer("blacklist group id")
})

blacklist_update_proto = blacklist_ns.model("blacklist_update_proto", {
    "blacklist_id":          fields.Integer("blacklist id"),
    "blacklist_query":       fields.Raw("blacklist queries"),
    "blacklist_response":    fields.Raw("blacklist responses")
})

blacklist_get_parser = api.parser()
blacklist_get_parser.add_argument('blacklist_group_id', location='args')

blacklist_delete_parser = api.parser()
blacklist_delete_parser.add_argument('blacklist_id', location='args')

@blacklist_ns.route('/')
@api.doc(responses={404: 'error'})
class BlacklistService(Resource):
    @api.expect(blacklist_create_proto)
    def post(self):         #C
        args = request.json
        blacklist_id = BlacklistDao.create_blacklist(args['blacklist_group_id'])

        return {'code':'ok', 'message': 'successed blacklist create'}

    @api.expect(blacklist_get_parser)
    def get(self):          #R
        args = blacklist_get_parser.parse_args()
        result = BlacklistDao.get_blacklist_list(args['blacklist_group_id'])

        for each_blacklist in result:
            each_blacklist['blacklist_query'] = BlacklistDao.get_blacklist_query(each_blacklist['id'])
            each_blacklist['blacklist_response'] = BlacklistDao.get_blacklist_response(each_blacklist['id'])

        return {'code':'ok', 'data': result}

    @api.expect(blacklist_update_proto)
    def put(self):         #U
        args = request.json
        blacklist_id = BlacklistDao.update_blacklist(args['blacklist_id'], args['blacklist_query'], args['blacklist_response'])

        return {'code':'ok', 'message': 'successed blacklist update'}

    @api.expect(blacklist_delete_parser)
    def delete(self):       #D
        args = blacklist_delete_parser.parse_args()
        BlacklistDao.delete_blacklist(args['blacklist_id'])

        return {'code':'ok', 'message':'successed blacklist delete'}

from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, reaction_ns, reaction_group_ns

from model.reaction_dao import ReactionDao, ReactionGroupDao

reaction_group_create_proto = reaction_group_ns.model("reaction_group_create_proto", {
    "name": fields.String("reaction_group name")
})
reaction_group_delete_parser = api.parser()
reaction_group_delete_parser.add_argument('id', location='args')

@reaction_group_ns.route('/')
@api.doc(responses={404: 'error'})
class ReactionGroupService(Resource):
    @api.expect(reaction_group_create_proto)
    def post(self):         #C
        args = request.json
        reaction_group_id = ReactionGroupDao.create_reaction_group(args['name'])

        return {'code':'ok', 'message': 'successed reaction group create'}

    def get(self):          #R
        result = ReactionGroupDao.get_reaction_group_list()

        for each_reaction in result:
            each_reaction['reaction_type'] = ReactionDao.get_reaction_type(each_reaction['id'])
            each_reaction['reaction_response'] = ReactionDao.get_reaction_response(each_reaction['id'])

        return {'code':'ok', 'data': result}

        return {'code':'ok', 'data': result}

    @api.expect(reaction_group_delete_parser)
    def delete(self):       #D
        args = reaction_group_delete_parser.parse_args()
        ReactionGroupDao.delete_reaction_group(args['id'])

        return {'code':'ok', 'message':'successed reaction group delete'}

reaction_create_proto = reaction_ns.model("reaction_create_proto", {
    "reaction_group_id": fields.Integer("reaction group id")
})

reaction_update_proto = reaction_ns.model("reaction_update_proto", {
    "reaction_id":          fields.Integer("reaction id"),
    "reaction_type":       fields.Raw("reaction type"),
    "reaction_response":    fields.Raw("reaction responses")
})

reaction_get_parser = api.parser()
reaction_get_parser.add_argument('reaction_group_id', location='args')

reaction_delete_parser = api.parser()
reaction_delete_parser.add_argument('reaction_id', location='args')

@reaction_ns.route('/')
@api.doc(responses={404: 'error'})
class ReactionService(Resource):
    @api.expect(reaction_create_proto)
    def post(self):         #C
        args = request.json
        reaction_id = ReactionDao.create_reaction(args['reaction_group_id'])

        return {'code':'ok', 'message': 'successed reaction group create'}

    @api.expect(reaction_get_parser)
    def get(self):          #R
        args = reaction_get_parser.parse_args()
        result = ReactionDao.get_reaction_list(args['reaction_group_id'])

        return {'code':'ok', 'data': result}

    @api.expect(reaction_update_proto)
    def put(self):         #U
        args = request.json
        reaction_id = ReactionDao.update_reaction(args['reaction_id'], args['reaction_type'], args['reaction_response'])

        return {'code':'ok', 'message': 'successed reaction update'}

    @api.expect(reaction_delete_parser)
    def delete(self):       #D
        args = reaction_delete_parser.parse_args()
        ReactionDao.delete_reaction(args['reaction_id'])

        return {'code':'ok', 'message':'successed reaction delete'}

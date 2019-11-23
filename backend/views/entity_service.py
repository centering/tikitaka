from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, entity_ns

from model.entity_dao import EntityDao

entity_create_proto = entity_ns.model("entity_create_proto", {
    "name":   fields.String("entity name"),
    "value":  fields.String("entity value")
})

entity_update_proto = entity_ns.model("entity_update_proto", {
    "id":         fields.Integer("entity id"),
    "name":       fields.String("entity name"),
    "value":      fields.String("entity value"),
    "synonym":    fields.Raw("entity synonym")
})

entity_delete_parser = api.parser()
entity_delete_parser.add_argument('id', location='args')

@entity_ns.route('/')
@api.doc(responses={404: 'error'})
class EntityService(Resource):
    @api.expect(entity_create_proto)
    def post(self):         #C
        args = request.json
        entity_id = EntityDao.create_entity(args['name'], args['value'])
        
        return {'code':'ok', 'message': 'successed entity create'}

    def get(self):          #R
        result = EntityDao.get_entity_list()

        return {'code':'ok', 'data': result}

    @api.expect(entity_update_proto)
    def put(self):         #U
        args = request.json
        entity_id = EntityDao.update_entity(args['id'], args['name'], args['value'])
        EntityDao.update_eneity_synonym(args['id'], args['synonym'])
        
        return {'code':'ok', 'message': 'successed entity update'}

    @api.expect(entity_delete_parser)
    def delete(self):       #D
        args = entity_delete_parser.parse_args()
        EntityDao.delete_intent(args['id'])

        return {'code':'ok', 'message':'successed entity delete'}

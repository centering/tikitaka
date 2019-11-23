from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, intent_ns

from model.intent_dao import IntentDao

intent_create_proto = intent_ns.model("intent_create_proto", {
    "name":         fields.String("intent name"),
    "description":  fields.String("intent description")
})

intent_update_proto = intent_ns.model("intent_update_proto", {
    "id":               fields.Integer("intent id"),
    "name":             fields.String("intent name"),
    "description":      fields.String("intent description"),
    "intent_utterance": fields.Raw("intent utterance list")
})

intent_delete_parser = api.parser()
intent_delete_parser.add_argument('id', location='args')

@intent_ns.route('/')
@api.doc(responses={404: 'error'})
class IntentService(Resource):
    @api.expect(intent_create_proto)
    def post(self):         #C
        args = request.json
        intent_id = IntentDao.create_intent(args['name'], args['description'])
        
        return {'code':'ok', 'message': 'successed intent create'}

    def get(self):          #R
        result = IntentDao.get_intent_list()

        return {'code':'ok', 'data': result}

    @api.expect(intent_update_proto)
    def put(self):         #U
        args = request.json
        intent_id = IntentDao.update_intent(args['id'], args['name'], args['decription'])
        IntentDao.update_intent_utterance(args['id'], args['intent_utterance'])
        
        return {'code':'ok', 'message': 'successed intent update'}

    @api.expect(intent_delete_parser)
    def delete(self):       #D
        args = intent_delete_parser.parse_args()
        IntentDao.delete_intent(args['id'])

        return {'code':'ok', 'message':'successed intent delete'}

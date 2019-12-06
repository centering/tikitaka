from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, dialog_flow_ns

from model.dialog_dao import DialogDao

@dialog_flow_ns.route('/')
@api.doc(responses={404: 'error'})
class DialogFlowService(Resource):
    def get(self):          #R
        result = DialogDao.get_dialog_flow()

        return {'code':'ok', 'data': result}

    def put(self):          #U
        args = request.json

        DialogDao.delete_dialog_flow()
    
        DialogDao.create_dialog_flow(args['treeData'])

        return {'code':'ok', 'message': 'success dialog flow update'}


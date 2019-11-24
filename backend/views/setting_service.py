from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, setting_ns

from model.setting_dao import SettingDao

setting_update_proto = setting_ns.model("setting_update_proto", {
    "scenario_model_threshold":     fields.Float(""),
    "reaction_model_threshold":     fields.Float(""),
    "retrieval_model_threshold":    fields.Float("")
})

@setting_ns.route('/')
@api.doc(responses={404: 'error'})
class SettingService(Resource):
    def get(self):          #R
        result = SettingDao.get_setting_list()

        return {'code':'ok', 'data': result}

    @api.expect(setting_update_proto)
    def put(self):          #U
        args = request.json
        reaction_id = SettingDao.update_setting(args)

        return {'code':'ok', 'message': 'successed setting update'}


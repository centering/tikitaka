from flask_restplus import Resource,fields
from flask import Flask, render_template, jsonify, make_response, request
from flask_jwt_extended import jwt_required

from views.api import api, chat_ns
from talkengine.module import ConversationEngine, SmalltalkEngine, ScenarioAnalysisEngine, ReactAnalysisEngine, SlangDetectionEngine
from talkengine.data_util import ScenarioDataController, ReactionDataController, SlangDataController

import pickle
import json
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

import eeyore
from eeyore.models.smalltalk.RetrievalDialog import RetrievalDialogInferencer

retrieval_args = eeyore.model_config.smalltalk.RetrievalDialog
inferencer = RetrievalDialogInferencer(retrieval_args)
inferencer.load_model()

scenario_data_controller = ScenarioDataController(inferencer)
scenario_engine = ScenarioAnalysisEngine(data_controller=scenario_data_controller,
                                         k=3)

reaction_data_controller = ReactionDataController()
reaction_engine = ReactAnalysisEngine(data_controller=reaction_data_controller)

slang_data_controller = SlangDataController()
slang_engine = SlangDetectionEngine(data_controller=slang_data_controller)

smalltalk_engine = SmalltalkEngine()

engine = ConversationEngine(scenario_model=scenario_engine,
                            reaction_model=reaction_engine,
                            slang_model=slang_engine,
                            smalltalk_model=smalltalk_engine)

chat_proto = chat_ns.model("chat_proto", {
    "query": fields.String("intent name")
})

@chat_ns.route('/')
@api.doc(responses={404: 'error'})
class ChatService(Resource):
    @api.expect(chat_proto)
    def post(self):         #C
        args = request.json
        query = args['query']
        
        if query.__class__ != str:
            raise ValueError("input type should be a string")

        response = engine.predict(query)
        output = {'response': response, 'code':'ok'}

        # 한글유니코드로 깨짐 방지
        json_result = json.dumps(output, ensure_ascii=False)
        res = make_response(json_result)

        return res

    

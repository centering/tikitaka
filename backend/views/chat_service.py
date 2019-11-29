from flask_restplus import Resource,fields
from flask import Flask, render_template, jsonify, make_response, request
from flask_jwt_extended import jwt_required

from views.api import api, chat_ns
from talkengine.module import ConversationEngine, SmalltalkEngine, ScenarioAnalysisEngine

import pickle
import json

#1) Load TalkEngine
with open('../talkengine/resource/ques_embed_dict.pkl', 'rb') as file:
    ques_embedded_dict = pickle.load(file)

with open('../talkengine/resource/res_cluster_dict.pkl', 'rb') as file:
    res_cluster_dict = pickle.load(file)

# hyperparameter
thres_prob = 0.9

scenario_engine = ScenarioAnalysisEngine(ques_embedding_dict=ques_embedded_dict,
                                         response_cluster_dict=res_cluster_dict,
                                         k=3,
                                         thres_prob=thres_prob)

smalltalk_engine= SmalltalkEngine()

engine = ConversationEngine(scenario_model=scenario_engine, smalltalk_model=smalltalk_engine)

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
        output = {'response': response}

        # 한글유니코드로 깨짐 방지
        json_result = json.dumps(output, ensure_ascii=False)
        res = make_response(json_result)

        return res

    

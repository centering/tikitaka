from flask import Flask, render_template, jsonify, make_response

from flask_jwt_extended import JWTManager
from flask import request

from views.api import api_v1, api, blacklist
from views import reaction_service
from views import scenario_service
from views import chat_service

from logging.handlers import TimedRotatingFileHandler

import os, sys
import subprocess
import argparse
import datetime
import logging
import json
import pickle
import os
import sys

os.environ['KMP_DUPLICATE_LIB_OK']='True'
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from talkengine.module import ConversationEngine, SmalltalkEngine, ScenarioAnalysisEngine, ReactAnalysisEngine
from talkengine.data_util import ScenarioDataController, ReactionDataController

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

smalltalk_engine = SmalltalkEngine()

engine = ConversationEngine(scenario_model=scenario_engine,
                            reaction_model=reaction_engine,
                            smalltalk_model=smalltalk_engine)


app = Flask('tikitaka', static_url_path='', static_folder='../frontend/public', template_folder='../frontend/public')

app.register_blueprint(api_v1)

app.config['JWT_SECRET_KEY'] = 'thisissecret'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES']= datetime.timedelta(days=1)

app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_CSRF_IN_COOKIES'] = False
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/'

jwt = JWTManager(app)
jwt._set_error_handler_callbacks(api)

logger = logging.getLogger("tikitaka")
logger.setLevel(logging.DEBUG)

handler = TimedRotatingFileHandler('tikitaka.log',
                                   when="d",
                                   interval=1,
                                   backupCount=2)

handler.setFormatter(logging.Formatter('%(asctime)s %(module)s [%(levelname)s] : %(message)s'))
logger.addHandler(handler)

@jwt.unauthorized_loader
def unauthorized_response(callback):
    return {
        'code':'ng','message': 'Missing_Authorization_Header'

}, 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    return {
        'code':'ng','message': 'invalid_token_loader'
}, 401

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):

    jti = decrypted_token['jti']
    return jti in blacklist



@app.route("/")
def hello():
    try:
        with open('../frontend/public/assets.json') as json_file:
            json_data = json.load(json_file)
            # print(json_data)
            for key  in json_data.keys():
                if key.find('index') !=-1:
                    return render_template(json_data[key])
    except:
        return render_template('index.html')



@app.errorhandler(404)
def not_found(error):
    try:
        with open('../frontend/public/assets.json') as json_file:
            json_data = json.load(json_file)
            # print(json_data)
            for key  in json_data.keys():
                if key.find('index') !=-1:
                    return render_template(json_data[key])
    except:
        return render_template('index.html')


@app.after_request
def after_request(response):
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')

    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-TOKEN')
    # response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/tikitaka_infer', methods=['POST'])
def tikitaka_infer():
    query = request.json['query']
    if query.__class__ != str:
        raise ValueError("input type should be a string")

    response = engine.predict(query)
    output = {'response': response}

    # 한글유니코드로 깨짐 방지
    json_result = json.dumps(output, ensure_ascii=False)
    res = make_response(json_result)
    return res


if __name__ == '__main__':
    port = 8080

    logger.info('Tikitaka Service Start! 0.0.0.0:{}'.format(port))
    app.run(host='0.0.0.0', debug=True, port=port, threaded=True)


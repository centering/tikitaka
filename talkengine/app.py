from flask import Flask, make_response
from flask import request
from logging.handlers import TimedRotatingFileHandler

from module import ConversationEngine, ScenarioAnalysisEngine, SmalltalkEngine
from config import ModelConfig as config

import logging
import json
import pickle
import argparse


# --------------------------------------------------
# 1) Create app
app = Flask("Smalltalk Server", static_url_path="")

app.config["host"] = '0.0.0.0'
app.config["port"] = 8080

# --------------------------------------------------
# 2) Create logger
logger = logging.getLogger("Tikitaka")
logger.setLevel(logging.DEBUG)

handler = TimedRotatingFileHandler('Tikitaka', when="d", interval=1, backupCount=2)

handler.setFormatter(logging.Formatter('%(asctime)s %(module)s [%(levelname)s] : %(message)s'))
logger.addHandler(handler)

# --------------------------------------------------
# 3) Load engine
parser = argparse.ArgumentParser()

parser.add_argument('-res_cluster_dict',
                    type=str,
                    default='./resource/res_cluster_dict.pkl',
                    help='resposne-cluster dictionary path')


parser.add_argument('-ques_embeded_dict',
                    type=str,
                    default='./resource/ques_embed_dict.pkl',
                    help='question-embedding dictionary path')

parser.add_argument('-k',
                    type=int,
                    default=3,
                    help='top k hyperparameter')

parser.add_argument('-thres_prob',
                    type=float,
                    default=0.9,
                    help='max probability threshold')

args = parser.parse_args()

with open(args.ques_embeded_dict, 'rb') as file:
    ques_embedded_dict = pickle.load(file)

with open(args.res_cluster_dict, 'rb') as file:
    res_cluster_dict = pickle.load(file)


scenario_engine = ScenarioAnalysisEngine(input_embedding_endpoint=config.Retrieval_Encoder.endpoint,
                                         ques_embedding_dict=ques_embedded_dict,
                                         response_cluster_dict=res_cluster_dict,
                                         k=args.k,
                                         thres_prob=args.thres_prob)

smalltalk_engine= SmalltalkEngine(slangmodel_endpoint_path=config.Slang.endpoint,
                                  talkmodel_endpoint_path=config.WEAN.endpoint)

engine = ConversationEngine(scenario_model=scenario_engine,
                            smalltalk_model=smalltalk_engine)

# --------------------------------------------------
# 4) Routing functions
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
    logger.info('Start Tikitaka chatting service! 0.0.0.:8080')
    app.run(host="0.0.0.0", port=8080)
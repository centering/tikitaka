#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import re
import pickle
import argparse

from slacker import Slacker
from flask import Flask, request, make_response

# Customized module
from module import ConversationEngine, ScenarioAnalysisEngine, SmalltalkEngine
from config import ModelConfig as config

parser = argparse.ArgumentParser()

parser.add_argument('-res_cluster_dict',
                    type=str,
                    default='./resource/res_cluster_dict.pkl',
                    help='resposne-cluster dictionary path')


parser.add_argument('-ques_embeded_dict',
                    type=str,
                    default='./resource/ques_embed_dict.pkl',
                    help='question-embedding dictionary path')

args = parser.parse_args()

with open(args.ques_embeded_dict, 'rb') as file:
    ques_embedded_dict = pickle.load(file)

with open(args.res_cluster_dict, 'rb') as file:
    res_cluster_dict = pickle.load(file)


scenario_engine = ScenarioAnalysisEngine(input_embedding_endpoint=config.Retrieval_Encoder.endpoint,
                                         ques_embedding_dict=ques_embedded_dict,
                                         response_cluster_dict=res_cluster_dict,
                                         k=3)

smalltalk_engine_wean = SmalltalkEngine(slangmodel_endpoint_path=config.Slang.endpoint,
                                        talkmodel_endpoint_path=config.WEAN.endpoint)

engine_WEAN = ConversationEngine(scenario_model=scenario_engine,
                                 smalltalk_model=smalltalk_engine_wean)

smalltalk_engine_NextSentence = SmalltalkEngine(slangmodel_endpoint_path=config.Slang.endpoint,
                                                talkmodel_endpoint_path=config.NextSentence.endpoint)

engine_NextSentence = ConversationEngine(scenario_model=scenario_engine,
                                         smalltalk_model=smalltalk_engine_NextSentence)

slack_WEAN = Slacker(config.WEAN.token.slack)
slack_NextSentence = Slacker(config.NextSentence.token.slack)


app = Flask(__name__)


# 이벤트 핸들하는 함수
def event_handler(event_type, slack_event, slack, engine):
    if event_type == "app_mention":
        channel = slack_event["event"]["channel"]
        query = slack_event['event']['text']
        query = re.sub(pattern='<@[A-Z0-9]+>', repl='', string=query).strip()

        text = engine.predict(query)

        slack.chat.post_message(channel, text)
        return make_response("앱 멘션 메시지가 보내졌습니다.", 200, )
    message = "[%s] 이벤트 핸들러를 찾을 수 없습니다." % event_type
    return make_response(message, 200, {"X-Slack-No-Retry": 1})


@app.route("/smalltalk_slack_WEAN", methods=["POST"])
def hears_wean():
    slack_event = json.loads(request.data)
    if "challenge" in slack_event:
        return make_response(slack_event["challenge"], 200, {"content_type": "application/json"})
    if "event" in slack_event:
        event_type = slack_event["event"]["type"]
        return event_handler(event_type, slack_event, slack_WEAN, engine_WEAN)
    return make_response("슬랙 요청에 이벤트가 없습니다.", 404, {"X-Slack-No-Retry": 1})


@app.route("/smalltalk_slack_NextSentence", methods=["POST"])
def hears_nextsentence():
    slack_event = json.loads(request.data)
    if "challenge" in slack_event:
        return make_response(slack_event["challenge"], 200, {"content_type": "application/json"})
    if "event" in slack_event:
        event_type = slack_event["event"]["type"]
        return event_handler(event_type, slack_event, slack_NextSentence, engine_NextSentence)
    return make_response("슬랙 요청에 이벤트가 없습니다.", 404, {"X-Slack-No-Retry": 1})


if __name__ == '__main__':
   app.run('0.0.0.0', port=8080)
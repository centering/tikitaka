#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Simple Bot to reply to Telegram messages.

This is built on the API wrapper, see echobot2.py to see the same example built
on the telegram.ext bot framework.
This program is dedicated to the public domain under the CC0 license.
"""
import logging
import telegram
import pickle
import argparse

from telegram.error import NetworkError, Unauthorized
from time import sleep
# Customized module
from module import ConversationEngine, SmalltalkEngine, ScenarioAnalysisEngine
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

smalltalk_engine = SmalltalkEngine(slangmodel_endpoint_path=config.Slang.endpoint,
                                   talkmodel_endpoint_path=config.WEAN.endpoint)

engine = ConversationEngine(scenario_model=scenario_engine,
                            smalltalk_model=smalltalk_engine)
update_id = None


def main():
    """Run the bot."""
    global update_id
    # Telegram Bot Authorization Token
    bot = telegram.Bot(config.WEAN.token.telegram)

    # get the first pending update_id, this is so we can skip over it in case
    # we get an "Unauthorized" exception.
    try:
        update_id = bot.get_updates()[0].update_id
    except IndexError:
        update_id = None

    logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    while True:
        try:
            smalltalk(bot)
        except NetworkError:
            sleep(1)
        except Unauthorized:
            # The user has removed or blocked the bot.
            update_id += 1


def smalltalk(bot):
    """response the message the user sent."""
    global update_id
    # Request updates after the last update_id
    for update in bot.get_updates(offset=update_id, timeout=10):
        update_id = update.update_id + 1

        if update.message:  # your bot can receive updates without messages
            # Reply to the message

            query = update.message.text
            reply = engine.predict(query)
            update.message.reply_text(reply)


if __name__ == '__main__':
    main()
    print("* Start small-chat service!!")

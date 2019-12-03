import eeyore
from eeyore.models.smalltalk.RetrievalDialog import RetrievalDialogInferencer

import pytest

from talkengine.data_util import DataController
from talkengine.module import ConversationEngine, SmalltalkEngine, ScenarioAnalysisEngine


@pytest.fixture
def engine():
    retrieval_args = eeyore.model_config.smalltalk.RetrievalDialog
    inferencer = RetrievalDialogInferencer(retrieval_args)
    inferencer.load_model()

    data_controller = DataController(inferencer)
    thres_prob = 0.9
    scenario_engine = ScenarioAnalysisEngine(data_controller=data_controller,
                                             k=3,
                                             thres_prob=thres_prob)

    smalltalk_engine = SmalltalkEngine()

    return ConversationEngine(scenario_model=scenario_engine,
                              smalltalk_model=smalltalk_engine)


def test_hello(engine):
    query = "안녕"
    response = engine.predict(query)
    assert response in ["반가워요", "안녕하세요", "잘 지내셨나요?"]


def test_by_wean(engine):
    query = "대통령 어떻게 생각해?"
    response = engine.predict(query)
    assert response in ["대통령 지지합니다."]


def test_short_query(engine):
    query = "아"
    response = engine.predict(query)
    assert response in [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']


def test_unknown_query(engine):
    query = "꿻쁑쒶뗶쬁폧"
    response = engine.predict(query)
    assert response in [r"죄송합니다. 이해하지 못했어요 ㅠㅠ", r'잘 못들었지 말입니다??', r'무슨 말씀이신지 이해하지 못했습니다.']

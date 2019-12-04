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
    scenario_engine = ScenarioAnalysisEngine(data_controller=data_controller,
                                             k=3)

    smalltalk_engine = SmalltalkEngine()

    return ConversationEngine(scenario_model=scenario_engine,
                              smalltalk_model=smalltalk_engine)


def test_hello(engine):
    query = "안녕"
    response = engine.predict(query)
    assert response in ["반가워요", "안녕하세요", "잘 지내셨나요?"]


def test_exact_match(engine):
    query = "감사합니다"
    response = engine.predict(query)
    assert response in ["도울 수 있어 기뻐요", "불러만주세요", "언제든 도움이 필요하시면 말씀하세요", "천만에요"]


def test_by_wean(engine):
    query = "어떤 책을 좋아해?"
    response = engine.predict(query)
    assert response in [
        "어제도 마지막 잎새를 읽고 울다 잠들었어요", "책은 마음의 양식이죠", "해리포터 시리즈가 명작이죠"
    ]


def test_empty_query(engine):
    query = ""
    response = engine.predict(query)
    assert response in [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']


def test_short_query(engine):
    query = "."
    response = engine.predict(query)
    assert response in [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']


def test_unknown_query(engine):
    query = "꿻쁑쒶뗶쬁폧"
    response = engine.predict(query)
    assert response in [
        r"죄송합니다. 이해하지 못했어요 ㅠㅠ", r'잘 못들었지 말입니다??', r'무슨 말씀이신지 이해하지 못했습니다.'
    ]


def test_slang(engine):
    slang_resps = [
        '고객님, 99.0%의 확률로 욕이 탐지되었습니다. 바르고 고운말을 씁시다 ^^',
        '고객님, 99.0%의 확률로 욕이 탐지되었습니다. 욕하지 말아주세요 ㅠㅠ',
        '고객님, 99.0%의 확률로 욕이 탐지되었습니다. 욕은 정신건강에 좋지 않아요'
    ]

    response = engine.predict("씨발")
    assert response in slang_resps

    response = engine.predict("안녕")
    assert response not in slang_resps

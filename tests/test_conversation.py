import eeyore
from eeyore.models.smalltalk.RetrievalDialog import RetrievalDialogInferencer

import pytest

from talkengine.data_util import ScenarioDataController, ReactionDataController
from talkengine.module import ConversationEngine, ReactAnalysisEngine, SmalltalkEngine, ScenarioAnalysisEngine


@pytest.fixture
def engine(scope="module"):
    """
    Creates a ConversationEngine
    """
    retrieval_args = eeyore.model_config.smalltalk.RetrievalDialog
    inferencer = RetrievalDialogInferencer(retrieval_args)
    inferencer.load_model()

    scenario_data_controller = ScenarioDataController(inferencer)
    scenario_engine = ScenarioAnalysisEngine(
        data_controller=scenario_data_controller, k=3)

    reaction_data_controller = ReactionDataController()
    reaction_engine = ReactAnalysisEngine(
        data_controller=reaction_data_controller)

    smalltalk_engine = SmalltalkEngine()

    return ConversationEngine(scenario_model=scenario_engine,
                              reaction_model=reaction_engine,
                              smalltalk_model=smalltalk_engine)


def test_hello(engine):
    query = "안녕"
    response = engine.predict(query)
    assert response in ["반가워요", "안녕하세요", "안녕하세요 반갑습니다.", "잘 지내셨나요?"]


def test_exact_match(engine):
    query = "취미가 뭐야?"
    response = engine.predict(query)
    assert response in [
        '저는 독서를 하면서 마음의 양식을 쌓아요', '고객님과 대화하는 게 제 취미예요~', '킬링타임엔 역시 웨이브!',
        '제 취미는 인터넷 쇼핑이에요'
    ]


def test_by_wean(engine):
    query = "어떤 책을 좋아해?"
    response = engine.predict(query)
    assert response in [
        "어제도 마지막 잎새를 읽고 울다 잠들었어요", "책이 좋아요", "책은 마음의 양식이죠", "책을 읽으면 잠이 와요...",
        "해리포터 시리즈가 명작이죠"
    ]


def test_empty_query(engine):
    query = ""
    response = engine.predict(query)
    assert response in [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']


def test_short_query(engine):
    query = "~"
    response = engine.predict(query)
    assert response in [r'좀 더 길게 말씀해주세요~~', r'말씀이 너무 짧으셔서 이해를 못했습니다 ㅜㅜ']


def test_unknown_query(engine):
    query = "카메라도 안통해.. 약도 안통해.. 이 안에 배신자가 있다, 그게 내 결론이다"
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

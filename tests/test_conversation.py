import eeyore
from eeyore.models.smalltalk.RetrievalDialog import RetrievalDialogInferencer

import pytest

from talkengine.data_util import DataController, DB_connection_info
from talkengine.module import ConversationEngine, SmalltalkEngine, ScenarioAnalysisEngine


@pytest.fixture
def engine():
    retrieval_args = eeyore.model_config.smalltalk.RetrievalDialog
    inferencer = RetrievalDialogInferencer(retrieval_args)
    inferencer.load_model()

    data_controller = DataController(DB_connection_info, inferencer)
    thres_prob = 0.9
    scenario_engine = ScenarioAnalysisEngine(data_controller=data_controller,
                                             k=3,
                                             thres_prob=thres_prob)

    smalltalk_engine = SmalltalkEngine()

    return ConversationEngine(scenario_model=scenario_engine,
                              smalltalk_model=smalltalk_engine)


def test_predict_hello(engine):
    query = "안녕"
    response = engine.predict(query)
    assert response in ["반가워요", "안녕하세요", "잘 지내셨나요?"]

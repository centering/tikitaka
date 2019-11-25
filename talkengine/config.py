from easydict import EasyDict
import os

root_path = os.path.dirname(os.path.abspath(__file__))

ModelConfig = EasyDict({
    "WEAN": {
        "endpoint": "http://52.141.21.117:8000/smalltalk_infer_WEAN",
        "token": {
            "telegram": "944020497:AAFJK1SNgjhN7rb8mTFzOzBu2Zyl78Rdo7s",
            "slack": "xoxb-348780167222-791100097539-aHmYvTy1oNWCMT1HwICDbtBT"
        }
    },
    "NextSentence": {
        "endpoint": "http://52.141.21.117:8000/smalltalk_infer_NextSentence",
        "token": {
            "telegram": "",
            "slack": "xoxb-348780167222-806998767776-3DmyVKtf6DcRkF6DhcEsjonI"
        },
    },
    "Retrieval_Encoder": {
        "endpoint": "http://52.141.21.117:8000/smalltalk_infer_Retrieval"
    },
    "Slang": {
        "endpoint": "http://52.141.21.117:8000/slang_filtering"
    }
})
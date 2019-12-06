# Tikitaka
Project for data driven open domain dialog model serving web application

## Main features
    1. Respond proper response(reponse generation or retrieval)

    2. Respond proper response after classifying specific user intention or action

For supporting these functions, Tikitaka provides easy data register & modifying, incremental model learning & deploy

## Model work flow
![](img/Modelflow.png )

## Database ERD
![](img/tikitaka_erd.png )
---

## Bug report

## To do
    - 기존에 작성한 발화를 수정할 수 있으면 좋을 것 같아요
    - 그룹/시나리오의 경우 x를 눌렀을 때 확인 팝업이 한 번 뜨면 좋을 것 같아요
    - 새로운 발화를 입력했을 때 우측 상단의 저장 버튼을 누르지 않아도 발화가 저장되면 좋을 것 같습니다
    - 응답 속도 개선

    - Intent, Entity CRUD interface implmentation
    - Dialog Flow Rule Engine adaptation
    - Stable Server environment
    - Scenario, Reaction, Blacklist title modification
    - Model train & validation web UI
    - Model performance increasing
    - Bot UI modification
    - Preprocessing module implemenation & embedding
from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_condition

class IntentDao:
    def create_intent(name, description):
        condition = {'name': name, 'description': description}
        intent_id = _insert_item('INTENT', condition)
        
        return intent_id

    def get_intent_list(condition={}):
        return _get_item('INTENT', condition)

    def get_intent_utterance(intent_id):
        condition = {'intent_id': intent_id}
        return _get_item('INTENT_UTTERANCE', condition)

    def update_intent(id, name, description):
        condition = {'name': name, 'description': description}
        _update_item_using_id('INTENT', id, condition)

    def update_intent_utterance(id, intent_utterance):
        condition = {'intent_id': id}
        _delete_item_using_condition('INTENT_UTTERANCE', condition)

        for utterance in intent_utterance:
            utterance_condition = {'intent_id':id, 'text':utterance }
            _insert_item('INTENT_UTTERANCE', utterance_condition)

    def delete_intent(intent_id):
        condition = {'id': intent_id}
        _delete_item_using_condition('INTENT', condition)
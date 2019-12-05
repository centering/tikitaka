from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_id, _delete_item_using_condition

class BlacklistGroupDao:
    def create_blacklist_group(blacklist_group_name):
        condition = {'name': blacklist_group_name}
        
        blacklist_group_id = _insert_item('BLACKLIST_GROUP', condition)

        return blacklist_group_id

    def get_blacklist_group_list():
        condition = {}
        return _get_item('BLACKLIST_GROUP', condition)

    def delete_blacklist_group(blacklist_group_id):
        _delete_item_using_id('BLACKLIST_GROUP', blacklist_group_id)

class BlacklistDao:
    def create_blacklist(blacklist_group_id):
        condition = {'blacklist_group_id': blacklist_group_id}
        blacklist_id = _insert_item('BLACKLIST', condition)
        
        return blacklist_id

    def get_blacklist_list(blacklist_group_id):
        condition = {'blacklist_group_id': blacklist_group_id}
        return _get_item('BLACKLIST', condition)

    def get_blacklist_query(blacklist_id):
        condition = {'blacklist_id': blacklist_id}
        return _get_item('BLACKLIST_QUERY', condition)

    def get_blacklist_response(blacklist_id):
        condition = {'blacklist_id': blacklist_id}
        return _get_item('BLACKLIST_RESPONSE', condition)

    def get_entire_blacklist_query_response():
        condition = {}
        return _get_item('BLACKLIST_QUERY', condition), _get_item('BLACKLIST_RESPONSE', condition)

    def update_blacklist(id, blacklist_query=[], blacklist_response=[]):
        condition = {'blacklist_id': id}
        _delete_item_using_condition('BLACKLIST_QUERY', condition)
        _delete_item_using_condition('BLACKLIST_RESPONSE', condition)

        for query in blacklist_query:
            query_condition = {'blacklist_id':id, 'text':query }
            _insert_item('BLACKLIST_QUERY', query_condition)

        for query in blacklist_response:
            query_condition = {'blacklist_id':id, 'text':query }
            _insert_item('BLACKLIST_RESPONSE', query_condition)

    def delete_blacklist(blacklist_id):
        condition = {'id': blacklist_id}
        _delete_item_using_condition('BLACKLIST', condition)
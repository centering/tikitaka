from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_id, _delete_item_using_condition

class EntityDao:
    def create_entity(name, value):
        condition = {'name': name, 'value': value}
        entity_id = _insert_item('ENTITY', condition)
        
        return entity_id

    def get_entity_list(condition={}):
        return _get_item('ENTITY', condition)

    def get_entity_synonym(entity_id):
        condition = {'entity_id': entity_id}
        return _get_item('SYNONYM', condition)

    def update_entity(id, name, value):
        condition = {'name': name, 'value': value}
        _update_item_using_id('ENTITY', id, condition)

    def update_entity_synonym(id, synonym):
        condition = {'entity_id': id}
        _delete_item_using_condition('SYNONYM', condition)

        for query in synonym:
            query_condition = {'entity_id':id, 'text':query }
            _insert_item('SYNONYM', query_condition)

    def delete_entity(id):
        condition = {'id': id}
        _delete_item_using_condition('ENTITY', condition)
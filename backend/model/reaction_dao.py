from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_id, _delete_item_using_condition

class ReactionGroupDao:
    def create_reaction_group(reaction_group_name):
        condition = {'name': reaction_group_name}
        
        reaction_group_id = _insert_item('REACTION_GROUP', condition)

        return reaction_group_id

    def get_reaction_group_list():
        condition = {}
        return _get_item('REACTION_GROUP', condition)

    def delete_reaction_group(reaction_group_id):
        _delete_item_using_id('REACTION_GROUP', reaction_group_id)

class ReactionDao:
    def create_reaction(reaction_group_id):
        condition = {'reaction_group_id': reaction_group_id}
        reaction_id = _insert_item('reaction', condition)
        
        return reaction_id

    def get_reaction_list(reaction_group_id):
        condition = {'reaction_group_id': reaction_group_id}
        return _get_item('reaction', condition)

    def get_reaction_type(reaction_id):
        condition = {'reaction_id': reaction_id}
        return _get_item('REACTION_TYPE', condition)

    def get_reaction_response(reaction_id):
        condition = {'reaction_id': reaction_id}
        return _get_item('REACTION_RESPONSE', condition)

    def update_reaction(id, reaction_type=[], reaction_response=[]):
        condition = {'reaction_id': id}
        _delete_item_using_condition('REACTION_TYPE', condition)
        _delete_item_using_condition('REACTION_RESPONSE', condition)

        for type in reaction_type:
            type_condition = {'reaction_id':id, 'text':type }
            _insert_item('REACTION_TYPE', type_condition)

        for query in reaction_response:
            query_condition = {'reaction_id':id, 'text':query }
            _insert_item('REACTION_RESPONSE', query_condition)

    def delete_reaction(reaction_id):
        condition = {'id': reaction_id}
        _delete_item_using_condition('REACTION', condition)
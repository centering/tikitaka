from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_id, _delete_item_using_condition

class ScenarioGroupDao:
    def create_scenario_group(scenario_group_name):
        condition = {'name': scenario_group_name}
        
        scenario_group_id = _insert_item('SCENARIO_GROUP', condition)

        return scenario_group_id

    def get_scenario_group_list():
        condition = {}
        return _get_item('SCENARIO_GROUP', condition)

    def delete_scenario_group(scenario_group_id):
        _delete_item_using_id('SCENARIO_GROUP', scenario_group_id)

class ScenarioDao:
    def create_scenario(scenario_group_id):
        condition = {'scenario_group_id': scenario_group_id}
        scenario_id = _insert_item('SCENARIO', condition)
        
        return scenario_id

    def get_scenario_list(scenario_group_id):
        condition = {'scenario_group_id': scenario_group_id}
        return _get_item('SCENARIO', condition)

    def update_scenario(id, scenario_query=[], scenario_response=[]):
        condition = {'scenario_id': id}
        _delete_item_using_condition('SCENARIO_QUERY', condition)
        _delete_item_using_condition('SCENARIO_RESPONSE', condition)

        for query in scenario_query:
            query_condition = {'scenario_id':id, 'text':query }
            _insert_item('SCENARIO_QUERY', query_condition)

        for query in scenario_response:
            query_condition = {'scenario_id':id, 'text':query }
            _insert_item('SCENARIO_RESPONSE', query_condition)

    def delete_scenario(scenario_id):
        condition = {'id': scenario_id}
        _delete_item_using_condition('SCENARIO', condition)
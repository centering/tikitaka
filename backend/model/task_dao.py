from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_id

class TaskDao:
    def get_task_list(id=None):
        condition = {}
        if id is not None:
            condition['id'] = id

        return _get_item('TASK', condition)

    def create_task(name, task_type_id, desc=None):
        task_info = {}
        task_info['name'] = name
        if desc is not None: task_info['desc'] = desc

        return _insert_item('TASK', task_info)

    def modify_task(id, task_type_id=None, name=None, model_id=None, suggest_yn=None, desc=None):
        task_info = {}

        if task_type_id is not None:task_info['task_type_id'] = task_type_id
        if name is not None:        task_info['name'] = name
        if model_id is not None:    task_info['model_id'] = model_id
        if suggest_yn is not None:  task_info['suggest_yn'] = suggest_yn
        if desc is not None:        task_info['desc'] = desc
       
        _update_item_using_id('TASK', id, task_info)

    def delete_task(id):
        _delete_item_using_id('TASK', id)
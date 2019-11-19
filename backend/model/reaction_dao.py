from model.common_dao import sql_execute, _insert_item, _get_item, _update_item_using_id, _delete_item_using_id

class ReactionDao:
    def get_project_list(id=None):
        condition = {}
        if id is not None:
            condition['id'] = id

        return _get_item('PROJECT', condition)

    def create_project(name, user_email, desc=None):
        project_info = {}
        project_info['name'] = name
        project_info['desc'] = desc if desc is not None else ''

        project_id = _insert_item('PROJECT', project_info)

        return project_id
        
    def modify_project(id, name=None, desc=None):
        assert (name is not None) or (desc is not None)

        project_info = {}
        if name is not None:
            project_info['name'] = name
        if desc is not None:
            project_info['desc'] = desc

        _update_item_using_id('PROJECT', id, project_info)

    def delete_project(id):
        _delete_item_using_id('PROJECT', id)
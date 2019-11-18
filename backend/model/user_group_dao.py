from .common_dao import sql_execute, _get_item, _insert_item, _update_item_using_id, _delete_item_using_id, get_user_id_by_email, user_activate_check, get_role_id_by_name

class UserGroupDao:
    def check_user_assigned_to_user_group(user_id, user_group_id):
        sql = """
        SELECT
            *
        FROM
            USER_GROUP_USER_REL
        WHERE
            USER_GROUP_USER_REL.user_id = {} AND USER_GROUP_USER_REL.user_group_id = {}
	    """.format(user_id, user_group_id)

        rows = sql_execute(sql)

        if len(rows) > 0:
            return True

        return False

    def delete_user_from_user_group(email):
        user_id = get_user_id_by_email(email)

        sql = """
        DELETE FROM USER_GROUP_USER_REL
        WHERE user_id = {}
        """.format(user_id)

        sql_execute(sql)
        
    def assign_user_to_user_group(email, user_group_id):
        user_id = get_user_id_by_email(email)

        column_value_dict = {'user_id':user_id, 'user_group_id':user_group_id}
        user_group_user_rel_id = _insert_item('USER_GROUP_USER_REL', column_value_dict)

        return user_group_user_rel_id

    def check_editable_user_group(user_group_id):
        sql = """
        SELECT
            name
        FROM
            USER_GROUP
        WHERE
            id = {}
        """.format(user_group_id)

        rows = sql_execute(sql)
        user_group_name = rows[0]['name']

        if user_group_name in ['Admin', 'Guest']: return False

        return True
        
    def create_user_group(project_id, name, desc, role):
        column_value_dict = {'name':name, 'project_id':project_id, 'desc':desc, 'role_id':get_role_id_by_name(role)}
        user_group_id = _insert_item('USER_GROUP', column_value_dict)

        return user_group_id

    def get_user_group(project_id, size, offset, sort=None, order=None, search_col=None, search_val=None):
        sql = """
        SELECT
            USER_GROUP.id as user_group_id,
            USER_GROUP.name as user_group_name,
            USER_GROUP.desc as user_group_desc,
            ROLE.name as role
            
        FROM
            USER_GROUP
            LEFT JOIN ROLE ON USER_GROUP.role_id = ROLE.id
        WHERE
            USER_GROUP.project_id = {}
        """.format(project_id)

        if search_col is not None and search_val is not None:
            sql += " AND {} LIKE '%{}%' ".format(search_col, search_val)            

        if sort is not None and order is not None:
            sql += " ORDER BY {} {} ".format(sort, order)

        data = sql_execute(sql)

        return data

    def update_user_group(user_group_id, user_group_name, user_group_desc, role):
        column_value_dict = {}
        column_value_dict['name'] = user_group_name
        column_value_dict['desc'] = user_group_desc
        column_value_dict['role_id'] = get_role_id_by_name(role)

        _update_item_using_id('USER_GROUP', user_group_id, column_value_dict)
        
    def delete_user_group(user_group_id):
        _delete_item_using_id('USER_GROUP', user_group_id)
        

  
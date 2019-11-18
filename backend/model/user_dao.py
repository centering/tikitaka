from .common_dao import sql_execute, _insert_item, _update_item_using_id, _delete_item_using_id, get_user_id_by_email, user_activate_check

from .user_group_dao import UserGroupDao

def get_role_id_by_name(role_name):
    sql = ("SELECT id FROM ROLE WHERE name = '{}'".format(role_name))
    rows = sql_execute(sql)

    if len(rows) < 1 or 'id' not in rows:
        raise ValueError('check role_name whether it exist')

    return rows[0]['id']

def check_user_password_check(user_id, password):
    sql = ("SELECT id FROM USER WHERE id = {} and password = password('{}')").format(user_id, password)
    rows = sql_execute(sql)

    if len(rows) > 0:
        return True

    return False

class UserDao:
    def assign_user_to_user_group(user_id, user_group_id):
        assign_user_group_info = {}
        assign_user_group_info['user_id'] = user_id
        assign_user_group_info['user_group_id'] = user_group_id

        _insert_item('USER_GROUP_USER_REL', assign_user_group_info)

    def get_user_assigned_user_group(user_id, project_id):
        sql = """
        SELECT
            USER_GROUP_USER_REL.user_group_id,
            USER_GROUP.name,
            ROLE.name as role
        FROM 
            USER_GROUP_USER_REL
            LEFT JOIN USER_GROUP ON USER_GROUP_USER_REL.user_group_id = USER_GROUP.id 
            LEFT JOIN USER ON USER_GROUP_USER_REL.user_id = USER.id
            LEFT JOIN ROLE ON USER_GROUP.role_id = ROLE.id
        WHERE
            1=1
            AND USER_GROUP_USER_REL.user_id = {}
            AND USER_GROUP.project_id = {}
        """.format(user_id, project_id)

        rows = sql_execute(sql)

        return rows

    def get_user_project_list(email):
        sql = """
        SELECT
            PROJECT.id as project_id,
            PROJECT.name as project_name,
            PROJECT.desc as project_desc,
            USER_GROUP.id as user_group_id,
            USER_GROUP.name as user_group_name,
            ROLE.name as role
        FROM
            (
            SELECT
                user_group_id
            FROM
                USER_GROUP_USER_REL LEFT JOIN USER ON USER_GROUP_USER_REL.user_id = USER.id
            WHERE
                USER.email='{}'
            ) as assigned_group

            LEFT JOIN USER_GROUP ON assigned_group.user_group_id = USER_GROUP.id
            LEFT JOIN ROLE ON USER_GROUP.role_id = ROLE.id
            LEFT JOIN PROJECT ON USER_GROUP.project_id = PROJECT.id
        """.format(email)

        rows = sql_execute(sql)

        return rows

    def get_project_total_users(project_id, sort=None, order=None, search_col=None, search_val=None):
        sql = """
        SELECT
            USER_GROUP.project_id,
            USER.id as user_id,
            USER.name,
            USER.email,
            USER.create_dt,
            USER.modify_dt,
            USER.activate
        FROM
            USER
            LEFT JOIN USER_GROUP_USER_REL ON USER.id = USER_GROUP_USER_REL.user_id
            LEFT JOIN USER_GROUP ON USER_GROUP_USER_REL.user_group_id = USER_GROUP.id
        WHERE
            USER_GROUP.project_id={}
        """.format(project_id)

        if search_col is not None and search_val is not None:
            sql += " AND USER.{} LIKE '%{}%' ".format(search_col, search_val)            

        sql += " GROUP BY USER.id "

        if sort is not None and order is not None:
            sql += " ORDER BY {} {} ".format(sort, order)

        rows = sql_execute(sql)

        return rows

    def get_user_info(user_id):
        sql = """
        SELECT
            email,
            create_dt,
            modify_dt,
            activate
        FROM
            USER
        WHERE
            id = {}
        """.format(user_id)

        rows = sql_execute(sql)

        return rows
        
    def get_user_list(project_id=None, activate=None, offset=None, size=None):
        sql = """
        SELECT
            USER.id,
            PROJECT_USER.project_id,
            USER.email,
            USER.name, 
            GROUP_CONCAT(ROLE.name SEPARATOR ', ') as role,
            DATE_FORMAT(USER.create_dt,'%Y-%m-%d %H:%i:%s') as create_dt,
            DATE_FORMAT(USER.modify_dt,'%Y-%m-%d %H:%i:%s') as modify_dt,
            USER.activate
        FROM
            PROJECT_USER
            LEFT JOIN USER ON PROJECT_USER.user_id = USER.id
            LEFT JOIN ROLE ON PROJECT_USER.role_id = ROLE.id
        WHERE
            1 = 1 
        """

        if project_id is not None:
            sql += " AND PROJECT_USER.project_id = {}".format(project_id)

        if activate is not None:
            sql += " AND USER.activate = '{}'".format(activate)

        sql += " GROUP BY PROJECT_USER.user_id "

        if offset is not None and size is not None:
            sql += " LIMIT {} OFFSET {} ".format(size, offset)

        rows = sql_execute(sql)

        return rows

    def create_user(email, project_id):
        #create user as inactive status
        sql = """
        INSERT INTO USER (email, activate) VALUES ('{}', 'false')
        """.format(email)

        user_id = sql_execute(sql, return_id=True)

    def update_user(email, name=None, cur_password=None, password=None, activate=None, user_groups=None):
        user_id = get_user_id_by_email(email)

        column_value_dict = {}

        if cur_password is not None and password is not None:
            if not check_user_password_check(user_id, cur_password):
                return False
            else:
                column_value_dict['password'] = password
                
                if name is not None: column_value_dict['name'] = name
                if activate is not None: column_value_dict['activate'] = activate

                _update_item_using_id('USER', user_id, column_value_dict)

                if user_groups is not None:
                    for each_group in user_groups:
                        user_group_id = each_group['user_group_id']

                        if not UserGroupDao.check_user_assigned_to_user_group(user_id, user_group_id):
                            UserGroupDao.assign_user_to_user_group(email, user_group_id)

                return True
        else:
            if name is not None: column_value_dict['name'] = name
            if activate is not None: column_value_dict['activate'] = activate

            _update_item_using_id('USER', user_id, column_value_dict)

            if user_groups is not None:
                for each_group in user_groups:
                    user_group_id = each_group['user_group_id']

                    if not UserGroupDao.check_user_assigned_to_user_group(user_id, user_group_id):
                        UserGroupDao.assign_user_to_user_group(email, user_group_id)

            return True
            

    def get_auth_user(email, pwd):
        sql = """
        SELECT 
            name, email
        FROM 
            USER
        WHERE email='{}' and password=password('{}')
        """.format(email, pwd)

        rows = sql_execute(sql)

        return rows

    def check_user_exist(email):
        sql = """
        SELECT
            USER.id,
        FROM
            USER
        WHERE
            '{}'
        """.format(email)

        rows = sql_execute(sql)

        if len(rows) > 0:
            return True
            
        return False

    def check_user_assigned_to_project(email, project_id):
        user_id = get_user_id_by_email(email)

        sql = """
        SELECT
            USER_GROUP_USER_REL.user_id,
            USER_GROUP.id as user_group_id,
            USER_GROUP.project_id
        FROM
            USER_GROUP_USER_REL LEFT JOIN USER_GROUP ON USER_GROUP_USER_REL.user_group_id = USER_GROUP.id
        WHERE
            1=1
            AND USER_GROUP_USER_REL.user_id={}
            AND USER_GROUP.project_id={}
        """.format(user_id, project_id)

        rows = sql_execute(sql)

        if len(rows) > 0:
            return True
            
        return False

    def delete_user(email):
        user_id = get_user_id_by_email(email)
        _delete_item_using_id('USER', user_id)

    def delete_user_from_user_group(email):
        user_id = get_user_id_by_email(email)
        UserGroupDao.assign_user_to_user_group
        
        






import json
import pymysql

def getConnection():
        """
        DB connection func
        """
        from .config import DB_connection_info
        return pymysql.connect(
            host=DB_connection_info.host,
            port=DB_connection_info.port,
            user=DB_connection_info.user,
            passwd=DB_connection_info.passwd,
            db=DB_connection_info.db,
            charset=DB_connection_info.charset
        )

def sql_execute(sql, return_id=False):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    curs.execute(sql)

    id = curs.lastrowid

    conn.commit()
    conn.close()

    rows = curs.fetchall()

    if return_id:
        return id

    return rows

def _insert_item(table_name, column_value_dict):
    if len(column_value_dict) < 1:
        raise ValueError('at least one column value pair should be set')
    if not isinstance(column_value_dict, dict):
        raise ValueError('column_value_dict should be dictionary format')
    
    sql = """
    INSERT INTO `{}` ( {} ) VALUES ( {} )
    """.format(table_name, ', '.join(["`" + str(key) + "`" for key in list(column_value_dict.keys())]), 
                            ', '.join([str(value) if not isinstance(value, str) else "'" + value + "'" for value in list(column_value_dict.values())]))

    return sql_execute(sql, return_id=True)

def _get_item(table_name, condition, limit=None, offset=None):
    if not isinstance(condition, dict):
        raise ValueError('condition should be dictionary format')

    sql =  """
    SELECT 
        *
    FROM
        {}
    WHERE
        1=1
    """.format(table_name)

    for key, value in condition.items():
        if isinstance(value, str):
            sql += " AND {} = '{}'".format(key, value )
        else:
            sql += " AND {} = {}".format(key, value )

    if limit is not None and offset is not None:
            sql += " LIMIT {} OFFSET {} ".format(limit, offset)
    
    return sql_execute(sql)
    
def _update_item_using_id(table_name, row_id, column_value_dict):
    if len(column_value_dict) < 1:
        print ('at least one column value pair should be set, update will be ignored')
        return 
    if not isinstance(column_value_dict, dict):
        raise ValueError('column_value_dict should be dictionary format')
    
    sql = """
    UPDATE {} SET 
    """.format(table_name)

    for column, value in column_value_dict.items():
        if 'password' != column:
            sql += """`{}` = '{}',""".format(column, value)
        else:
            sql += """{} = password('{}'),""".format(column, value)

    sql = sql[:-1]

    sql += """ WHERE id = {}""".format(row_id)

    sql_execute(sql)

def _delete_item_using_id(table_name, row_id):
    sql = """
    DELETE FROM {} 
    """.format(table_name)

    sql += """ WHERE id = {}""".format(row_id)

    sql_execute(sql)

def user_activate_check(email):
    sql = """
    SELECT id FROM USER WHERE email = '{}' AND activate = 'true'
    """.format(email)

    rows = sql_execute(sql)

    if len(rows) > 0:
        return True

    return False

def get_user_id_by_email(email):
    sql = ("SELECT id FROM USER WHERE email = '{}'".format(email))
    rows = sql_execute(sql)

    if len(rows) < 1:
        raise ValueError('check user email whether it exist')

    return rows[0]['id']

def get_role_id_by_name(role_name):
    sql = ("SELECT id FROM ROLE WHERE name = '{}'".format(role_name))
    rows = sql_execute(sql)

    if len(rows) < 1:
        raise ValueError('check role_name whether it exist')

    return rows[0]['id']





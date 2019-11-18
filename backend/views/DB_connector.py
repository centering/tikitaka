import json
import pymysql

from .config import log_connection_info

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

### internal DB functions ###
def _delete_item_using_id(table_name, row_id, id_column='id'):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = """DELETE FROM {} WHERE {} = {}""".format(table_name, id_column, row_id)
    curs.execute(sql)

    conn.commit()
    conn.close()

def _update_item_using_id(table_name, row_id, columns=[], values=[]):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    if len(columns) < 1:
        raise ValueError('at least one column should set')
    if len(values) < 1:
        raise ValueError('at least one value should set')
    if len(columns) != len(values):
        raise ValueError('column & value number should be same')

    sql = """UPDATE {} SET """.format(table_name)

    for i, eachColumn in enumerate(columns):
        if 'password' != eachColumn:
            sql += """{} = '{}',""".format(eachColumn, values[i])
        else:
            sql += """{} = password('{}'),""".format(eachColumn, values[i])

    sql = sql[:-1]

    sql += """ WHERE id = {}""".format(row_id)

    curs.execute(sql)

    conn.commit()
    conn.close()

def _get_domain_id(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM DOMAIN WHERE name = '{}'".format(args['domain']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_domain_name(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT name FROM DOMAIN WHERE id = '{}'".format(args['domain_id']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['name']


def _get_intent_id(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM INTENT WHERE name = '{}'".format(args['intent']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_intent_name(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT name FROM INTENT WHERE id = '{}'".format(args['intent_id']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['name']

def _get_entity_id(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM ENTITY WHERE type = '{}'".format(args['entity']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

### user related internal DB functions ###
def _get_user_id(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM USER WHERE name = '{}'".format(args['user']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_user_id_by_email(email):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM USER WHERE email = '{}'".format(email))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_user_name(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT name FROM USER WHERE id = '{}'".format(args['user_id']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['name']

def _get_user_email(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT email FROM USER WHERE id = '{}'".format(args['user_id']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['email']

def _check_user_password_check(user_id, password):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM USER WHERE id = {} and password = password('{}')").format(user_id, password)
    curs.execute(sql)
    rows = curs.fetchall()

    if len(rows) > 0:
        return True

    return False

def _get_role_id(role_name):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM ROLE WHERE name = '{}'".format(role_name))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_project_id(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM PROJECT WHERE name = '{}'".format(args['project']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_job_kind_id(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = ("SELECT id FROM JOB_KIND WHERE type = '{}'".format(args['job_type']))
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['id']

def _get_job_kind_from_job(job_id):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = """
    SELECT 
        JOB_KIND.type 
    FROM
        JOB, JOB_KIND
    WHERE
        JOB.id = %s AND
        JOB_KIND.id = JOB.job_kind_id
    """

    curs.execute(sql, job_id)
    rows = curs.fetchall()

    conn.close()

    return rows[0]['type']


### speaker DB functions ###
def create_speaker(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    speaker_insert_sql = """
    INSERT INTO SPEAKER (sender) values (%s)
    """
    crus.execute(speaker_insert_sql, (args['sender']))

    conn.commit()
    conn.close()

def update_speaker(args):
    columns = []
    values = []

    for key, value in args.items():
        if key == 'id': continue
        columns.append(key)
        values.append(value)

    _update_item_using_id('SPEAKER', args['id'], columns=columns, values=values)

### domain DB functions ###
def create_domain(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    # args : project_id (or project name), name
    if 'project_id' in args.keys() and args['project_id'] is not None:
        project_id = args['project_id']
    elif args['project'] is not None:
        project_id = _get_project_id(args)

    domain_insert_sql = """
    INSERT INTO DOMAIN(name, project_id) values (%s, %s)
    """
    curs.execute(domain_insert_sql, (args['name'], project_id))

    conn.commit()
    conn.close()

def update_domain(domain_obj):
    columns = []
    values = []

    for key, value in args.items():
        if key == 'id': continue
        columns.append(key)
        values.append(value)

    _update_item_using_id('DOMAIN', args['id'], columns=columns, values=values)

def delete_domain(domain_id):
    _delete_item_using_id('DOMAIN', domain_id)

def get_domain_list(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = """
    SELECT 
        id,
        name,
        project_id,
        DATE_FORMAT(modify_dt,'%Y-%m-%d') as modify_dt
    FROM 
        DOMAIN
    """
    if args is not None and args['project_id'] is not None:
        sql += " WHERE project_id = {}".format(args['project_id'])

    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows

### intent DB functions ###
def create_intent(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    ## args: 'domain', 'name'
    domain_id = _get_domain_id(args)

    intent_insert_sql = """
    INSERT INTO INTENT(name, domain_id) values (%s, %s)
    """

    curs.execute(intent_insert_sql, (args['name'], domain_id))

    conn.commit()
    conn.close()

def update_intent(intent_obj):
    columns = []
    values = []

    for key, value in args.items():
        if key == 'id': continue
        columns.append(key)
        values.append(value)

    _update_item_using_id('INTENT', args['id'], columns=columns, values=values)

def delete_intent(intent_id):
    _delete_item_using_id('INTENT', intent_id)

def get_intent_list(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = """
    SELECT
        DOMAIN.project_id,
        INTENT.id,
        INTENT.name,
        DOMAIN.name as domain,
        DATE_FORMAT(INTENT.modify_dt,'%Y-%m-%d') as modify_dt
    FROM
        INTENT, DOMAIN
    WHERE
        INTENT.domain_id = DOMAIN.id
    """

    if args is not None:
        if 'project_id' in args.keys():
            sql += 'AND DOMAIN.project_id = {}'.format(args['project_id'])

        if 'domain_id' in args.keys() and args['domain_id'] is not None:
            sql += " AND DOMAIN.id = {}".format(args['domain_id'])
        elif args['domain'] is not None:
            domain_id = _get_domain_id({'domain':args['domain'].strip()})
            sql += " AND DOMAIN.id = {}".format(domain_id)

    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows

### dialog act DB functions ###
def create_dialogAct(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    #args: type
    dialogAct_insert_sql = """
    INSERT INTO DIALOB_ACT(type) values (%s)
    """
    curs.execute(dialogAct_insert_sql, (args['type']))

    conn.commit()
    conn.close()

def update_dialogAct(dialogAct_obj):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

def delete_dialogAct(dialogAct_id):
    _delete_item_using_id('DIALOG_ACT', dialogAct_id)

def get_dialogAct_list():
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = """
    SELECT 
        id,
        type,
        DATE_FORMAT(modify_dt,'%Y-%m-%d') as modify_dt
    FROM 
        DIALOG_ACT
    """
    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows

### entity DB functions ###
def create_entity(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    ## args: 'domain', 'type', 'color'
    domain_id = _get_domain_id(args)
    entity_type = args['type']

    if args['color']:
        entity_insert_sql = """
        INSERT INTO ENTITY(type, domain_id, color) values (%s, %s, %s)
        """
        curs.execute(entity_insert_sql, (entity_type, domain_id, args['color']))
    else:
        entity_insert_sql = """
        INSERT INTO ENTITY(type, domain_id) values (%s, %s)
        """
        curs.execute(entity_insert_sql, (entity_type, domain_id))

    conn.commit()
    conn.close()

def update_entity(entity_obj):
    columns = []
    values = []

    for key, value in args.items():
        if key == 'id': continue
        columns.append(key)
        values.append(value)

    _update_item_using_id('ENTITY', args['id'], columns=columns, values=values)

def delete_enity(entity_id):
    _delete_item_using_id('ENTITY', entity_id)

def get_entity_list(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    #get entity list with major synonyms and domain group
    sql = """
    SELECT
        ENTITY.id,
        ENTITY.type,     
        GROUP_CONCAT(DOMAIN.name SEPARATOR ',') AS domains,
        GROUP_CONCAT(ENTITY.color SEPARATOR ',') AS color,
        DATE_FORMAT(ENTITY.modify_dt,'%Y-%m-%d') as modify_dt,
        SYNONYM_GROUP.synonyms
    FROM
        DOMAIN,
        ENTITY
        LEFT JOIN (SELECT entity_id, GROUP_CONCAT(DISTINCT value SEPARATOR ', ') as synonyms FROM SYNONYM WHERE id = super_id GROUP BY entity_id) AS SYNONYM_GROUP ON ENTITY.id = SYNONYM_GROUP.entity_id
    WHERE
        ENTITY.domain_id = DOMAIN.id
    """

    if args is not None:
        if 'project_id' in args.keys():
            sql += " AND DOMAIN.project_id={}".format(args['project_id'])

        if 'domain' in args.keys() and args['domain'] is not None:
            domain_id = _get_domain_id({'domain':args['domain'].strip()})
            sql += " AND ENTITY.domain_id = '{}'".format(domain_id)
        elif 'domain_id' in args.keys() and args['domain_id'] is not None:
            sql += " AND ENTITY.domain_id = '{}'".format(args['domain_id'])

    sql += " GROUP BY TYPE"

    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows

### user DB functions ###
def create_user(email, project_id):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    #create user as inactive status
    sql = """
    INSERT INTO USER (email, activate) VALUES ('{}', 'false')
    """.format(email)

    curs.execute(sql)
    user_id = curs.lastrowid

    #register user as a 'guest'
    sql = """
    INSERT INTO PROJECT_USER (project_id, user_id, role_id) VALUES ({}, {}, {})
    """.format(project_id, user_id, _get_role_id('guest'))

    curs.execute(sql)

    conn.commit()
    conn.close()

def user_activate_check(name):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)


    sql = """
    SELECT id FROM USER WHERE name = '{}' AND activate= 'true'
    """.format(name)

    curs.execute(sql)
    rows = curs.fetchall()

    print(rows)
    
    if len(rows) > 0:
        return True

    return False

def update_user(args):
    columns = []
    values = []

    for key, value in args.items():
        if key == 'id': continue
        if key == 'emails': key = 'email'

        columns.append(key)
        values.append(value)

    if len(columns) > 0:
        if 'id' in args.keys():
            _update_item_using_id('USER', args['id'], columns=columns, values=values)
        else:
            _update_item_using_id('USER', _get_user_id_by_email(args['emails']), columns=columns, values=values)

def update_user_with_role(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    user_id = _get_user_id_by_email(args['emails'])

    #if modifed role exist, delete previous user role first and update
    if 'role' in args.keys() and args['role'] is not None:
        sql = """
        DELETE FROM PROJECT_USER
        WHERE
            1=1
        """

        sql += " AND project_id={} ".format(args['project_id'])
        sql += " AND user_id={} ".format(user_id)

        curs.execute(sql)

        if not isinstance(args['role'], list):
            raise ValueError('role argument should be list type')

        for eachRole in args['role']:
            sql  = """
            INSERT INTO PROJECT_USER (project_id, user_id, role_id) VALUES ({}, {}, {})
            """.format(args['project_id'], user_id, _get_role_id(eachRole))

            curs.execute(sql)

        conn.commit()

    update_user_args = {}
    update_user_args['id'] = user_id

    #when user password modifying(for auth check, compare current password)
    if 'password' in args.keys() and 'cur_password' in args.keys() and args['cur_password'] is not None and args['password'] is not None:
        update_user_args['cur_password'] = args['cur_password']

        #auth check
        if not _check_user_password_check(user_id, update_user_args['cur_password']):
            #auch check fail
            conn.close()
            return False

        update_user_args['password'] = args['password']
        del update_user_args['cur_password']

    if 'name' in args.keys() and args['name'] is not None:
        update_user_args['name'] = args['name']
    if 'activate' in args.keys() and args['activate'] is not None:
        update_user_args['activate'] = args['activate']

    update_user(update_user_args)
    conn.commit()
    
    conn.close()

    return True

def delete_user(user_id):
    _delete_item_using_id('USER', user_id)

def get_user_list(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

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

    if args is not None and args['project_id'] is not None:
        sql += " AND PROJECT_USER.project_id = {}".format(args['project_id'])

    if args is not None and args['activate'] is not None:
        sql += " AND USER.activate = '{}'".format(args['activate'])

    sql += " GROUP BY PROJECT_USER.user_id "

    if args['from']!=None and args['size']!=None:
        sql += " LIMIT {} OFFSET {} ".format(args['size'], args['from'])

    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    return rows

def check_user_exist(email):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    sql = """
    SELECT
        USER.id,
    FROM
        USER
    WHERE
        '{}'
    """.format(email)

    curs.execute(sql)
    rows = curs.fetchall()

    conn.close()

    if len(rows) > 0:
        return True
        
    return False
   

### job DB functions ###
def create_job(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    project_id = args['project_id']
    job_kind_id = _get_job_kind_id(args)
    args['job_kind_id'] = job_kind_id
    del args['job_type']

    args['user'] = args['assigner']
    args['assigner'] = _get_user_id(args)
    del args['user']

    #domain, intent is not mandatory about job
    if 'domain' in args.keys() and args['domain'] is not None:
        domain_id = _get_domain_id(args)
        args['domain_id'] = domain_id
        del args['domain']

    if 'intent' in args.keys() and args['intent'] is not None:
        intent_id = _get_intent_id(args)
        args['intent_id'] = intent_id
        del args['intent']

    assign_cnt = args['assign_cnt']

    job_insert_sql = """
    INSERT INTO JOB(
    """

    for key, value in args.items():
        if key in ['filters', 'assignee', 'entities','predict_req']:
            continue

        job_insert_sql += str(key) + ', '
    job_insert_sql = job_insert_sql[:-2]

    job_insert_sql += ') values ('
    for key, value in args.items():
        if key in ['filters', 'assignee', 'entities','predict_req']:
            continue

        if key == 'filter_desc' or key=='file_name' or key=='file_delimiter':
            job_insert_sql +=  '"' + str(value) + '", '
        else:
            job_insert_sql +=  str(value) + ', '

    job_insert_sql = job_insert_sql[:-2]
    job_insert_sql += ')'

    curs.execute(job_insert_sql)

    job_id = curs.lastrowid

    if 'assignee' in args.keys() and args['assignee'] is not None:
        job_assign_sql = """
        INSERT INTO JOB_ASSIGN_REL(job_id, assignee) values (%s, %s)
        """

        for eachUser in args['assignee']:
            if user_activate_check(eachUser):
                args['user'] = eachUser
                curs.execute(job_assign_sql, (job_id, _get_user_id(args)))

    if 'entities' in args.keys() and args['entities'] is not None:
        job_entity_sql = """
        INSERT INTO JOB_ENTITY_REL(job_id, entity_id) values (%s, %s)
        """
        for eachEntity in args['entities']:
            args['entity'] = eachEntity['type']
            curs.execute(job_entity_sql, (job_id, _get_entity_id(args)))

    conn.commit()
    conn.close()

    return job_id

def update_job(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    project_id = args['project_id']
    job_id = args['job_id']
    job_kind_id = _get_job_kind_id(args)
    domain_id = _get_domain_id(args)

    columns = []
    values = []

    columns.append('assign_cnt')
    values.append(args['assign_cnt'])

    if 'domain' in args.keys():
        domain_id = _get_domain_id(args)
        columns.append('domain_id')
        values.append(domain_id)

    if 'assign_cnt' in args.keys():
        columns.append('assign_cnt')
        values.append(args['assign_cnt'])

    if 'done_cnt' in args.keys():
        columns.append('done_cnt')
        values.append(args['done_cnt'])

    if 'intent' in args.keys():
        intent_id = _get_intent_id(args)
        columns.append('intent_id')
        values.append(intent_id)

    _update_item_using_id('JOB', job_id, columns=columns, values=values)

    #re-create JOB-ASSIGN relation
    _delete_item_using_id('JOB_ASSIGN_REL', job_id, id_column='job_id')

    job_assign_sql = """
    INSERT INTO JOB_ASSIGN_REL(job_id, assignee) values (%s, %s)
    """
    for eachUser in args['assignee']:
        if user_activate_check(eachUser):
            args['user'] = eachUser
            curs.execute(job_assign_sql, (job_id, _get_user_id(args)))

    if 'entities' in args.keys():
        #re-create JOB-ENTITY relation
        _delete_item_using_id('JOB_ENTITY_REL', job_id, id_column='job_id')

        job_entity_sql = """
        INSERT INTO JOB_ENTITY_REL(job_id, entity_id) values (%s, %s)
        """
        for eachEntity in args['entities']:
            args['entity'] = eachEntity['type']
            curs.execute(job_entity_sql, (job_id, _get_entity_id(args)))

    conn.commit()
    conn.close()

def delete_job(args):
    job_id = args['job_id']
    _delete_item_using_id('JOB', job_id)

def get_job_list(args):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    project_id = args['project_id']
    job_kind_id = _get_job_kind_id(args)

    job_assign_sql = """
    SELECT
        USER.email,USER.name
    FROM
        JOB_ASSIGN_REL, USER
    WHERE
        JOB_ASSIGN_REL.job_id = %s AND
        USER.id = JOB_ASSIGN_REL.assignee
    """

    count = 0

    if 'assignee' not in args.keys() or args['assignee']==None:
        job_count_sql = """
        SELECT
            COUNT(id) as count
        FROM
            JOB
        WHERE
            project_id = {} AND
            job_kind_id = {}
        """.format(project_id, job_kind_id)

        curs.execute(job_count_sql)
        rows = curs.fetchall()
        count = rows[0]['count']

        job_get_sql = """
        SELECT
            JOB.id,
            DOMAIN.name as domain,
            INTENT.name as intent,
            JOB.assign_cnt,
            JOB.done_cnt,
            JOB.project_id,
            JOB.filter_desc,
            SUBSTRING_INDEX(JOB.file_name,'/',-1) as file_name
        FROM
            JOB
            LEFT JOIN DOMAIN ON JOB.domain_id = DOMAIN.id
            LEFT JOIN INTENT ON JOB.intent_id = INTENT.id
        WHERE
            JOB.project_id = {} AND
            JOB.job_kind_id = {}
        """.format(project_id, job_kind_id)

        if 'sort' in args.keys() and args['sort'] is not None:
            job_get_sql += " ORDER BY {} {}".format(args['sort'],args['order_type'])

        if 'from' in args.keys() and 'size' in args.keys():
            job_get_sql += " LIMIT {} OFFSET {} ".format(args['size'], args['from'])

        curs.execute(job_get_sql)

    else:
        job_count_sql = """
        SELECT
            COUNT(JOB.id) as count
        FROM
            JOB_ASSIGN_REL
            LEFT JOIN JOB ON JOB_ASSIGN_REL.job_id = JOB.id
        WHERE
            JOB.project_id = {} AND
            job_kind_id = {} AND
            JOB_ASSIGN_REL.assignee = {}
        """.format(project_id, job_kind_id, _get_user_id_by_email(args['assignee']))

        curs.execute(job_count_sql)
        rows = curs.fetchall()
        count = rows[0]['count']

        job_get_sql = """
        SELECT
            JOB.id,
            DOMAIN.name as domain,
            INTENT.name as intent,
            JOB.assign_cnt,
            JOB.done_cnt,
            JOB.project_id,
            JOB.filter_desc,
            JOB_ASSIGN_REL.assignee,
            SUBSTRING_INDEX(JOB.file_name,'/',-1) as file_name
        FROM
            JOB_ASSIGN_REL
            LEFT JOIN JOB ON JOB_ASSIGN_REL.job_id = JOB.id
            LEFT JOIN DOMAIN ON JOB.domain_id = DOMAIN.id
            LEFT JOIN INTENT ON JOB.intent_id = INTENT.id
        WHERE
            JOB.project_id = {} AND
            job_kind_id = {} AND
            JOB_ASSIGN_REL.assignee = {}
        """.format(project_id, job_kind_id, _get_user_id_by_email(args['assignee']))

        if 'sort' in args.keys() and args['sort'] is not None:
            job_get_sql += " ORDER BY {} {}".format(args['sort'], args['order_type'])

        if 'from' in args.keys() and 'size' in args.keys():
            job_get_sql += " LIMIT {} OFFSET {} ".format(args['size'], args['from'])

        curs.execute(job_get_sql)

    job_rows = curs.fetchall()

    job_entity_sql = """
    SELECT
        ENTITY.type, ENTITY.color
    FROM
        JOB_ENTITY_REL, ENTITY
    WHERE
        job_id = %s AND
        ENTITY.id = JOB_ENTITY_REL.entity_id
    """

    for eachJob in job_rows:
        job_id = eachJob['id']

        eachJob['entities'] = []
        curs.execute(job_entity_sql, (job_id))
        entity_rows = curs.fetchall()
        for eachEntity in entity_rows:
            eachJob['entities'].append(eachEntity)

        if 'assignee' in args.keys():
            eachJob['assignee'] = []
            curs.execute(job_assign_sql, (job_id))
            assign_rows = curs.fetchall()
            for eachAssignee in assign_rows:
                eachJob['assignee'].append(eachAssignee)

    conn.close()

    return job_rows, count


def get_auth_user(email,pwd):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    query = """
        SELECT name,email, project_id ,project_name,GROUP_CONCAT(role SEPARATOR ',') as roles 
        FROM 
             (SELECT T1.name,T1.password,T1.email,T2.project_id,T4.name as project_name,T3.name as role
             FROM 
                USER T1 
                    JOIN PROJECT_USER T2 
                        on T1.id = T2.user_id
                    JOIN ROLE T3
                        on T2.role_id = T3.id
                    JOIN  PROJECT T4
                    	on T2.project_id = T4.id
            ) T5
        WHERE email=%s and password=password(%s)
        GROUP BY email,project_id
    """

    curs.execute(query,(email,pwd))

    rows = curs.fetchall()

    conn.close()

    return rows


def get_auth_controller(project_id, email):
    conn = getConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)

    query = """
       select cont_name from AUTH_VIEW
            where auth_role in (
                select role_id from PROJECT_USER 
                    where user_id=
                        (select id from USER where email=%s)
                    and project_id=%s
                ) 

    """

    curs.execute(query, (email, project_id))

    rows = curs.fetchall()

    conn.close()

    return rows





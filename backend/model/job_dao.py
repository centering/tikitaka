from .common_dao import sql_execute, _insert_item, user_activate_check, get_user_id_by_email

def get_job_assign_type_id(job_assign_type):
    sql = ("SELECT id FROM JOB_ASSIGN_TYPE WHERE name = '{}'".format(job_assign_type))

    rows = sql_execute(sql)

    if len(rows) < 1 or 'id' not in rows:
        raise ValueError('check job_assign_type whether it exist')

    return rows[0]['id']

def get_job_status_type_id(job_status_type):
    sql = ("SELECT id FROM JOB_STATUS_TYPE WHERE name = '{}'".format(job_status_type))

    rows = sql_execute(sql)

    if len(rows) < 1 or 'id' not in rows:
        raise ValueError('check job_status_type whether it exist')

    return rows[0]['id']

class JobDao:
    def create_job(project_id, job_assign_type, assigner, assignee, data_repo, task_type):
        project_id = project_id
        job_assign_type_id = get_job_assign_type_id(job_assign_type)
        assigner_id = get_user_id_by_email(assigner)

        column_value_dict = {}
        column_value_dict['project_id'] = project_id
        column_value_dict['assigner'] = assigner_id
        column_value_dict['job_assign_type_id'] = job_assign_type_id
        
        job_id = _insert_item('JOB', column_value_dict)

        #assignee check
        if not isinstance(assignee, list):
            raise ValueError('assignee parameter should be list type')

        

        #data_repo check
        if not isinstance(data_repo, list):
            raise ValueError('data_repo parameter should be list type')

        #task_type check
        if not isinstance(task_type, list):
            raise ValueError('task_type parameter should be list type')

        

        for eachUser in assignee:
            if user_activate_check(eachUser):
                column_value_dict = {'job_id':job_id, 'assignee':get_user_id_by_email(eachUser)}
                _insert_item('JOB_ASSIGNEE_REL', column_value_dict)

        

        return job_id

    def get_job_list(project_id, job_kind, assignee=None):
        pass

    def update_job(project_id, job_id, job_kind=None, assignee=None, domain=None, intent=None, entities=None):
        pass

    def delete_job(job_id):
        pass

 
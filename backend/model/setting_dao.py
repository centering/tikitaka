from model.common_dao import sql_execute, _get_item, _update_item_using_condition

class SettingDao:
    def update_setting(condition):
        for key, value in condition.items():
            where_condtion = {'name': key}
            update_condition = {'value': value}

            _update_item_using_condition('CONFIG', where_condtion, update_condition)

    def get_setting_list():
        condition = {}
        return _get_item('CONFIG', condition)    

        

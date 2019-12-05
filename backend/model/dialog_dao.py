from model.common_dao import sql_execute, _delete_item_using_condition, _insert_item, _get_item, _update_item_using_condition

class DialogDao:
    def delete_dialog_flow():
        condition = {}
        _delete_item_using_condition('DIALOG', condition)

    def create_dialog_flow(dialog_node_list):
        for eachNode in dialog_node_list:
            _insert_item('DIALOG', eachNode)
        
    def get_dialog_flow():
        condition = {}
        return _get_item('DIALOG', condition)    

        

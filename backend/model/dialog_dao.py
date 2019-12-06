from model.common_dao import sql_execute, _delete_item_using_condition, _insert_item, _get_item, _update_item_using_condition

class DialogDao:
    def delete_dialog_flow():
        condition = {}
        _delete_item_using_condition('DIALOG', condition)

    def create_dialog_flow(dialog_flow):
        def createNodeRecursive(nodeList, parentId=0):
            for node in nodeList:
                parentNode = {}
                for key, value in node.items():
                    if node[key] != None:
                        parentNode[key] = value

                if 'children' in node.keys():
                    del parentNode['children']
                    parentNode['parentId'] =parentId
                    parent_id = _insert_item('DIALOG', parentNode)
                    
                    createNodeRecursive(node['children'], parent_id)
                else:
                    parentNode['parentId'] = parentId

                    print (parentNode)

                    _insert_item('DIALOG', parentNode)

        createNodeRecursive(dialog_flow)
        
    def get_dialog_flow():
        def getNodeRecursive(parentId=0):
            condition = {'parentId':parentId}
            nodeList = _get_item('DIALOG', condition)    

            for node in nodeList:
                node['children'] = []
                node['expanded'] = True
                node['children'] += getNodeRecursive(node['id'])

                if len(node['children']) == 0:
                    del node['children']

            return nodeList

        result = getNodeRecursive()

        print (result)

        return result
        

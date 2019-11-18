from flask_restplus import Resource,fields
from flask import request
from flask_jwt_extended import jwt_required

from views.api import api, task_ns

from model import TaskDao

task_create_proto = task_ns.model("task_create_proto", {
    "name": fields.String("task name"),
    "desc": fields.String("proejct description")
})

task_update_proto = task_ns.model("task_update_proto", {
    "id": fields.Integer("task id"),
    "name": fields.String("task name"),
    "desc": fields.String("task description")
})

task_get_parser = api.parser()
task_get_parser.add_argument('id', location='args')
task_get_parser.add_argument('name', location='args')

task_delete_parser = api.parser()
task_delete_parser.add_argument('id', location='args')

@task_ns.route('/')
@api.doc(responses={404: 'error'})
class TaskService(Resource):
    @api.expect(task_create_proto)
    def post(self):         #C
        args = request.json
        TaskDao.create_task(args['name'], args['desc'])

        return {'msg': 'ok'}

    @api.expect(task_get_parser)
    def get(self):          #R
        args = task_get_parser.parse_args()
        result = TaskDao.get_task_list(args['id'])

        return {'code':'ok', 'data': result}

    @api.expect(task_update_proto)   
    def put(self):          #U
        args = request.json
        TaskDao.modify_task(args['id'], args['name'], args['desc'])

        return {'code':'ok', 'message':'successed task update'}

    @api.expect(task_delete_parser)
    def delete(self):       #D
        args = task_delete_parser.parse_args()
        TaskDao.delete_task(args['id'])

        return {'code':'ok', 'message':'successed task delete'}

from flask_restplus import Resource,fields
from views.api import api, file_ns

import os
from werkzeug.datastructures import FileStorage

upload_parser = api.parser()
upload_parser.add_argument('file', location='files',
                           type=FileStorage, required=True)
import time
from flask_jwt_extended import jwt_required
UPLOAD_FOLDER = '../frontend/public/uploads'

@file_ns.route('/')
@api.doc(responses={404: 'error'})
class FileService(Resource):
    @jwt_required
    @api.expect(upload_parser)
    def post(self):
        args = upload_parser.parse_args()
        uploaded_file = args['file']

        filename =  os.path.join(UPLOAD_FOLDER,uploaded_file.filename+'.'+str(time.time()))
        uploaded_file.save(filename)

        return {'code': 'ok','data':filename}

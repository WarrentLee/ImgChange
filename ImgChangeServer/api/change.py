from random import randint

import cv2
from flask import send_file
from flask_login import login_required, current_user
from flask_restplus import Namespace, Resource, reqparse
from werkzeug.datastructures import FileStorage
from werkzeug.security import generate_password_hash

from ImgChangeServer.api.utils import pil_image_save, image_save
from ImgChangeServer.config import Config
from ImgChangeServer.database.model import ImageModel
import os, io
from PIL import Image
from ImgChangeServer.workbench.deal import deal

api = Namespace('change', description='Style Change related operations')

image_change = reqparse.RequestParser()
image_change.add_argument('image', location='files',
                          type=FileStorage, required=True,
                          help='PNG or JPG file')
image_change.add_argument('asAttachment', type=bool, default=False)


@api.route('/')
class Change(Resource):

    @api.expect(image_change)
    def post(self):
        """ Style change (auto store if logined) """
        args = image_change.parse_args()
        as_attachment = args['asAttachment']
        image = args['image']
        model_dir = os.path.abspath(os.path.dirname(os.getcwd())) + "/workbench/checkpoint/model"
        pil_image = Image.open(image)
        cv_image = deal(model_dir, pil_image)
        # cv2.imshow("OpenCV", cv_image)
        if cv_image is not None:
            changed_img = Image.fromarray(cv_image)
            # changed_img.show()
            store = False
            # save image if logined
            if current_user.is_authenticated:
                directory = os.path.join(Config.DATASET_DIRECTORY, current_user.username + '/generated')
                filename = generate_password_hash(str(randint(0, 9999)), method='sha256')[7:] + image.filename
                path = os.path.join(directory, filename)
                if not os.path.exists(path):
                    if not os.path.exists(directory):
                        os.makedirs(directory)
                    print(type(image))
                    pil_image_save(pil_image, path, image.filename)
                    store = True
            image_io = io.BytesIO()
            changed_img.save(image_io, "JPEG", quality=90)
            image_io.seek(0)
            return send_file(image_io, attachment_filename="changed_image", as_attachment=as_attachment)
        return {'success': False, 'message': 'Have not generated an image'}


if __name__ == "__main__":
    model_dir = os.path.abspath(os.path.dirname(os.getcwd())) + "/workbench/checkpoint"
    os.chdir(model_dir)

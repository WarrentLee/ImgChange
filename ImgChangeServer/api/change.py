import io
import os
from random import randint

import PIL
from PIL import Image
from flask import send_file
from flask_login import current_user
from flask_restplus import Namespace, Resource, reqparse
from scipy.misc import toimage
from werkzeug.datastructures import FileStorage
from werkzeug.security import generate_password_hash

from ..api.utils import pil_image_save
from ..config import Config
from ..workbench.AnimeGAN.deal import deal
from ..workbench.WarpGAN.process import process

api = Namespace('change', description='Style Change related operations')

image_change = reqparse.RequestParser()
image_change.add_argument('image', location='files',
                          type=FileStorage, required=True,
                          help='PNG or JPG file')
image_change.add_argument('asAttachment', type=bool, default=False)

face_change = reqparse.RequestParser()
face_change.add_argument('image', location='files',
                         type=FileStorage, required=True,
                         help='PNG or JPG file')
face_change.add_argument('scale', type=float, default=1.0,
                         help='Warping extent')
face_change.add_argument('asAttachment', type=bool, default=False)


@api.route('/style')
class AnimeGAN(Resource):

    @api.expect(image_change)
    def post(self):
        """ Style change (auto store if logined) """
        args = image_change.parse_args()
        as_attachment = args['asAttachment']
        image = args['image']
        model_dir = Config.AnimeGAN_MODEL_DIRECTORY
        try:
            pil_image = Image.open(image)
        except PIL.UnidentifiedImageError:
            return {"success": False,
                    "message": "Illegal file format"}, 400
        cv_image = deal(model_dir, pil_image)
        # cv2.imshow("OpenCV", cv_image)
        if cv_image is not None:
            changed_img = Image.fromarray(cv_image)
            # changed_img.show()
            store = False
            # save image if logined
            if current_user.is_authenticated:
                directory = os.path.join(Config.DATASET_DIRECTORY, current_user.username + '/style')
                filename = generate_password_hash(str(randint(0, 9999)), method='sha256')[7:] + image.filename
                path = os.path.join(directory, filename)
                if not os.path.exists(path):
                    if not os.path.exists(directory):
                        os.makedirs(directory)
                    pil_image_save(changed_img, path, image.filename, "style")
                    store = True
            image_io = io.BytesIO()
            changed_img.save(image_io, "JPEG", quality=90)
            image_io.seek(0)
            return send_file(image_io, attachment_filename="changed_style_" + image.filename.split('.', 1)[0]+".jpg", as_attachment=as_attachment)
        return {'success': False, 'message': 'Have not generated an image'}, 400

@api.route('/face')
class FaceGAN(Resource):
    @api.expect(face_change)
    def post(self):
        """ Face detect and change (auto store if logined) """
        args = face_change.parse_args()
        as_attachment = args['asAttachment']
        image_file = args['image']
        scale = args['scale']
        model_dir = Config.WarpGAN_MODEL_DIRECTORY
        try:
            face_img = process(model_dir, image_file, scale=scale)
        except PIL.UnidentifiedImageError:
            print("Can not read image")
            return {"success": False,
                    "message": "Illegal file format"}, 400
        if face_img is None:
            return {'success': False,
                    'message': "Could not detect a face"}, 202

        image_io = io.BytesIO()

        store = False
        # save image if logined
        if current_user.is_authenticated:
            directory = os.path.join(Config.DATASET_DIRECTORY, current_user.username + '/face')
            filename = generate_password_hash(str(randint(0, 9999)), method='sha256')[7:] + image_file.filename
            path = os.path.join(directory, filename)
            if not os.path.exists(path):
                if not os.path.exists(directory):
                    os.makedirs(directory)
                pil_image_save(face_img, path, image_file.filename, "face")
                store = True

        # face_img.show()
        face_img.save(image_io, "JPEG", quality=90)
        face_img.close()
        image_io.seek(0)
        return send_file(image_io, attachment_filename="changed_face_" + image_file.filename.split('.', 1)[0]+".jpg", as_attachment=as_attachment)


if __name__ == "__main__":
    model_dir = os.path.abspath(os.path.dirname(os.getcwd())) + "/workbench/AnimeGAN/checkpoint"
    os.chdir(model_dir)

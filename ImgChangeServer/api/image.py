import PIL
from flask import send_file
from flask_login import login_required, current_user
from flask_restplus import Namespace, Resource, reqparse
from werkzeug.datastructures import FileStorage
from werkzeug.security import generate_password_hash
from random import randint
from ImgChangeServer.config import Config
from ImgChangeServer.database.model import ImageModel
from ImgChangeServer.api.utils import image_save
import os, io
from PIL import Image

api = Namespace('image', description='Image related operations')

image_all = reqparse.RequestParser()
image_all.add_argument('page', default=1, type=int, help='Page number')
image_all.add_argument('per_page', default=50, type=int, required=False, help='Images per page')
image_all.add_argument('category', choices=["origin", "style", "face"], required=False)

image_upload = reqparse.RequestParser()
image_upload.add_argument('image', location='files',
                          type=FileStorage, required=True,
                          help='PNG or JPG file')
# image_upload.add_argument('folder', required=False, default='',
#                           help='Folder to insert photo into')

image_download = reqparse.RequestParser()
image_download.add_argument('asAttachment', type=bool, default=False)
# image_download.add_argument('thumbnail', type=bool, default=False)
image_download.add_argument('width', type=int)
image_download.add_argument('height', type=int)


@api.route('/')
class Images(Resource):

    @api.expect(image_all)
    @login_required
    def get(self):
        """ Returns all images """
        args = image_all.parse_args()
        per_page = args['per_page']
        page = args['page'] - 1
        category = args['category']
        if category:
            if "origin" == category:
                images = [image for image in current_user.images if image.category == "origin"]
                # images = list(filter(lambda image: image.category == "origin", current_user.images))
            elif "style" == category:
                images = [image for image in current_user.images if image.category == "style"]
                # images = list(filter(lambda image: image.category == "style", current_user.images))
            elif "face" == category:
                images = [image for image in current_user.images if image.category == "face"]
                # images = list(filter(lambda image: image.category == "face", current_user.images))
            else:
                return {"success": False, "message": "Illegal category"}, 400
        else:
            images = current_user.images
        total = len(images)
        pages = int(total / per_page) + 1
        if (page + 1) * per_page < total:
            images = images[page * per_page:(page + 1) * per_page]
        else:
            images = images[page * per_page:]
        img_ids = []
        for i in images:
            img_ids.append(i.id)
        return {
            "user_id": current_user.id,
            "total": total,
            "pages": pages,
            "page": page+1,
            "per_page": per_page,
            "images": img_ids
        }

    @api.expect(image_upload)
    @login_required
    def post(self):
        """ Creates an image """
        args = image_upload.parse_args()
        image = args['image']

        # folder = args['folder']
        # if len(folder) > 0:
        #     folder = folder[0].strip('/') + folder[1:]
        # directory = os.path.join(Config.DATASET_DIRECTORY, current_user.username + folder)
        directory = os.path.join(Config.DATASET_DIRECTORY, current_user.username + '/origin')
        filename = generate_password_hash(str(randint(0, 9999)), method='sha256')[7:] + image.filename
        path = os.path.join(directory, filename)

        if os.path.exists(path):
            filename = generate_password_hash(str(randint(0, 9999))+filename, method='sha256')[7:] + image.filename
            path = os.path.join(directory, filename)
            if os.path.exists(path):
                filename = generate_password_hash(str(randint(0, 9999))+filename, method='sha256')[7:] + image.filename
                path = os.path.join(directory, filename)
                if os.path.exists(path):
                    return {'message': 'filename already exists'}, 400

        if not os.path.exists(directory):
            os.makedirs(directory)
        print(path)
        print(type(image))
        try:
            image_model = image_save(args['image'], path, "origin")
        except PIL.UnidentifiedImageError:
            return {"success": False,
                    "message": "Illegal file format"}
        return {'success': True,
                "user_id": current_user.id,
                "file_name": filename,
                "width": image_model.width,
                "height": image_model.height
                }


@api.route('/<int:image_id>')
class ImageId(Resource):

    @api.expect(image_download)
    @login_required
    def get(self, image_id):
        """ Returns an image by ID """
        args = image_download.parse_args()
        as_attachment = args.get('asAttachment')
        image = ImageModel()
        for img in current_user.images:
            if img.id == image_id:
                image = img
                break

        if image.img_uri is None:
            return {'success': False, "message": "Invalid image id"}, 400

        width = args.get('width')
        height = args.get('height')

        if not width:
            width = image.width
        if not height:
            height = image.height
        if not os.path.exists(image.img_uri):
            return {'success': False, "message": "Invalid image uri"}, 400
        pil_image = Image.open(image.img_uri)
        pil_image.thumbnail((width, height), Image.ANTIALIAS)
        image_io = io.BytesIO()
        pil_image = pil_image.convert("RGB")
        pil_image.save(image_io, "JPEG", quality=90)
        image_io.seek(0)
        return send_file(image_io, attachment_filename=image.file_name, as_attachment=as_attachment)

    @login_required
    def delete(self, image_id):
        """ Deletes an image by ID """
        image = ImageModel()
        flag = 0
        for img in current_user.images:
            if img.id == image_id:
                image = img
                flag = 1
                break
        if flag == 0:
            return {"message": "Invalid image id"}, 400

        # if not current_user.can_delete(image):
        #     return {"message": "You do not have permission to download the image"}, 403
        image.remove()
        path = image.img_uri  # 文件路径
        if os.path.exists(path):  # 如果文件存在
            # 删除文件，可使用以下两种方法。
            os.remove(path)
            # os.unlink(path)
            return {"success": True}
        else:
            return{'no such image:(%s)%s' % (current_user.username, image_id)}, 400  # 则返回文件不存在



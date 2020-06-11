import io

from PIL import Image
from flask import Flask
from flask_login import current_user

from ImgChangeServer.database.model import db, ImageModel
import os, json
from ImgChangeServer.config import Config


def create_app(name):
    app = Flask(name, template_folder='../templates')
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(app.root_path, 'data.db'))
    print("Database Directory:", os.getenv('DATABASE_URL'))
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///' + Config.DATABASE_DIRECTORY)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = "asfnsdjnsdlflasdkc553d3s1"
    db.app = app
    db.init_app(app)
    return app


def image_save(image, path, category):
    pil_image = Image.open(io.BytesIO(image.read()))
    image_model = ImageModel(
        user_id=current_user.id,
        file_name=image.filename,
        width=pil_image.size[0],
        height=pil_image.size[1],
        img_uri=path,
        category=category
    )

    image_model.save()
    pil_image.save(path)

    image.close()
    pil_image.close()
    return image_model


def pil_image_save(pil_image, path, filename, category):
    image_model = ImageModel(
        user_id=current_user.id,
        file_name=filename,
        width=pil_image.size[0],
        height=pil_image.size[1],
        img_uri=path,
        category=category
    )
    image_model.save()
    pil_image.save(path)
    return image_model



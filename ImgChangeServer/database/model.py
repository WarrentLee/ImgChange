from PIL import Image
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import os
from ImgChangeServer.config import Config

db = SQLAlchemy()


class ImageModel(db.Model):
    __tablename__ = "image"
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String)
    img_uri = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    category = db.Column(db.Enum("origin", "style", "face"), nullable=False)

    def __init__(self, img_uri=None, user_id=None, height=None, width=None, file_name=None, category=None):
        self.img_uri = img_uri
        self.user_id = user_id
        self.width = width
        self.height = height
        self.file_name = file_name
        self.category = category

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<Image %r>' % self.id

    def remove(self):
        db.session.delete(self)
        db.session.commit()





class UserModel(db.Model, UserMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    images = db.relationship("ImageModel", backref="user")

    def __init__(self, username=None, password=None):
        self.username = username
        self.password = password

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = password
        db.session.add(self)
        db.session.commit()


if __name__ == "__main__":
    app = Flask(__name__, template_folder='../templates')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + Config.DATABASE_DIRECTORY
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
    db.create_all()
    # db.drop_all()
# print(__file__)
# print(os.path.dirname(__file__))
# print(os.path.abspath(__file__))
# print(os.path.abspath(os.path.dirname(__file__)))

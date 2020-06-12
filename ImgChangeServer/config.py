import os


class Config:
    DATASET_DIRECTORY = os.path.dirname(os.getcwd())+"/dataset"
    DATABASE_DIRECTORY = os.path.dirname(os.getcwd())+"/database/data.db"
    AnimeGAN_MODEL_DIRECTORY = os.path.abspath(os.path.dirname(os.getcwd())) + "/workbench/AnimeGAN/checkpoint/model"
    WarpGAN_MODEL_DIRECTORY = os.path.abspath(os.path.dirname(os.getcwd())) + "/workbench/WarpGAN/pretrained/warpgan_pretrained"
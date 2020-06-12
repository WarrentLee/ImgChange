import os


class Config:
    SERVER_DIRECTORY = os.path.dirname(os.getcwd())
    DATASET_DIRECTORY = SERVER_DIRECTORY+"/dataset"
    DATABASE_DIRECTORY = SERVER_DIRECTORY+"/database/data.db"
    AnimeGAN_MODEL_DIRECTORY = os.path.abspath(SERVER_DIRECTORY) + "/workbench/AnimeGAN/checkpoint/model"
    WarpGAN_MODEL_DIRECTORY = os.path.abspath(SERVER_DIRECTORY) + "/workbench/WarpGAN/pretrained/warpgan_pretrained"
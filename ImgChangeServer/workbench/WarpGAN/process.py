import os
import argparse
import numpy as np
from scipy import misc
import scipy.io as sio
import imageio
from ImgChangeServer.workbench.WarpGAN.warpgan import WarpGAN
from ImgChangeServer.workbench.WarpGAN.align.detect_align import detect_align


def process(model_dir, img_file, scale=1.0):
    num_styles = 1
    network = WarpGAN()
    network.load_model(model_dir)
    try:
       img = misc.imread(img_file, mode='RGB')
    # img = imageio.imread(args.input, format='RGB')
    except:
        print("Can't read image!")
        return None

    img = detect_align(img)
    if img is None:
        print("Can't detect a face!")
        return None
    img = (img - 127.5) / 128.0

    images = np.tile(img[None], [num_styles, 1, 1, 1])
    styles = np.random.normal(0., 1., (num_styles, network.input_style.shape[1].value))
    scales = scale * np.ones(num_styles)
    output = network.generate_BA(images, scales, 16, styles=styles)
    output = 0.5*output + 0.5
    # return output
    print(output.shape)
    result = misc.toimage(output[0], channel_axis=2)
    return result


if __name__ == '__main__':
    process('pretrained/warpgan_pretrained','data/example/9.jpg')


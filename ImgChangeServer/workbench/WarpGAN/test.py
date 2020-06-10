import os
import argparse
import numpy as np
from scipy import misc
import scipy.io as sio
import imageio
from .warpgan import WarpGAN

# Parse aguements
parser = argparse.ArgumentParser()
parser.add_argument("model_dir", help="The path to the pretrained model",
                        type=str)
parser.add_argument("input", help="The path to the aligned image",
                        type=str)
parser.add_argument("output", help="The prefix path to the output file, subfix will be added for different styles.",
                        type=str, default=None)
parser.add_argument("--num_styles", help="The number of images to generate with different styles",
                        type=int, default=1)
parser.add_argument("--scale", help="The path to the input directory",
                        type=float, default=1.0)
parser.add_argument("--aligned", help="Set true if the input face is already normalized",
                        action='store_true')
args = parser.parse_args()


if __name__ == '__main__':

    network = WarpGAN()
    network.load_model(args.model_dir)

    img = misc.imread(args.input, mode='RGB')
    # img = imageio.imread(args.input, format='RGB')

    if not args.aligned:
        from align.detect_align import detect_align
        img = detect_align(img)

    img = (img - 127.5) / 128.0

    images = np.tile(img[None], [args.num_styles, 1, 1, 1])
    scales = args.scale * np.ones((args.num_styles))
    styles = np.random.normal(0., 1., (args.num_styles, network.input_style.shape[1].value))

    output = network.generate_BA(images, scales, 16, styles=styles)
    output = 0.5*output + 0.5

    for i in range(args.num_styles):
        misc.imsave(args.output + '_{}.jpg'.format(i), output[i])
        output_1000 = misc.imresize(output[i], (1000, 1000))
        misc.imsave(args.output + '_{}.jpg'.format(i+1), output_1000)

    # for i in range(args.num_styles):
    #     output[i] = misc.imresize(output[i], (300, 300))
    #     misc.imsave(args.output + '_{}.jpg'.format(i), output[i])


# import numpy as np
# from PIL import Image
# from ISR.models import RDN
# from scipy import misc
# import matplotlib.pyplot as plt

# img = Image.open('result/11_0.jpg')
# # plt.imshow(img)
# # plt.show()
# lr_img = np.array(img)

# # rdn = RDN(weights='psnr-small')
# rdn = RDN(arch_params={'C':6, 'D':20, 'G':64, 'G0':64, 'x':2})
# sr_img = rdn.predict(lr_img)
# Image.fromarray(sr_img)

# misc.imsave('result/RDN.jpg', sr_img)
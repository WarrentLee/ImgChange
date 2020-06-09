from ImgChangeServer.workbench.utils import *
import os
import time
import numpy as np
from ImgChangeServer.workbench.net import generator

os.environ["CUDA_VISIBLE_DEVICES"] = "0"

def stats_graph(graph):
    flops = tf.profiler.profile(graph, options=tf.profiler.ProfileOptionBuilder.float_operation())
    # params = tf.profiler.profile(graph, options=tf.profiler.ProfileOptionBuilder.trainable_variables_parameter())
    print('FLOPs: {}'.format(flops.total_float_ops))


def deal(checkpoint_dir, img_file, img_size=None):
    # tf.reset_default_graph()
    if img_size is None:
        img_size = [256, 256]

    img_real = tf.placeholder(tf.float32, [1, None, None, 3], name='test')

    with tf.variable_scope("generator", reuse=False):
        img_generated = generator.G_net(img_real).fake
    saver = tf.train.Saver()

    gpu_options = tf.GPUOptions(allow_growth=True)
    with tf.Session(config=tf.ConfigProto(allow_soft_placement=True, gpu_options=gpu_options)) as sess:
        # tf.global_variables_initializer().run()
        # load model
        ckpt = tf.train.get_checkpoint_state(checkpoint_dir)  # checkpoint file information
        if ckpt and ckpt.model_checkpoint_path:
            ckpt_name = os.path.basename(ckpt.model_checkpoint_path)  # first line
            saver.restore(sess, os.path.join(checkpoint_dir, ckpt_name))
            print(" [*] Success to read {}".format(ckpt_name))
        else:
            print("Failed to find a checkpoint")
            return

        # FLOPs
        stats_graph(tf.get_default_graph())

        begin = time.time()
        # sample_image = np.asarray(load_test_data(img_file, img_size))
        sample_image = load_recv_img(img_file, img_size)
        fake_img = sess.run(img_generated, feed_dict={img_real: sample_image})
        fake_img = inverse_transform(fake_img.squeeze()).astype(np.uint8)
        fake_img = cv2.cvtColor(fake_img, cv2.COLOR_BGR2RGB)
        # cv2.imshow("OpenCV", fake_img)
        # cv2.waitKey()
        end = time.time()
        print(f'deal-time: {end - begin} s')
        return fake_img


if __name__ == '__main__':
    deal('checkpoint/model', "result/real/1.jpg")

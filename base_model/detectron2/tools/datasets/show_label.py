import json
import matplotlib.pyplot as plt
import skimage.io as io
from labelme import utils

def main():
    json_path = './coco/mask_eval/080005.json'
    data = json.load(open(json_path))
    img = io.imread('%s/%s'%('./coco/mask_eval',data['imagePath']))
    lab, lab_names = utils.labelme_shapes_to_label(img.shape, data['shapes']) 
    captions = ['%d: %s' % (l, name) for l, name in enumerate(lab_names)]
    lab_ok = utils.draw_label(lab, img, captions)

    # img_label = io.imread('%s/%s'%('/Users/yangyi/Downloads',data['imagePath'].split('.')[0]+'-pred.jpeg'))

    plt.subplot(121)
    plt.title("Image")
    plt.xticks([])
    plt.yticks([])
    plt.imshow(img)

    plt.subplot(122)
    plt.title("Ground Truth")
    plt.xticks([])
    plt.yticks([])
    plt.imshow(lab_ok)
    plt.show()
  
    # plt.subplot(133)
    # plt.title("Prediction")
    # plt.xticks([])
    # plt.yticks([])
    # plt.imshow(img_label)
    # plt.show()


if __name__ == '__main__':
    main()
# E6893-final-project
Final Project of ELEN6893@Columbia University: Automatic Image Labelling System
- author: [Yi Yang](https://github.com/yaannnik), [Jiashu Chen](https://github.com/Jiashu0326), [Jing Peng](https://github.com/paterlisia)

## Installation

### Requirements

- Linux or macOS with Python ≥ 3.6
- [PyTorch](https://pytorch.org/) ≥ 1.8 and [torchvision](https://github.com/pytorch/vision/) that matches the PyTorch installation
- OpenCV is strongly recommended



### Build Detectron2

Our deep learning engine is based on [Detectron2](https://github.com/facebookresearch/detectron2). Run `install.sh` to install Detectron2.



## Getting Started

### Train your model

If it is the first time you use our automatic labelling system, you will need to train a basic model to make it work for you. Make sure your dataset is in COCO format. You can use `auto-annotation-server/detectron2/tools/datasets/labelme_to_coco.py` to transform your labelme dataset into a COCO dataset.

Run `train.sh` to start training process. Feel free to change the network according to your requirements.
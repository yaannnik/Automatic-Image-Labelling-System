# E6893-final-project
Final Project of ELEN6893@Columbia University: Automatic Image Labelling System
- author: [Yi Yang](https://github.com/yaannnik), [Jiashu Chen](https://github.com/Jiashu0326), [Jing Peng](https://github.com/paterlisia)

## Installation

### Requirements

- **Linux or macOS with Python ≥ 3.6**
- **[PyTorch](https://pytorch.org/) ≥ 1.8 and [torchvision](https://github.com/pytorch/vision/) that matches the PyTorch installation**
- **OpenCV is strongly recommended**
- **a [node](https://nodejs.org/en/) version >= 7 and an [npm](https://www.npmjs.com/) version >= 4.**
- **If you have installation or compilation issues with this project, please see [electron's official debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

Install dependencies with yarn.

```bash
$ cd your-project-name
$ npm install
```



### Build Detectron2

Our deep learning engine is based on [Detectron2](https://github.com/facebookresearch/detectron2). Run `install.sh` to install Detectron2. Set environmental variable `$DETECTRON2_DATASETS` to be path to your dataset.



## Getting Started

### Start front-end and back-end of our app

Use `start-frontend.sh` and `start-backend.sh` to start the front-end and back-end of our app.



### Sign up/Login

To use your unique model and settings, sign up/login with your account first.

<img src="/Users/yangyi/Columbia/学习资料/E6893-Big Data Analysis/E6893-final-project/figures/login.png" alt="Login" style="zoom:40%;" />



### Train your model

If it is the first time you use our automatic labelling system, you will need to train a basic model to make it work for you. Make sure your dataset is in COCO format. You can use `auto-annotation-server/detectron2/tools/datasets/labelme_to_coco.py` to transform your labelme dataset into a COCO dataset.

Run `train.sh` to start training process. Feel free to change the network according to your requirements.


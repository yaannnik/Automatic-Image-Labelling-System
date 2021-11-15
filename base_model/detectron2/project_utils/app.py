from flask import Flask
from flask import Flask, jsonify
from flask import abort
from flask import request
import json
import sys

from utils import run, PredictionCase
from detectron2.data.datasets.builtin_meta import COCO_CATEGORIES

app = Flask(__name__)
app_config = {"host": "127.0.0.1", "port": "5000"}
dataset_path = sys.path[0] + "/../tools/dataset/coco/mask_train/"

imgs = []
model = sys.path[0] + "/../models/model_final34.pth"
config_file = sys.path[0] + "/../configs/COCO-Detection/faster_rcnn_R_34_FPN_3x.yaml"

def getpoints(points):
    p0 = points[0]
    p3 = points[1]
    p1 = [points[0][0], points[1][1]]
    p2 = [points[1][0], points[0][1]]
    return [p0, p1, p2, p3]

def getpath(url):
    photo = url.split("/")[12]
    photo = photo.split(".")[0]
    photo_json = dataset_path + photo + '.json'
    return photo_json

@app.route('/post', methods=['POST'])  #前端返回标注结果
def postData():
    annos = []
    data = request.get_json()
    imgs.append(data["url"])

    cases = run(imgs, model, config_file)

    case_dict = {"url": data["url"], "annotation": []}

    for case in cases[0]:
        anno = {}
        anno["category"] = COCO_CATEGORIES[case.category]["name"]
        anno["bbox"] = case.bbox
        anno["confidence"] = case.confidence

        case_dict["annotation"].append(anno)

    return jsonify(case_dict)

@app.route('/get', methods=['GET'])  #前端获取训练数据
def getData():
    # postForm = request.get_json()  # 前端传来数据
    # url = postForm["url"]
    # photo_json = getpath(url)
    # with open(photo_json, 'r', encoding='UTF-8') as f:
    #     load_dict = json.load(f)
    # retdata = {}
    # annotation = []
    # anno = {}
    # shapes = load_dict["shapes"][0]
    # points = shapes["points"]
    # anno["bbox"] = getpoints(points)
    # anno["category"] = shapes["label"]
    # anno["confidence"] = 0
    # annotation.append(anno)
    # retdata["url"] = url
    # retdata["annotation"] = annotation

    # return jsonify(retdata)
    res = {}
    res["result"] = "successfully"
    return jsonify(res)

@app.route('/train', methods=['GET'])
def train():
    """train()

    return jsonify(train done)"""
    pass

@app.route('/add', methods=['GET'])
def addPicture():
    """add(picture)

    return jsonify(load_dict)"""
    pass


if __name__ == '__main__':
    app.run(**app_config)
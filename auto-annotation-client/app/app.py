from flask import Flask
from flask import Flask, jsonify
from flask import abort
from flask import request
import json

app = Flask(__name__)
dataset_path = "C:/Users/22470/PycharmProjects/backend/annotations/"

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
    updated_data = json.loads(data["data"])  # image options updated by client
    url = updated_data["url"]
    print(url)
    # photo = url.split("/")[12]
    # photo = photo.split(".")[0]
    # photo_json = dataset_path + photo + '.json'
    # with open(photo_json, 'r', encoding='UTF-8') as f:
    #     load_dict = json.load(f)
    # annotation = data["annotation"]
    # anno = annotation[0]
    # label = anno["category"]
    # bbox = anno["bbox"]
    # point = [bbox[0], bbox[3]]
    # load_dict["shapes"][0]["points"] = point
    # with open(photo_json, 'w') as f:
    #     json.dump(load_dict, f)
    # print(load_dict)
    return jsonify(1)

@app.route('/get', methods=['GET'])  #前端获取训练数据
def getData():
    # postForm = request.get_json()  # 前端传来数据
    url = request.args.get("url")  # image url uploaded by
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

    return jsonify(url)

@app.route('/train', methods=['GET'])
def train():
    """train()

    return jsonify(train done)"""

@app.route('/add', methods=['GET'])
def addPicture():
    """add(picture)

    return jsonify(load_dict)"""
if __name__ == '__main__':
    app.run()

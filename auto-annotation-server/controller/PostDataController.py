import os

from flask import Flask, Blueprint
from controller.AccountAPI import account_api
from flask import request, session
from flask import Flask, jsonify
from flask import request
from dao import db
from entity.User import User
import json

from dao import app

postData_api = Blueprint('postData_api', __name__)
app.register_blueprint(postData_api)

def getpath(url):
    name = session['user']
    user = User.query.filter_by(name=name).first()
    dataset_path = user.json_path
    photo = url.split("/")[-1]
    photo = photo.split(".")[0]
    photo_json = '../' + dataset_path + '/' + photo + '.json'
    # os.mkdir(dataset_path)
    return photo_json

@app.route('/post', methods=['POST'])  #前端返回标注结果
def postData():
    annos = []
    data = request.get_json()
    #updated_data = json.loads(data["data"])  # image options updated by client
    url = data["url"]
    print(url)

    photo_json = getpath(url)
    print(photo_json)
    # with open(photo_json, 'r', encoding='UTF-8') as f:
    #     load_dict = json.load(f)
    retdata = {}
    annotation = []
    anno = {}
    # shapes = load_dict["shapes"][0]
    # points = shapes["points"]
    # anno["bbox"] = getpoints(points)
    # anno["category"] = shapes["label"]
    # anno["confidence"] = 0
    # annotation.append(anno)
    retdata["url"] = url
    # retdata["annotation"] = annotation

    with open(photo_json, 'w', encoding='UTF-8') as f:
        json.dump(retdata, f)

    return jsonify(retdata)
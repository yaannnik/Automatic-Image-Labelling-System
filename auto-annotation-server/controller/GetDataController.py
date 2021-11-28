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


getData_api = Blueprint('getData_api', __name__)
app.register_blueprint(getData_api)


@app.route('/get', methods=['GET'])  #前端获取训练数据
def getData():
    name = session['user']
    user = User.query.filter_by(name=name).first()
    url = request.args.get("url")  # image url uploaded by
    print("HERE!!!")
    print(url)
    annos = []
    data = request.get_json()
    imgs = []
    imgs.append(url)

    cases = run(imgs, model, config_file)

    case_dict = {"url": url, "annotation": []}

    for case in cases[0]:
        anno = {}
        anno["category"] = COCO_CATEGORIES[case.category]["name"]
        anno["bbox"] = case.bbox
        anno["confidence"] = case.confidence
        case_dict["url"] = case.url
        case_dict["annotation"].append(anno)
    print(case_dict)
    return jsonify(case_dict)

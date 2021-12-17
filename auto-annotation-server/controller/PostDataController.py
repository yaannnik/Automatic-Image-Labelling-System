import os
import sys

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
    photo_json = sys.path[0] + '/../' + dataset_path + '/' + photo + '.json'
    # os.mkdir(dataset_path)
    return photo_json

@app.route('/post', methods=['POST'])  # annotation
def postData():
    data = request.get_json()
    updated_data = json.loads(data["data"])  # image options updated by client
    print(updated_data)
    url = updated_data["url"]
    annotations = updated_data["annotation"]
    print("url: ", url)
    print("annotations:", annotations)

    photo_json = getpath(url)

    retdata = {"version": "4.5.9",
               "flags": {},
               "shapes": [],
               "imagePath": url.split("/")[-1],
               "imageData": "Encoded",
               "imageHeight": updated_data["height"],
               "imageWidth": updated_data["width"],
               "lineColor": [0, 255, 0, 128],
               "fillColor": [255, 0, 0, 128]}

    for anno in annotations:
        shape = {
            "line_color": None,
            "fill_color": None,
            "label": anno["category"],
            "points": [[ int(anno["bbox"][0]), int(anno["bbox"][1]) ], \
                [ int(anno["bbox"][2]), int(anno["bbox"][3]) ]],
            "group_id": None,
            "shape_type": "rectangle",
            "flags": {}
            }
        retdata["shapes"].append(shape)

    with open(photo_json, 'w', encoding='UTF-8') as fp:
        json.dump(retdata, fp, indent=2)

    return jsonify(retdata)
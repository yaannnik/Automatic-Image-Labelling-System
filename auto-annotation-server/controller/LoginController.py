import os
import sys
sys.path.append("..")

from flask import Flask
from werkzeug.utils import redirect

from controller.SignUpController import signup_api
from controller.PostDataController import postData_api
from controller.GetDataController import getData_api
from flask import request, session
from entity import User
from dao import db
import pymysql
from entity.User import User
from entity.Log import Log
from service.uplogService import uplogService
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Response

from dao import app

app.register_blueprint(signup_api)
app.register_blueprint(postData_api)
app.register_blueprint(getData_api)

# before_request
@app.before_request
def before():
    print("app.before")

# after_request
@app.after_request
def after(response):
    api_name = request.url
    data = request.get_json()
    if str(response.status_code).startswith('4') or str(response.status_code).startswith('5'):
        log = Log(info='failed', type=api_name, action=str(data))
    else:
        log = Log(info='success', type=api_name, action=str(data))
        print(response.status_code)
        uplogsservice = uplogService(log)
        uplogsservice.uplog()
    return response

# 500 exception
@app.errorhandler(500)
def error_handler(err):
    api_name = request.url
    data = request.get_json()
    log = Log(info='failed', type=api_name, action=str(data))
    uplogsservice = uplogService(log)
    uplogsservice.uplog()
    return redirect(request.url, 403)

@app.route("/login", methods=['POST'])
def login():
    postForm = request.get_json() 
    username = postForm["username"]
    password = postForm["password"]
    print(username)
    user = User.query.filter_by(name=username).first()

    # successfully login
    if user and check_password_hash(user.password, password):
        # user info
        print('yes')
        session['user'] = user.name
        session['id'] = user.id
        return '0'
    # user does not exist
    elif not user:
        return '1'
    # password does not match
    else:
        return '2'


if __name__ == "__main__":
    print("___       ________________ _____________________  ____________\n\
__ |     / /__  ____/__  / __  ____/_  __ \__   |/  /__  ____/\n\
__ | /| / /__  __/  __  /  _  /    _  / / /_  /|_/ /__  __/   \n\
__ |/ |/ / _  /___  _  /___/ /___  / /_/ /_  /  / / _  /___   \n\
____/|__/ /______/ /______/\____/  \____/ /_/  /_/ /______/   ")
    app.run()

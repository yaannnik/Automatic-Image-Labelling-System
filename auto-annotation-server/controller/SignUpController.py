from flask import Flask, Blueprint
from controller.AccountAPI import account_api
from flask import request, session
from entity import User
from dao import db
import pymysql
from entity.User import User
from werkzeug.security import generate_password_hash, check_password_hash
from service.signupService import signupService

from dao import app

signup_api = Blueprint('signup_api', __name__)
app.register_blueprint(signup_api)

@signup_api.route("/signup", methods=['POST'])
def signup():
    postForm = request.get_json() 
    username = postForm["username"]
    password = generate_password_hash(postForm["password"])
    user = User(name=username, password=password)
    print(user.name)
    signupservice = signupService(User=user)
    signupservice.signup()

    return password

if __name__ == "__main__":
    app.run()
import os
from entity.User import User
from dao import db
from flask import request, session



class userDao:
    def __init__(self, User):
        self.User = User

    def add_user(self):
        model_path = '/users/' + self.User.name + '/model/model_final.pth'
        json_path = '/users/' + self.User.name + '/data/'
        config_path = '/users/' + self.User.name + '/config/config.yaml'
        self.User.set_model(model_path)
        self.User.set_json(json_path)
        self.User.set_config(config_path)
        db.session.add(self.User)
        db.session.commit()
        session['user'] = self.User.name
        session['id'] = self.User.id

import os
from entity.User import User
from dao import db



class userDao:
    def __init__(self, User):
        self.User = User

    def add_user(self):
        model_path = 'train_model/' + self.User.name
        json_path = 'train_json/' + self.User.name
        self.User.set_model(model_path)
        self.User.set_json(json_path)
        db.session.add(self.User)
        db.session.commit()

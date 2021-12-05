import os
from entity.User import User
from dao.UserDao import userDao


class signupService:
    def __init__(self, User):
        self.User = User
        if not os.path.exists('../users'):
            os.mkdir('../users')

    def add_account(self):
        path = r'../users/'
        os.mkdir(path + self.User.name)

    def add_model(self):
        path = r'../users/'
        os.mkdir(path + self.User.name + "/model")

    def add_json(self):
        path = r'../users/'
        os.mkdir(path + self.User.name + "/data")

    def add_config(self):
        path = r'../users/'
        os.mkdir(path + self.User.name + "/config")

    def signup(self):
        self.add_account()
        self.add_model()
        self.add_json()
        self.add_config()
        userdao = userDao(User=self.User)
        userdao.add_user()

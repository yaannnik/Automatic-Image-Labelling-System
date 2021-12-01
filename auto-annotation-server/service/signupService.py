import os
from entity.User import User
from dao.UserDao import userDao


class signupService:
    def __init__(self, User):
        self.User = User

    def add_model(self):
        path = r'../train_models/'
        os.mkdir(path + self.User.name)

    def add_json(self):
        path = r'../train_json/'
        os.mkdir(path + self.User.name)

    def signup(self):
        self.add_model()
        self.add_json()
        userdao = userDao(User=self.User)
        userdao.add_user()

import os
from entity.Log import Log
from dao import db



class logDao:
    def __init__(self, Log):
        self.Log = Log

    def add_log(self):
        # print(self.Log.id)
        # print(self.Log.log_id)
        db.session.add(self.Log)
        db.session.commit()
from dao import db
from entity.User import User
import time
from flask import request, session


class Log(db.Model):
    """用户log记录表"""
    __tablename__ = "tbl_logs"
    log_id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(128))
    info = db.Column(db.String(128))
    type = db.Column(db.String(128))
    action = db.Column(db.String(128))
    id = db.Column(db.Integer, db.ForeignKey("tbl_users.id"))

    def __init__(self, info, type, action):
        self.info = info
        self.type = type
        self.action = action

    def set_time(self):
        asctime = time.asctime(time.localtime(time.time()))
        asctime = str(asctime)
        self.time = asctime

    def set_id(self):
        name = session['user']
        user = User.query.filter_by(name=name).first()
        self.id = user.id

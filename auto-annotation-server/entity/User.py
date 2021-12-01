from dao import db


class User(db.Model):
    """用户表"""
    __tablename__ = "tbl_users"  # 指明数据库的表名

    id = db.Column(db.Integer, primary_key=True)  # 整型的主键，会默认设置为自增主键
    name = db.Column(db.String(64), unique=True)
    model_path = db.Column(db.String(128), unique=True)  # 存放模型的路径
    json_path = db.Column(db.String(128), unique=True)   # 存放json文件的路径
    password = db.Column(db.String(128))
    log = db.relationship("Log", backref="tbl_logs", lazy="dynamic")

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def set_model(self, value):
        self.model_path = value

    def set_json(self, value):
        self.json_path = value

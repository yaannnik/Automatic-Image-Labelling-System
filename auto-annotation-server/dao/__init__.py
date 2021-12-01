from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

app = Flask(__name__)
class Config(object):
    """配置参数"""
    # 设置连接数据库的URL
    user = 'admin'
    password = 'chen1259'
    database = 'project'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%s:%s@mysql-instance.ceykemhm1t0v.us-east-2.rds.amazonaws.com:3306/%s?' % (user, password, database)



# 设置参数
app.config.from_object(Config)
app.config['SECRET_KEY'] = '123456'

'''创建数据库 sqlalchemy 工具对象'''
db = SQLAlchemy(app)
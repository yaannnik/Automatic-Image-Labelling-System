from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash  # 哈希加密
from dao import db
import pymysql
from entity.User import User
from entity.Log import Log

pymysql.install_as_MySQLdb()

if __name__ == '__main__':
    '''清除数据库中的所有数据'''
    db.drop_all()
    '''创建所有表'''
    db.create_all()
    admin = User(name='admin', password=generate_password_hash('fuck'))  # 实例化一个用户对象
    db.session.add(admin)  # 添加入session
    db.session.commit()  # 提交给数据库
    # user = User.query.filter_by(name='admin').first()
    # print(user.name)
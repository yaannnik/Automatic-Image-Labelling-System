import os
import sys
sys.path.append("..")

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash  # hash encode
from dao import db
import pymysql
from entity.User import User
from entity.Log import Log

pymysql.install_as_MySQLdb()

if __name__ == '__main__':
    '''reset database'''
    db.drop_all()
    '''create all tables'''
    db.create_all()
    admin = User(name='admin', password=generate_password_hash('6893'))
    db.session.add(admin)  # add session
    db.session.commit()  # commit to database
    # user = User.query.filter_by(name='admin').first()
    # print(user.name)
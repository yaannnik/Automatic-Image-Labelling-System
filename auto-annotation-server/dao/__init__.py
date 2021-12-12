from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()

app = Flask(__name__)
class Config(object):
    """set parameters"""
    # set URL
    user = 'admin'
    password = 'chen1259'
    database = 'project'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%s:%s@mysql-instance.ceykemhm1t0v.us-east-2.rds.amazonaws.com:3306/%s?' % (user, password, database)



# set parameters
app.config.from_object(Config)
app.config['SECRET_KEY'] = '123456'

'''create sqlalchemy object'''
db = SQLAlchemy(app)
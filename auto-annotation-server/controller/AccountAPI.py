from flask import Blueprint
from flask import request, session

account_api = Blueprint('account_api', __name__)

@account_api.route("/account")
def accountList():
    return session['user']
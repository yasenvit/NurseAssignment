from flask import jsonify, request
from flask_app import app
from app import util
from app.account import Account
from requests.exceptions import ConnectionError
import json

UNATHORIZED = {'error':'unathorized', 'statuscode':'401'}
NOT_FOUND = {'error':'not found', 'statuscode':'404'}
APP_ERROR = {'error':'application error', 'statuscode':'500'}
BAD_REQUEST = {'error':'bad request', 'statuscode':'400'}

@app.errorhandler(404)
def error404(e):
    return jsonify(NOT_FOUND), 404

@app.errorhandler(500)
def error500(e):
    return jsonify(APP_ERROR), 500

@app.route('/')
def root():
    return jsonify({'name':'Nurse Assignment'})

@app.route('/api/signup', methods=['POST'])
def signUp():
    print("/n/nroute/n/n")
    if not request.json or 'username' not in request.json or 'password' not in request.json:
        return jsonify(BAD_REQUEST), 400
    username = request.json["username"]
    password = request.json["password"]
    print("/n/n/n/n/n/n Route /n/n/n/n/n/n/n/")
    checking = Account.get_name(username)
    if len(checking) > 0 or len(password) < 6:
        return jsonify(APP_ERROR), 500
    new = Account()
    new.signUp(username, password)
    new.save()
    return jsonify({
        'username': new.username,
        'api_key': new.api_key
    })

@app.route('/api/get_api_key', methods=['POST'])
def get_api_key():
    if not request.json or 'username' not in request.json or\
        'password' not in request.json:
        return jsonify(BAD_REQUEST), 400
    account = Account.login(request.json['username'], request.json['password'])
    if not account:
        return jsonify(UNATHORIZED), 401
    return jsonify({
        'username': account.username,
        'api_key': account.api_key
    })

@app.route('/api/<api_key>/<managerID>/members')
def get_members(api_key,managerID):
    acc = Account.api_authenticate(api_key)
    if not acc:
        return jsonify(UNATHORIZED), 401
    membersList  = util.get_assigned_members(managerID)
    return jsonify({'members': membersList})











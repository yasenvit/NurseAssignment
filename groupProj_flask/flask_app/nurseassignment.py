from flask import jsonify,request, redirect, url_for
from flask_app import app
from flask import Flask
from flask_cors import CORS
from app import util
from app.account import Account
from app import member
from app import caremanager
from app import caremanagerzip
from app import caremanagermember
from app import assignment
import json


UNAUTHORIZED={"error:":"unauthorized","STATUS CODE":400}
NOTFOUND={"error:":"NOT FOUND","STATUS CODE":404}
APPERROR={"error:":"APPLICATION ERROR","STATUS CODE":500}
BADREQUEST={"error:":"BAD REQUEST","STATUS CODE":400}

@app.errorhandler(404)
def error404(e):
    return jsonify(NOTFOUND),404

@app.errorhandler(500)
def error500(e):
    return jsonify(APPERROR),500

@app.route('/')
def root():    
    return jsonify({"name":"Nurse Assignment Tool"})



@app.route('/api/caremanagerinfo',methods=['POST'])
def caremanagerinfo():
    if not request.json or 'cmpk' not in request.json:
        return jsonify(BADREQUEST),400
    
    cm=caremanager.Caremanager()    
    cm.pk=request.json['cmpk']    
    cmresults=cm.get_results()

    json_list=[cmr.json() for cmr in cmresults]
    return jsonify({"output":json_list})

@app.route('/api/caremanagerallinfo',methods=['GET'])
def caremanagerallinfo():   
    
    cm=caremanager.Caremanager()       
    cmresults=cm.get_allresults()

    json_list=[cmr.json() for cmr in cmresults]
    return jsonify({"output":json_list})

@app.route('/api/<api_key>/newcaremanager',methods=['POST'])
def newcaremanager(api_key):
    if not request.json or 'lastname' not in request.json or 'firstname' not in request.json or 'zipcode' not in request.json:
        return jsonify(BADREQUEST),400
    
    cm=caremanager.Caremanager()    
    cm.cm_firstname=request.json['firstname']  
    cm.cm_lastname=request.json['lastname']
    cm.cm_maxcaseload=request.json['maxcaseload']
    cm.save()  

    maxpk=cm.pk
    
        
    #write caremanager zip import for zipcodes
    cm.pk=maxpk    
    cmresults=cm.get_results()
    #must create parser for zipcode entry
    ziprow=str(request.json['zipcode']).split(',')
    linecount=0
    ziplist=[]
    for z in ziprow:
        linecount=linecount+1
        cmz=caremanagerzip.Caremanagerzip()
        cmz.cmpk=maxpk
        cmz.zipcode=z
        ziplist.append(z)
        cmz.priority=linecount
        cmz.save()

    cmz.cmpk=maxpk
    cmzresults=cmz.get_results()
    json_ziplist=[cmrz.json() for cmrz in cmzresults]


    json_list=[cmr.json() for cmr in cmresults]
    return jsonify({"output":json_list,"cmpk":maxpk,"outputzip":json_ziplist,"ziplist":ziplist})

@app.route('/api/getcaremanagerassignment',methods=['GET'])
def getcaremanagerassignment():   
    
    assign=assignment.Assignment()
    print(assign.getassignment())
    rowassign=assign.getassignment()      
    

    # json_list=[cmr.json() for cmr in cmresults]
    return jsonify({"Success":"OK","Rows":rowassign})

#######################################################################################


@app.route('/api/signup', methods=['POST'])
def signUp():
    if not request.json or 'username' not in request.json or 'password' not in request.json:
        return jsonify(BAD_REQUEST), 400
    username = request.json["username"]
    password = request.json["password"]
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
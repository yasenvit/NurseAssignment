from flask import jsonify,request, redirect, url_for
from flask_app import app
from flask import Flask
from flask_cors import CORS
from app import member
from app import caremanager
from app import caremanagerzip
from app import caremanagermember
from app import assignment

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
    print(json_list)
    return jsonify({"output":json_list})

@app.route('/api/caremanagermemberinfo',methods=['POST'])
def caremanagermemberinfo():
    if not request.json or 'cmpk' not in request.json:
        return jsonify(BADREQUEST),400
    
    cm=caremanagermember.Caremanagermember()   
    cm.pk=request.json['cmpk']    
    cmresults=cm.get_results_query()

    json_list=[cmr.jsonquery() for cmr in cmresults]
    return jsonify({"output":json_list})

@app.route('/api/newcaremanager',methods=['POST'])
def newcaremanager():
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

import time
import random
import string
import datetime
from groupProj_flask.app.orm import ORM

class Caremanager(ORM):
    fields = ["cmpk","cm_firstname","cm_lastname","cm_maxcaseload","active_status"]
    table = "caremanager"
    pk="cmpk"
 
    def __init__(self):
        self.pk = None
        self.cmpk=None        
        self.cm_firstname=None
        self.cm_lastname=None
        self.cm_maxcaseload=None
        self.active_status=1   

       
    

    def get_results(self):
        """ return a list of each Member object for this user """
        where = "WHERE active_status=1 and cmpk = ?"
        values = (self.pk, )
        return Caremanager.select_many(where, values)
    
    def get_allresults(self):
        """ return a list of each Member object for this user """
        where = "where active_status=1"
        values = ()
        return Caremanager.select_many(where, values)

    def get_maxpk(self,pkid):
        """ return a list of each Member object for this user """
        
        return Caremanager.max_pk(pkid)


    def json(self):
        return {"cmpk":self.cmpk,"caremanagerfirstname":self.cm_firstname,
        "caremanagerlastname":self.cm_lastname,
        "maxcaseload":self.cm_maxcaseload,
        "activestatus":self.active_status
        }
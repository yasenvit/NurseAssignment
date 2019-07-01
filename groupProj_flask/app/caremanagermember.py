import time
import random
import string
import datetime
from app.orm import ORM

class Caremanagermember(ORM):
    fields = ["cmpk","mempk"]
    table = "caremanagermember"
    pk="cmmempk"
 
    def __init__(self):
        self.pk = None
        self.cmpk=None
        self.mempk=None
        self.cm_firstname=None
        self.cm_lastname=None
        self.mem_firstname=None
        self.mem_lastname=None
        self.mem_address=None
        self.mem_city=None
        self.mem_state=None
        self.mem_zip=None
        self.mem_longitude=None
        self.mem_latitude=None
        self.countof=None
    

       
    

    def get_results(self):
        """ return a list of each Member object for this user """
        where = "WHERE cmpk = ?"
        values = (self.pk, )
        return Caremanagermember.select_many(where, values)

    def get_results_query(self):
        """ return a list of each Member object for this user """
        where = "WHERE cmm.cmpk = ?"
        fieldinfo="mem.*,cm.*"
        frominfo="from caremanagermember cmm join member mem on cmm.mempk=mem.mempk join caremanager cm on cmm.cmpk=cm.cmpk"
        values = (self.pk, )
        return Caremanagermember.select_many_query(fieldinfo,where,frominfo,values)
    
    def get_assigned_totals_query(self):
        """ return a list of each Member object for this user """
        where = "WHERE cm.active_status=1 and cmm.cmpk=? group by cmm.cmpk"
        fieldinfo="cmm.cmpk,count(*) countof"
        frominfo="from caremanagermember cmm join caremanager cm on cmm.cmpk=cm.cmpk"
        values = (self.pk,)
        return Caremanagermember.select_many_query(fieldinfo,where,frominfo,values)

    def get_results_query_single_member(self):
        """ return a list of each Member object for this user """
        where = "WHERE cmm.cmpk = ? and cmm.mempk=?"
        fieldinfo="mem.*,cm.*"
        frominfo="from caremanagermember cmm join member mem on cmm.mempk=mem.mempk join caremanager cm on cmm.cmpk=cm.cmpk"
        values = (self.pk, self.mempk)
        return Caremanagermember.select_many_query(fieldinfo,where,frominfo,values)
    
    def get_allresults(self):
        """ return a list of each Member object for this user """
        where = ""
        values = ()
        return Caremanagermember.select_many(where, values)

    def get_maxpk(self,pkid):
        """ return a list of each Member object for this user """
        
        return Caremanagermember.max_pk(pkid)


    def json(self):
        return {"cmpk":self.cmpk,"mempk":self.mempk}

    def jsontotalassigned(self):
        return {"assignedtotal":self.countof}

    def jsonquery(self):
        return {"cmpk":self.cmpk,"mempk":self.mempk,
        "caremanagerfirstname":self.cm_firstname,
        "caremanagerlastname":self.cm_lastname,
        "memberfirstname":self.mem_firstname,
        "memberlastname":self.mem_lastname,
        "memberaddress":self.mem_address,
        "membercity":self.mem_city,
        "memberstate":self.mem_state,
        "memberzip":self.mem_zip,
        "memberlatitude":self.mem_latitude,
        "memberlongitude":self.mem_longitude}

    def jsonquerysingle(self):
        return {"cmpk":self.cmpk,"mempk":self.mempk,
        "caremanagerfirstname":self.cm_firstname,
        "caremanagerlastname":self.cm_lastname,
        "mem_firstname":self.mem_firstname,
        "mem_lastname":self.mem_lastname,
        "mem_address":self.mem_address,
        "mem_city":self.mem_city,
        "mem_state":self.mem_state,
        "mem_zip":self.mem_zip,
        "mem_latitude":self.mem_latitude,
        "mem_longitude":self.mem_longitude}
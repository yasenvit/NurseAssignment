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
    

       
    

    def get_results(self):
        """ return a list of each Member object for this user """
        where = "WHERE cmmempk = ?"
        values = (self.pk, )
        return Caremanagermember.select_many(where, values)
    
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
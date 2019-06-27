import time
import random
import string
import datetime
from app.orm import ORM

class Caremanagerzip(ORM):
    fields = ["cmpk","zipcode","priority","active_status"]
    table = "caremanagerzip"
    pk="cmzpk"
 
    def __init__(self):
        self.pk = None
        self.cmpk=None
        self.zipcode=None
        self.priority=None
        self.active_status=1   

       
    

    def get_results(self):
        """ return a list of each Member object for this user """
        where = "WHERE cmzpk = ?"
        values = (self.pk, )
        return Caremanagerzip.select_many(where, values)

    def get_allresults(self):
        """ return a list of each Member object for this user """
        where = ""
        values = ()
        return Caremanagerzip.select_many(where, values)

    def json(self):
        return {"cmpk":self.cmpk,
        "zipcode":self.zipcode,
        "priority":self.priority,
        "activestatus":self.active_status
        }
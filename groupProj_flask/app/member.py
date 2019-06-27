import time
import random
import string
import datetime
from app.orm import ORM

class Member(ORM):
    fields = ["mem_firstname","mem_lastname","mem_address","mem_city","mem_state","mem_zip","mem_longitude","mem_latitude"]
    table = "member"
    pk="mempk"
 
    def __init__(self):
        self.pk = None
        self.mem_firstname=None
        self.mem_lastname=None
        self.mem_address=None
        self.mem_city=None
        self.mem_state=None
        self.mem_zip=None
        self.mem_longitude=None
        self.mem_latitude=None

       
    def savemember(self,mem_firstname,mem_lastname,mem_address,mem_city,mem_state,mem_zip,mem_longitude,mem_latitude):
        self.mem_firstname=mem_firstname
        self.mem_lastname=mem_lastname
        self.mem_address=mem_address
        self.mem_city=mem_city
        self.mem_state=mem_state
        self.mem_zip=mem_zip
        self.mem_longitude=mem_longitude
        self.mem_latitude=mem_latitude
        self.save()

    def get_results(self):
        """ return a list of each Member object for this user """
        where = "WHERE mempk = ?"
        values = (self.pk, )
        return Member.select_many(where, values)

    def json(self):
        return {"memberfirstname":self.mem_firstname,
        "memberlastname":self.mem_lastname,
        "memberaddress":self.mem_address,
        "membercity":self.mem_city,
        "memberstate":self.mem_state,
        "memberzip":self.mem_zip,
        "memberlongitude":self.mem_longitude,
        "memberlatitude":self.mem_latitude}
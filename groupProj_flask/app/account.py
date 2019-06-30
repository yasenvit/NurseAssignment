import time
from app.orm import ORM
from app.util import hash_pass
import random
import string

SALT = "nobody will ever guess this"

class Account(ORM):
    fields = ["username", "password_hash", "api_key"]
    table = "staffaccounts"

    def __init__(self):
        self.pk = None
        self.username = None
        self.password_hash = None
        self.api_key = None

    def set_password(self, password):
        self.password_hash = hash_pass(password)

    @classmethod
    def login(cls, username, password):
        account = cls.select_one("WHERE password_hash = ? AND username = ?", (hash_pass(password), username))  #?
        if not account:
            return None
        else:
            return account
    
    def signUp(self,username, password):
        self.username = username
        self.password = self.set_password(password)
        self.random_generator()
        self.save()

    @classmethod
    def get_name(cls, newname):
        where = "WHERE username=?"
        values = (newname,)
        return cls.select_many(where, values)
   
    def get_api_key(self):
        where = "WHERE pk=?"
        values = (self.pk,)
        return self.select_one(where, values)

    def random_generator(self,size=15, chars=string.ascii_uppercase + string.digits):
        key = ''.join(random.choice(chars) for x in range(size))
        self.api_key = key
            
    @classmethod    
    def api_authenticate(cls, api_key):
        account = cls.select_one("WHERE api_key = ?",(api_key,))
        if not account:
            return None
        else:
            return account
        
    
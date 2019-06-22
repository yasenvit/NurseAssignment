import sqlite3
import hashlib

database = "nurseassignment.db"


salt = "its a secret to everyone"

def hash_pass(password):
    # salted 128 character hash of a string
    hasher = hashlib.sha512()
    value = password.encode() + salt.encode()
    hasher.update(value)
    return hasher.hexdigest()

def get_assigned_members(id, database = database):
    with sqlite3.connect("nurseassignment.db") as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        SQL = "SELECT * FROM member WHERE mem_zip={};".format(id)
        #SQL = """SELECT member.* FROM caremanagermember JOIN caremanager ON
        #caremanagermember.cmpk=caremanager.cmpk JOIN member ON
        #caremanagermember.mempk=member.mempk WHERE caremanagermember.cmpk={};""".format(id)
        cur.execute(SQL)
        results = cur.fetchall()
        resultList = []
        for res in results:
            result = dict(res)
            resultDict = {}
            for k,v in result.items():
                if isinstance(v, int) or isinstance(v,float):
                    resultDict[k]=v
                else:
                    resultDict[k]=v.strip()
            resultList.append(resultDict)
        return resultList        





#SQLPATTERN = """select mem.* from caremanagermember cmm join caremanager cm 
 #           on cmm.cmpk=cm.cmpk join member mem on cmm.mempk=mem.mempk where cmm.cmpk={};"""
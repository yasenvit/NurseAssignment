import sqlite3
#import pandas as pd
from app import caremanagermember

class Assignment:
    DB="./nurseassignment.db"
    def getassignment(self):
        with sqlite3.connect(self.DB) as conn:
                conn.row_factory = sqlite3.Row
                cur = conn.cursor()
                # Getting Maximum Priority
                SQL="select max(priority) maxpriority from caremanagerzip"
                cur.execute(SQL)
                maxpriority=cur.fetchone()
                
                # Primary loop through priority
                rowinput=[]
                for p in range(maxpriority[0]+1):
                    # creating SQL with priority parameter to capture zipcodes and case loads
                    SQL="""select cmz.*,cm.cm_maxcaseload from caremanager cm join caremanagerzip cmz on cm.cmpk=cmz.cmpk
                     where cmz.priority={} and cm.active_status=1""".format(p)
                    cur.execute(SQL)

                    #capturing caremanagers and thier Priority Zip Codes in a datatframe to loop through
                    
                    caremanagerzip=cur.fetchall()
                    for row in caremanagerzip:
                        rowinput.append(dict(row))

                        # capturing amount of zipcodes to divide by max case load for 
                        # even distribution of members to care managers
                        cmdict=dict(row)
                        SQL="""select count(distinct zipcode) countof from caremanagerzip cmz
                         where cmz.cmpk={0}""".format(cmdict['cmpk'])
                        cur.execute(SQL)
                        zipcount=cur.fetchone()[0]
                        # print(cmdict['cm_maxcaseload'])
                        zipdivcount=cmdict['cm_maxcaseload']/zipcount

                        # creating matches between member information and care manager
                        # for preferred zipcodes in the list
                        SQLSEL="""select mem.mempk from member mem left join caremanagermember cmm on
                        mem.mempk=cmm.mempk 
                        where cmm.mempk is null and mem.mem_zip={0} limit {1}""".format(cmdict['zipcode'],round(zipdivcount))

                        cur.execute(SQLSEL)
                        memsel=cur.fetchall()
                        
                        for rowsel in memsel:
                            newcmmem=dict(rowsel)
                            
                            # getting current care manager record count
                            # need count to not exceed care manager max case load
                            CURCOUNTSQL="""select count(*) countof from caremanagermember cmm
                             where cmpk={}""".format(cmdict['cmpk'])
                            cur.execute(CURCOUNTSQL)
                            curcount=cur.fetchone()[0]
                            

                            # inserting members and care manager links into caremanagermember table
                            # this will assign care managers to members not to exceed max case load
                            if curcount<cmdict['cm_maxcaseload']:
                                INSSQL="""insert into caremanagermember (cmpk,mempk) 
                                values ({0},{1})""".format(cmdict['cmpk'],newcmmem['mempk'])
                                cur.execute(INSSQL)






                        
                # getting final results of assignment and returning list of 
                # assigned members to care amangers
                FINALSQL="""select mem.*,cm.* from caremanagermember cmm join member mem on cmm.mempk=mem.mempk
                 join caremanager cm on cmm.cmpk=cm.cmpk order by cm_lastname asc"""
                cur.execute(FINALSQL)
                assigndata=cur.fetchall()
                finaloutput=[]
                for rowfinal in assigndata:
                    rf=dict(rowfinal)
                    finaloutput.append(rf)

                return finaloutput
import csv
import requests, json
import app.caremanager as caremanager


# opening csv for reading
with open('caremanager_upload.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    
    for row in csv_reader:
        line_count=line_count+1
        if line_count>1:
            
            newcm=caremanager.Caremanager()
            newcm.cm_firstname=row[0]
            newcm.cm_lastname=row[1]
            newcm.cm_maxcaseload=row[2]    
            newcm.save()

print('completed')
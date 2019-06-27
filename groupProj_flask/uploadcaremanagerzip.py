import csv
import requests, json
import app.caremanagerzip as caremanagerzip

# opening csv for reading
with open('caremanagerzip_upload.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    
    for row in csv_reader:
        line_count=line_count+1
        if line_count>1:
            
            newcmz=caremanagerzip.Caremanagerzip()
            newcmz.cmpk=row[0]
            newcmz.zipcode=row[1]
            newcmz.priority=row[2]    
            newcmz.save()

print('completed')
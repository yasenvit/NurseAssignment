import csv
import requests, json
import app.member as member

# google api key AIzaSyDfdsQfk2OJkQPHiZzEHeeyASm9z9efzXU

# Google API Key
api_key = 'AIzaSyDfdsQfk2OJkQPHiZzEHeeyASm9z9efzXU'

# creating function to get longitude and latitude
def getgoogleinfo(apikey,address,city,state,zipcode):
    url = 'https://maps.googleapis.com/maps/api/geocode/json?'
    # address=1600+Amphitheatre+Parkway,+Mountain+View,
    address=str(address).replace(' ','+')
    city=str(city).replace(' ','+')
    state=str(state).replace(' ','+')

    place='{0},{1},{2},{3}'.format(address,city,state,zipcode)
    urlstr=url + 'address=' +place + '&key=' + apikey
    res_ob = requests.get(urlstr) 

    x = res_ob.json()
    #print(urlstr)
    #print(x['results'])
    
    jmap=x['results']
    lat=0.000000000
    lng=0.000000000
    latlng=[]
    for loc in jmap:
        lat=loc['geometry']['location']['lat']
        latlng.append(lat)
        lng=loc['geometry']['location']['lng']
        latlng.append(lng)

        
    if len(latlng)==0:
        latlng.append(lat)
        latlng.append(lng)    
    
    return latlng
    
    

# opening csv for reading
with open('member_template.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    
    for row in csv_reader:
        line_count=line_count+1
        if line_count>1:
            latlng=getgoogleinfo(api_key,row[2],row[3],row[4],row[5])
            newmember=member.Member()
            newmember.mem_firstname=row[0]
            newmember.mem_lastname=row[1]
            newmember.mem_address=row[2]
            newmember.mem_city=row[3]
            newmember.mem_state=row[4]
            newmember.mem_zip=row[5]            
            newmember.mem_latitude=latlng[1]
            newmember.mem_longitude=latlng[0]            
            newmember.save()

print('completed')
            



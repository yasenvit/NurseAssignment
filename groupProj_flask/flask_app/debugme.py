mystr = "112223,2334,140334"

for i in mystr.split(','):
    if i.isdigit()==False or len(i)!=5:
        print("wrong")
    else:
        print("correct")


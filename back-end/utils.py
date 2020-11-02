from pymongo import MongoClient
from backend import *

#testing valid response
#validate list with correct values
#if all values are correct set valid true
#else skip it and return valid = false
def save_login(info):
    #list1 = info.keys()
    valid = False
    if "username" in info and "password" in info:
        print("found")
        valid = True
    else:
        print("not found")
        valid = False
    return valid
def validate(info):
    valid = False
    for i in dir(loginCol):
        if info == i:
            valid = True
    return valid

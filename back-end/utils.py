from pymongo import MongoClient
from backend import *

#testing valid response
#validate list with correct values
#if all values are correct set valid true
#else skip it and return valid = false
def save_login(info):
    #list1 = info.keys()
    valid = False
    if "username" in info and "password" in order:
        valid = True
    else:
        return False

def validate(info):
    valid = False
    for i in dir(loginCol):
        if info == i:
            valid = True
    return valid

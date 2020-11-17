from pymongo import MongoClient
from backend import *

# testing valid response
# validate list with correct values
# if all values are correct set valid true
# else skip it and return valid = false


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
    found_flags = 0
    print(type(info))
    username = info.get('username')
    password = info.get('password')
    if loginCol.find_one({'username': username}) == None:
        valid = False
    else:
        found_flags += 1
    if loginCol.find_one({'password': password}) == None:
        valid = False
    else:
        found_flags += 1
    if(found_flags == 2):
        valid = True
    return valid

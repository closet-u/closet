from pymongo import MongoClient
import json
from login import *
from utils import *

#DBConfiguration
#client = pymongo.MongoClient("mongodb+srv://mannynunez8:12345@cluster0.pviz6.gcp.mongodb.net/test?retryWrites=true&w=majority")
client = MongoClient("mongodb://127.0.0.1", 27017)

#establish DB and collections
db = client.closetU
loginCol = db.login
print("connected")

#test input data into DB
#post = {"username": "mannynu", "password": "12345"}
#post = login_info()
print("server info: ", client.server_info())

#insert data into DB

#loginCol.insert(post)
print("complete")

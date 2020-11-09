from pymongo import MongoClient
import json

# DBConfiguration
# client = pymongo.MongoClient(
#     "mongodb+srv://mannynunez8:12345@cluster0.pviz6.gcp.mongodb.net/test?retryWrites=true&w=majority")
client = MongoClient("mongodb://127.0.0.1", 27017)

# establish DB and collections
db = client.closetU
loginCol = db.login
print("connected")

# for document in loginCol.find():
#   print(document)

# test input data into DB
# post = {"username": "david", "password": "2468"}
#print("server info: ", client.server_info())

# insert data into DB
# loginCol.insert({"username": "david", "password": "2468"})
print("complete")

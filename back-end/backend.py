import urllib.parse
import flask
from flask import Flask, request
from utils import *
from backend import *

#from flask_cors import CORS, cross_origin
#Flask setup
app = Flask(__name__)
# cors = CORS(app)
# app.config['CORS_HEADERS']= 'Content-Type'

#registration path
@app.route("/register")
def registration(body):
    body = request.body
    info = json.loads(body)
    print(info.keys())
    result = save_login(body)

    #if registration information is valid- instert in # DB
    if result == True:
        loginCol.insertOne(body)
        print("Registration complete")
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'Fail':False}), 400, {'ContentType':'application/json'}

#login path
@app.route("/login")
def login(body):
    body = request.body
    info = json.loads(body)
    print(info.keys())
    result = validate(body)
    #if login information is valid- return True
    if result == True:
        post = body
        print("Login Successful!")
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    elif result == False:
        print("Username or Password is Incorrect")
    else:
        return json.dumps({'Fail':False}), 400, {'ContentType':'application/json'}

def main():
    post = {'username':'claudia1','password':'54321'}
    registration(post)
    print("main")
    # login(post)

main()



# if __name__ == '__main__':
#     app.run(debug = True)


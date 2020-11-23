import urllib.parse
import flask
from flask import Flask, request
from utils import *
from backend import *
from flask_cors import CORS, cross_origin
from s3_utils import *
# Flask setup
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# @app.route("/")
# @cross_origin()

# registration path


@app.route("/register", methods=['GET', 'POST'])
@cross_origin()
def registration():
    payload_data = request.get_data()
    loaded_data = json.loads(payload_data.decode('utf-8'))
    test = json.dumps(loaded_data)
    body = loaded_data
    #info = json.loads(body)
    # print(info.keys())
    result = save_login(test)

    # if registration information is valid- instert in # DB
    if result == True:
        loginCol.insert_one(body)
        print("Registration complete")
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    else:
        return json.dumps({'Fail': False}), 400, {'ContentType': 'application/json'}

# login path


@app.route("/login", methods=['GET', 'POST'])
def login():
    payload_data = request.get_data()
    loaded_data = json.loads(payload_data.decode('utf-8'))
    test = json.dumps(loaded_data)
    body = loaded_data
    result = validate(body)
    # if login information is valid- return True
    if result == True:
        print("Login Successful!")
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

    else:
        return json.dumps({'Fail': False}), 400, {'ContentType': 'application/json'}

@app.route("/upload", methods =['GET', 'POST'])
def upload():
    payload_data = request.get_data()
    loaded_data = json.loads(payload_data.decode('utf-8'))
    test = json.dumps(loaded_data)
    body = loaded_data

    existing_bucket = False
    if bucket_exists(bucket_name) == False:
        create_bucket(bucket_name)

    put_data(bucket_name,object_key,data)
    print("You have inserted ", data,"into the bucket ", bucket_name)


# def main():
#     post = {'username': 'claudia1', 'password': '54321'}
#     registration(post)
#     print("main")
#     # login(post)
#
#
# main()


if __name__ == '__main__':
    app.run(debug=True)

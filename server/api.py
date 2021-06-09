import time
import json
from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from auth import check_password, create_password, create_2fa, check_2fa, get_auth_token, check_auth_token
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/authoreyes'
db = SQLAlchemy(app)

def verify_auth_token(token):
    return check_auth_token(token, os.getenv('SECRET_KEY'))

class users(db.Model):
    id = db.Column('user_id', db.Integer, primary_key = True)
    f_name = db.Column('f_name', db.String(45))
    l_name = db.Column('l_name', db.String(45))
    u_name = db.Column('u_name', db.String(45))
    password = db.Column('pass', db.String(100))
    salt = db.Column('salt', db.String(45))
    created_at = db.Column('created_at', db.DateTime)
    updated_at = db.Column('updated_at', db.DateTime)

@app.route('/attempt_login', methods=['POST'])
def attempt_login():
    data = json.loads(request.data)
    try:
        user = users.query.filter_by(u_name=data['username']).one()
    except Exception:
        return {'error': 'email not found'}

    if check_password(data['password'],user.password):
        return {'success': 'true', '2fa': 'true'}
    else:
        return {'error': 'incorrect password'}

@app.route('/attempt_2fa', methods=['POST'])
def attempt_2fa():
    data = json.loads(request.data)
    user = users.query.filter_by(u_name=data['username']).one()
    if check_2fa(user.salt,data['code_2fa']):
        token = get_auth_token(user.id, os.getenv('SECRET_KEY'))
        return {'success': 'true', 'token': str(token), 'user_id': user.id}
    else:
        return {'error': 'incorrent 2fa'}

@app.route('/create_2fa', methods=['POST'])
def get_2fa():
    data = json.loads(request.data)
    (uri, salt) = create_2fa(data['username'])
    user = users.query.filter_by(u_name=data['username']).one()
    user.salt = salt
    db.session.commit()
    return {'uri': uri, 'success': 'true'}

@app.route('/get_users', methods=["POST"])
def get_users():
    auth = authenticate()
    print(auth)
    return {'success': 'true'}

@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = json.loads(request.data)
    if verify_auth_token(data['token']) == data['user_id']:
        user = users.query.filter_by(id=data['user_id']).one()
        return {'is_authenticated': 'true','f_name': user.f_name}   
    else:
        return Response(json.dumps(verify_auth_token(data['token'])),401,{'error': 'jwt invalid, gtfo', 'is_authenticated': 'false'})
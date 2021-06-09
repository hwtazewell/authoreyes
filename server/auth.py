import bcrypt
import jwt
import datetime
import pyotp
import base64

def check_password(attempt, password):
    return bcrypt.checkpw(attempt.encode('utf-8'), password.encode('utf-8'))

def create_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode("utf-8", "ignore")

def create_2fa(username):
    secret = pyotp.random_base32()
    print(pyotp.totp.TOTP(secret).provisioning_uri(name=username, issuer_name='AuthorEyes'))
    return (pyotp.totp.TOTP(secret).provisioning_uri(name=username, issuer_name='AuthorEyes'),secret)

def check_2fa(salt,password):
    return True if pyotp.TOTP(salt).now() == password else False


def get_auth_token(id, secret):
    payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, hours=1),
            'iat': datetime.datetime.utcnow(),
            'sub': id
        }
    return jwt.encode(
            payload,
            secret,
            algorithm='HS256'
        ).decode("utf-8", "ignore")
def check_auth_token(token, secret):
    try:
        payload = jwt.decode(token, secret)
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

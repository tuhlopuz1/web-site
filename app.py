from flask import Flask, jsonify, request
from flask_cors import CORS
from python_source.adapter import DBAdapter
from random import randint
import os
from dotenv import load_dotenv
from python_source.email_verification import send_verification_code
from python_source.quiz_adapter import QuizAdapter
load_dotenv()

_url = os.getenv("URL")
_key = os.getenv("KEY")




name = 'main'
app = Flask(name)
CORS(app)
@app.route('/')
def hello_world():
  return 'Hello, World!'

@app.route('/<number>')
def square(number):
  try:
    return str(int(number)**2)
  except:
    return jsonify("not a number")


@app.route('/get-user-by-email/<email>')
def get_user_by_mail(email):
  adapter = DBAdapter(_url,_key)
  return adapter.get_user_by_email(email)

@app.route('/get-user-by-login/<login>')
def get_user_by_username(login):
  adapter = DBAdapter(_url,_key)
  return adapter.get_user_by_login(login)

@app.route('/register-new-user', methods=['POST'])
def register():

  data = request.json  
  print(data)

  adapter = DBAdapter(_url, _key)
  adapter.insert_new_user(
    email=data['email'],
    login=data['login'],
    password=data['password']
  )
  return '200'

@app.route('/send-verification-email', methods=['POST'])
def send_email():
  data = request.json
  print(data)
  code = str(randint(10000, 99999))
  send_verification_code(code, data)
  return code


@app.route('/upload-image', methods=['POST'])
def upload_image():
  data = request.json
  print(data)
  adapter = QuizAdapter(_url, _key)
  response = adapter.upload_image(data["file"], data["name"])
  return response

@app.route('/upload-quiz', methods=['POST'])
def upload_image():
  data = request.json
  print(data)
  adapter = QuizAdapter(_url, _key)
  response = adapter.upload_image(data)
  return response

if name == 'main':
  app.run(debug=True)
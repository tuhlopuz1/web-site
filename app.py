from flask import Flask, jsonify, request
from flask_cors import CORS
from python_source.adapter import DBAdapter


_url = 'https://txrvpoufhekskfpnyrhn.supabase.co'

_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cnZwb3VmaGVrc2tmcG55cmhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQwNjQ5MSwiZXhwIjoyMDUwOTgyNDkxfQ.HV9JxDADslVOH1ZJNDYR-OrQdhv-5IJKXlJ1MyEuZYU'



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
  return adapter.get_user_by_email()

@app.route('/get-user-by-login/<login>')
def get_user_by_username(login):
  adapter = DBAdapter(_url,_key)
  return adapter.get_user_by_login(login)

@app.route('/register-new-user', methods=['POST'])
def register():

    data = request.json  
    

    adapter = DBAdapter(_url, _key)
    adapter.insert_new_user(
      email=data['email'],
      login=data['login'],
      password=data['password']
    )


if name == 'main':
  app.run(debug=True)
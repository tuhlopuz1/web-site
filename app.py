from flask import Flask, jsonify
from flask_cors import CORS

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
    return jsonify("not a number");

if name == 'main':
  app.run(debug=True)
import sqlite3
connection = sqlite3.connect("localdb.db")

cursor = connection.cursor()

cursor.execute(
    "CREATE TABLE users(id INTEGER, email TEXT, password TEXT)"
)
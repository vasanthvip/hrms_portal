import MySQLdb
try:
    db = MySQLdb.connect(host="localhost", user="root", passwd="user@123")
    cursor = db.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS hrms_db")
    print("Database created or already exists")
except Exception as e:
    print(e)

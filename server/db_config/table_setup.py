import logging
from routes import app

from db_config import connect

conn = connect.get_connection()

@app.route("/table_setup", methods=["GET"])
def table_setup():
    cursor = conn.cursor()
    cursor.execute("CREATE SCHEMA IF NOT EXISTS fyp_db;")

    cursor.execute("""CREATE TABLE IF NOT EXISTS fyp_db.chairs (
  status varchar(100) NOT NULL,
  x int NOT NULL,
  y int NOT NULL,
  type varchar(100) DEFAULT NULL,
  zone int DEFAULT NULL,
  id int NOT NULL unique,
  date timestamp NOT NULL
);""")
    cursor.close()
    return "Created table successfully."

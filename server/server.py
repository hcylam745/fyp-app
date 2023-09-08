from flask import jsonify, request, Flask
from configs import Config
from flask_mysqldb import MySQL

import datetime

# flask server init
app = Flask(__name__)

app.config['MYSQL_HOST'] = Config.MYSQL_HOST
app.config['MYSQL_USER'] = Config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = Config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = Config.MYSQL_DB

mysql = MySQL(app)

# Format below:
# [
#     {
#         "status": "occupied",
#         "x": 1,
#         "y": 2,
#         "type": "blueChair",
#         "zone": 1,
#         "id": 1,
#         "time" : "2023-09-08 13:20:05"
#     },
#     {
#         "status": "free",
#         "x": 2,
#         "y": 2,
#         "type": "redChair",
#         "zone": 1,
#         "id": 2,
#         "time" : "2023-09-08 13:20:02"
#     }
# ]
@app.route("/add_chairs", methods=["POST"])
def add_chairs():
    # init variables
    cursor = mysql.connection.cursor()
    user_input = request.json

    # insert chair into database for each chair passed by user.
    for i in range(len(user_input)):
        chair_id = user_input[i]["id"]
        date = user_input[i]["time"]
        cursor.execute("SELECT * FROM chairs WHERE id = %s", [chair_id])
        found_chairs = cursor.fetchall()

        if (len(found_chairs) > 0):
            # delete old position in db of the current chair if the newest addition is newer.
            # since we always delete the old entry, there will always be 1 row returned in this case.
            if(found_chairs[0][6] < datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")):
                cursor.execute("DELETE FROM chairs WHERE id = %s", [chair_id])
                mysql.connection.commit()
            else:
                print("Most recently added chair location is outdated. Skipping.")
                continue

        x = user_input[i]["x"]
        y = user_input[i]["y"]
        status = user_input[i]["status"]
        chair_type = user_input[i]["type"]
        zone = user_input[i]["zone"]

        # add new values to database.
        cursor.execute("INSERT INTO chairs (status, x, y, type, zone, id, date) VALUES (%s, %s, %s, %s, %s, %s, %s)", [status, x, y, chair_type, zone, chair_id, date])
    mysql.connection.commit()
    cursor.close()

    return "Successfully added chairs to database."

@app.route("/get_chairs", methods=["GET"])
def get_chairs():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM chairs")
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)

# Format below:
# {
#   "zone":1
# }
@app.route("/get_chair_by_zone", methods=["POST"])
def get_chair_by_zone():
    #init variables
    cursor = mysql.connection.cursor()
    user_input = request.json
    zone = user_input["zone"]

    cursor.execute("SELECT * FROM chairs WHERE zone = %s", [zone])
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)
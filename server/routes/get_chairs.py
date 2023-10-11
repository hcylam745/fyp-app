import logging

from flask import request, jsonify

from routes import app

from db_config import connect

conn = connect.get_connection()

@app.route("/get_chairs", methods=["GET"])
def get_chairs():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM fyp_db.chairs")
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
    cursor = conn.cursor()
    user_input = request.json

    logging.info("Trying to get chair by zone, user input is: {}".format(user_input))

    zone = user_input["zone"]

    cursor.execute("SELECT * FROM fyp_db.chairs WHERE zone = %s", [zone])
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)
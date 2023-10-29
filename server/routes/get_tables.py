import logging

from flask import request, jsonify

from routes import app

from db_config import connect

conn = connect.get_connection()

@app.route("/get_tables", methods=["GET"])
def get_tables():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM fyp_db.tables")
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)

# Format below:
# {
#   "zone":1
# }
@app.route("/get_table_by_zone", methods=["POST"])
def get_table_by_zone():
    #init variables
    cursor = conn.cursor()
    user_input = request.json

    logging.info("Trying to get table by zone, user input is: {}".format(user_input))

    zone = user_input["zone"]

    cursor.execute("SELECT * FROM fyp_db.tables WHERE zone = %s", [zone])
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)
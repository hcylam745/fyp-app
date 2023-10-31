import logging

from flask import request

from routes import app

from db_config import connect

import datetime

conn = connect.get_connection()

@app.route("/delete_chairs", methods=["POST"])
def delete_chairs():
    # init variables
    cursor = conn.cursor()
    user_input = request.json
    logging.info("Trying to delete {} from database.".format(user_input))

    # insert chair into database for each chair passed by user.
    for i in range(len(user_input)):
        chair_id = user_input[i]["id"]
        cursor.execute("DELETE FROM fyp_db.chairs WHERE id = %s", [chair_id])
        cursor.close()

    return "Successfully deleted chairs from database."
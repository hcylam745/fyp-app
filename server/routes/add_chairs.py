import logging

from flask import request

from routes import app

from db_config import connect

import datetime

conn = connect.get_connection()

@app.route("/add_chairs", methods=["POST"])
def add_chairs():
    # init variables
    skipped = False
    cursor = conn.cursor()
    user_input = request.json
    logging.info("Trying to add {} to database.".format(user_input))
    

    # insert chair into database for each chair passed by user.
    for i in range(len(user_input)):
        chair_id = user_input[i]["id"]
        date = user_input[i]["time"]
        cursor.execute("SELECT * FROM fyp_db.chairs WHERE id = %s", [chair_id])
        found_chairs = cursor.fetchall()
        old_status = ""

        if (len(found_chairs) > 0):
            # delete old position in db of the current chair if the newest addition is newer.
            # since we always delete the old entry, there will always be 1 row returned in this case.

            # also store the old status to persist the status in the case that we are persisting due to a lack of detection.
            old_status = found_chairs[0][0]

            if(found_chairs[0][6] < datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")):
                cursor.execute("DELETE FROM fyp_db.chairs WHERE id = %s", [chair_id])
            else:
                print("Most recently added chair location is outdated. Skipping.")
                skipped = True
                continue
        
        try:
            x = user_input[i]["x"]
        except:
            return "'x' missing."
        
        try:
            y = user_input[i]["y"]
        except:
            return "'y' missing."
        
        try:
            status = user_input[i]["status"]
        except:
            return "'status' missing."
        
        try:
            chair_type = user_input[i]["type"]
        except:
            return "'type' missing."

        try:
            zone = user_input[i]["zone"]
        except:
            return "'zone' missing."

        if status != "None":

            # add new values to database.
            cursor.execute("INSERT INTO fyp_db.chairs (status, x, y, type, zone, id, date) VALUES (%s, %s, %s, %s, %s, %s, TO_TIMESTAMP(%s,'YYYY-MM-DD HH24:MI:SS'))", [status, x, y, chair_type, zone, chair_id, date])
        else:
            cursor.execute("INSERT INTO fyp_db.chairs (status, x, y, type, zone, id, date) VALUES (%s, %s, %s, %s, %s, %s, TO_TIMESTAMP(%s,'YYYY-MM-DD HH24:MI:SS'))", [old_status, x, y, chair_type, zone, chair_id, date])

    cursor.close()

    message = "Successfully added chairs to the database."

    if skipped:
        message += " Several added chairs were skipped because their timestamps were outdated."

    return message
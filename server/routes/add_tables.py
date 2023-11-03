import logging

from flask import request

from routes import app

from db_config import connect

import datetime

conn = connect.get_connection()

@app.route("/add_tables", methods=["POST"])
def add_tables():
    # init variables
    skipped = False
    cursor = conn.cursor()
    user_input = request.json
    logging.info("Trying to add {} to database.".format(user_input))

    # insert chair into database for each chair passed by user.
    for i in range(len(user_input)):
        table_id = user_input[i]["id"]
        date = user_input[i]["time"]
        cursor.execute("SELECT * FROM fyp_db.tables WHERE id = %s", [table_id])
        found_tables = cursor.fetchall()

        if (len(found_tables) > 0):
            # delete old position in db of the current table if the newest addition is newer.
            # since we always delete the old entry, there will always be 1 row returned in this case.
            if(found_tables[0][5] < datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")):
                cursor.execute("DELETE FROM fyp_db.tables WHERE id = %s", [table_id])
            else:
                print("Most recently added table information is outdated. Skipping.")
                skipped = True
                continue

        x = user_input[i]["x"]
        y = user_input[i]["y"]
        table_type = user_input[i]["type"]
        zone = user_input[i]["zone"]
        size_x = user_input[i]["size_x"]
        size_y = user_input[i]["size_y"]

        # add new values to database.
        cursor.execute("INSERT INTO fyp_db.tables (x, y, type, zone, id, date, size_x, size_y) VALUES (%s, %s, %s, %s, %s, TO_TIMESTAMP(%s,'YYYY-MM-DD HH24:MI:SS'), %s, %s)", [x, y, table_type, zone, table_id, date, size_x, size_y])
    cursor.close()

    message = "Successfully added tables to the database."

    if skipped:
        message += " Several added tables were skipped because their timestamps were outdated."

    return message
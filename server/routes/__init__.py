from flask import Flask

app = Flask(__name__)
import routes.add_chairs
import routes.get_chairs
import routes.delete_chairs
import db_config.table_setup
import routes.add_tables
import routes.get_tables
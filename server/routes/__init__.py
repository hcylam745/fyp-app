from flask import Flask

app = Flask(__name__)
import routes.add_chairs
import routes.get_chairs
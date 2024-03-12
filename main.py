from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# --- Definições do App 
app = Flask(__name__)

# - Import Routes 
from routes import (
    toDo, # C.R.U.D toDo conectado com UI React.js
)
 

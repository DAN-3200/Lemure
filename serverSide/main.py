"""
    Esta aplicação Flask atuará como API RESTful, usando as rotas como endpoints
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# flask_restx [api]

# --- Definições do App 
app = Flask(__name__)
CORS(app, supports_credentials=True) # Isto permiti a solicitação entre apps de domínios diferentes 

# - Import Routes 
from routes import (
    toDo, # C.R.U.D toDo por intermédio de requisições HTTP
)
 

"""
    Esta aplicação Flask atuará como API RESTful, usando as rotas como endpoints
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restx import Api, Namespace

# --- Definições do App 
app = Flask(__name__)
api = Api(app)
CORS(app, supports_credentials=True) # Isto permiti a solicitação entre apps de domínios diferentes 

ns = Namespace('flask')
api.add_namespace(ns)

# - Import Routes 
from routes import (
    toDo, # C.R.U.D toDo por intermédio de requisições HTTP
)
 

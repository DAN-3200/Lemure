"""
    Esta aplicação Flask atuará como API RESTful, usando as rotas como endpoints
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restx import Api, Namespace, Resource

# --- Definições do App 
app = Flask(__name__)
api = Api(app, title='Py Smart-API', description='Simples API flask')
CORS(app, supports_credentials=True) # Isto permiti a solicitação entre apps de domínios diferentes 

"""
@api.route('') - estabelece o namespace padrão da API
    @api.route('/default')
    class base(Resource):
        def get():
            return 'Padrão da API'
"""

# - Import Routes 
from routes import (
    toDo, # C.R.U.D toDo por intermédio de requisições HTTP
)
 

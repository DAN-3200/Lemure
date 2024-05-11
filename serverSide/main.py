# !Esta aplicação Flask atuará como API RESTful, usando as rotas como endpoints
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restx import Api
# flask_JWT - segurança no intercâmbio de dados (ajuda também na autenticação de sessão do User)
# flask_migrate - versionamento do banco
# Talvez eu aplique PANDAS aqui

# - Definições do App
app = Flask(__name__)
CORS(app, supports_credentials=True) # Isto permiti a solicitação entre apps de domínios diferentes 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db' # Conexão com banco SQLite
app.app_context().push() # !analisar

app.config['SECRET_KEY'] = 'ab44d789595b66efeda6b633e686a9db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# - RestX
api = Api(app, title='Py Smart-API', description='Um simples API em flask')

# - DataBase
db = SQLAlchemy(app)

# - Import Routes
from routes import (
    toDo, # C.R.U.D toDo por intermédio de requisições HTTP
)
 

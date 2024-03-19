from flask import (
    jsonify, # formatar em JSON
    make_response, # formartar uma respostar HTTP
    request, # pegar dados que são passados pela rotas HTTP
)
from flask_restx import ( # Suporte para criação de APIs RESTful
    Resource,
    fields,
    Namespace
)
from main import ( 
    app, # raiz da aplicação
    api,
    ns
)
import random

# --- C.R.U.D 
banco = [{'title':'backEnd', 'content': 'backEnd'}]

@ns.route('/pop', methods=['GET'])
class test(Resource):
    def get(self):
        return banco

@app.route('/create', methods=['POST'])
def Create():
    data = request.get_json() # pegar os dados JSON que são passados pela rota
    banco.append(data)
    
    return make_response(jsonify(data), 200) 
    # make_response - formula uma resposta com status 
    # jsonify - formata os dados em JSON para poder ser enviado

@app.route('/read', methods=['GET'])
def Read():
    return make_response(jsonify(banco), 200)

@app.route('/update', methods=['PUT'])
def Update():
    return 1

@app.route('/delete', methods=['DELETE'])
def Delete():
    return 1

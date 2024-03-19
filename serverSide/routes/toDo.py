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
    api, # raiz da API RESTful
)
import random

ns = Namespace('toDo', description='CRUD')
api.add_namespace(ns)

# --- C.R.U.D 
banco = [{'title':'restx', 'content': 'restx'}]

@ns.route('/cards')
class test(Resource):
    # @api.expect('') - estabelece um modelo de entradada
    # @api.marshal_with('') - estabelece um modelo de retorno
    def get(self):
        return banco
    
    def post(self):
        print(ns.payload)
        return 'post'
    
    def put(self):
        return 'put'
    
    def delete(self):
        return 'delete'


@app.route('/create', methods=['POST'])
def Create():
    data = request.get_json() # pegar os dados JSON que são passados pela rota
    banco.append(data)
    
    return make_response(jsonify(data), 200) 
    # make_response - formula uma resposta com status 
    # jsonify - formata os dados em JSON para poder ser enviado

    return 1

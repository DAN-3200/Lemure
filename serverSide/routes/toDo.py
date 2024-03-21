from flask import (
    jsonify, # formatar em JSON
)
from flask_restx import ( # Suporte para criação de APIs RESTful
    Resource,
    fields,
    Namespace
)
from main import ( 
    api, # raiz da API RESTful
)
import random
# -- Sistema C.R.U.D
ns = Namespace('toDo', description='CRUD')
api.add_namespace(ns)

banco = [{'id': 1,'title':'restx', 'content': 'restx'}]

modelCard = api.model('card',{
    'id' : fields.Integer(description='Identificação'),
    'title' : fields.String(description='Título'),
    'content' : fields.String(description='Conteúdo')
})

@ns.route('/cards')
class test(Resource):
    #@api.expect('') - estabelece um modelo de entradada
    #@api.marshal_with('') - estabelece um modelo de retorno
    idCount = 1

    def get(self):
        return banco
    
    @ns.expect(modelCard)
    def post(self):
        print("restx:",ns.payload)
        data = ns.payload # pegar os dados JSON que são passados pela rota
        banco.append(data)

        return jsonify(data)
    
    def put(self):
        return 'put'
    
    def delete(self):
        return 'delete'

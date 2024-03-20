from flask import (
    jsonify, # formatar em JSON
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

modelBank = api.model('Banco',{
    'title' : fields.String(description='Título'),
    'content' : fields.String(description='Conteúdo')
})

modelCard = api.model('card',{
    'title' : fields.String(description='Título'),
    'content' : fields.String(description='Conteúdo')
})

@ns.route('/cards')
class test(Resource):
    #@api.expect('') - estabelece um modelo de entradada
    #@api.marshal_with('') - estabelece um modelo de retorno

    @ns.marshal_with(modelBank)
    def get(self):
        return banco
    
    @ns.expect(modelBank)
    def post(self):
        print("restx:",ns.payload)
        data = ns.payload # pegar os dados JSON que são passados pela rota
        banco.append(data)

        return jsonify(data)
    
    def put(self):
        return 'put'
    
    def delete(self):
        return 'delete'

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

# -- Api.Model
modelCard = api.model('card',{
    'title' : fields.String(description='Título'),
    'content' : fields.String(description='Conteúdo')
})
		
# -- Rotas
banco = []
count = 0

def created(array):
    global count
    count += 1
    array['id'] = count
    banco.append(array)
    return array
def updated(id, array):
    for item in banco:
        if item['id'] == id:
            item.update(array)
def deleted(id):
    for item in banco:
        if item['id'] == id:
            # item.pop('id') remove algo específico
            banco.remove(item)

@ns.route('/cards')
class systemOne(Resource):
    #@api.expect('') - estabelece um modelo de entradada
    #@api.marshal_with('') - estabelece um modelo de retorno

    def get(self):
        return banco
    
    @ns.expect(modelCard)
    def post(self):
        return created(ns.payload)
 
@ns.route('/cards/<int:id>')
class systemTwo(Resource):	
    @ns.expect(modelCard)
    def put(self, id):
        updated(id, ns.payload)
        return f'put {id}', 
    
    def delete(self, id):
        deleted(id)
        return f'delete {id}'
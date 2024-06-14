from flask import (
    jsonify, # formatar em JSON
)
from flask_restx import ( # Suporte para criação de APIs RESTful
    Resource,   
    Namespace
)
from main import ( 
    api, # raiz da API RESTful
    db, # DataBase
)
from models.requestModel import (modelCard)
from models.dbModel import (cards)
import datetime

# -- Sistema C.R.U.D
ns = Namespace('toDo', description='CRUD')
api.add_namespace(ns)

# -- Rotas

def created(array):
    newCard = cards(array['title'], array['content'], array['favorited'])
    print("S", array['favorited'])
    db.session.add(newCard)
    db.session.commit()

    return {
        'id': newCard.id,
        'title' : newCard.title,
        'content': newCard.content,
        'date': newCard.date.strftime('%Y-%m-%d'),
        'favorited': newCard.favorited,
        'validity': newCard.date.strftime("%Y-%m-%d"),
    }

def readed():
    # compreensão de lista -> [expressão for item in lista]
    return [{
        'id': card.id,
        'title': card.title,
        'content': card.content,
        'date': card.date.strftime("%Y-%m-%d"),
        'favorited': card.favorited,
        'validity': card.validity.strftime("%Y-%m-%d"),
    } for card in cards.query.all()]

def updated(id, array):
    print("input: ", array['validity'])
    setCard = cards.query.get(id)
    setCard.title = array['title']
    setCard.content = array['content']
    setCard.favorited = array['favorited']
    setCard.validity = datetime.datetime.strptime(array['validity'], '%Y-%m-%d')

    db.session.commit()

def deleted(id):
    trash = cards.query.get(id)

    db.session.delete(trash)
    db.session.commit()

# -------------------------------------------

@ns.route('/cards')
class systemOne(Resource):
    #@api.expect('') - estabelece um modelo de entradada
    #@api.marshal_with('') - estabelece um modelo de retorno

    def get(self):
        return readed()
    
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
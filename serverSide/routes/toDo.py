from flask import (
    jsonify, # formatar em JSON
    make_response, # formartar uma respostar HTTP
    request, # pegar dados que são passados pela rotas HTTP
)

from main import app
import random

# --- C.R.U.D 
banco = [{'title':'backEnd', 'content': 'bacnkEnd'}]

@app.route('/create', methods=['POST']) # rota a qual será passada os dados, ela terá a propriedade 'POST'
def Create():
    data = request.get_json() # pegar os dados JSON que são passados pela rota
    banco.append(data)
    # print(f"PyBanco {banco}")
    
    return make_response(jsonify(data), 200) 
    # make_response - formula uma resposta com status 
    # jsonify - formata array em JSON para poder ser enviado

@app.route('/', methods=['POST'])
@app.route('/read', methods=['GET'])
def Read():
    return make_response(jsonify(banco), 200)

@app.route('/update', methods=['GET', 'POST'])
def Update():
    return 1

@app.route('/delete', methods=['GET'])
def Delete():
    return 1

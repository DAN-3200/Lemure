from flask import (
    jsonify, # formatar em JSON
    make_response, # formartar uma respostar HTTP
    request, # pegar dados que são passados pela rotas HTTP
)

from main import app
import random

# --- C.R.U.D 
@app.route('/', methods=['POST'])
@app.route('/create', methods=['POST']) # rota a qual será passada os dados, ela terá a propriedade 'POST'
def create():
    data = request.get_json() # pegar os dados JSON que são passados pela rota

    print(f"data : {data} ")
    molde = {
        'title': "flask-API",
        'content' : random.randint(1,10)
    }
    
    return make_response(jsonify(molde), 200) 
    # make_response - formula uma resposta com status 
    # jsonify - formata array em JSON para poder ser enviado
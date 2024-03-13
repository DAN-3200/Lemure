from flask import (
    render_template, # Renderizar Página
    jsonify, # formatar em JSON
    make_response, # formartar uma respostar HTTP
)

from main import app

# --- C.R.U.D 
@app.route('/')
@app.route('/create', methods=['GET', 'POST'])
def create():
    return make_response(jsonify({ 'projeto' : 'Flask-React' }))
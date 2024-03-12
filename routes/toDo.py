from flask import (
    render_template, # Renderizar Página
    jsonify, # formatar em JSON
    make_response, # formartar uma respostar HTTP
)

from main import app

# --- C.R.U.D 
@app.route('/')
def main():
    return render_template('index.html')
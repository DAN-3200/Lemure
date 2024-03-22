from flask_restx import (
    fields,
)
from main import api

# -- Api.Model
modelCard = api.model('card',{
    'title' : fields.String(description='Título'),
    'content' : fields.String(description='Conteúdo')
})
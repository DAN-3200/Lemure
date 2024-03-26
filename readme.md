## Embasamento:
> [flask_restx](https://flask-restx.readthedocs.io/en/latest/example.html)

```python
# @api.route('') - estabelece o namespace padrão da API
@api.route('/default')
class base(Resource):
    def get():
        return 'Padrão da API'
```

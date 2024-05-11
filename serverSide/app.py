from main import app, db

if __name__ == '__main__':
    #db.drop_all()
    #db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
    # 'debug=True' - adapta a exibição a qualquer alteração feita no codigo em tempo real
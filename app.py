from flask import Flask, render_template
import os

app = Flask(__name__, 
            static_folder='.', 
            template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nosotras')
def nosotras():
    return render_template('nosotras.html')

@app.route('/servicio')
def servicio():
    return render_template('servicio.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/equipo')
def equipo():
    return render_template('equipo.html')

@app.route('/testimonios')
def testimonios():
    return render_template('testimonios.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

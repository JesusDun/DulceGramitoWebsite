import os
from flask import Flask, send_from_directory

# Inicializamos Flask. No definimos una carpeta 'static' o 'assets' 
# porque los recursos (css, img, lib) están sueltos en la raíz.
app = Flask(__name__, static_folder=None)

# Ruta principal que carga el index.html
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Ruta dinámica para cargar el resto de las páginas (.html) y recursos (.css, .jpg, .js)
@app.route('/<path:filename>')
def serve_files(filename):
    # Verifica si el archivo solicitado existe en el directorio
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    return "Página o archivo no encontrado", 404

if __name__ == '__main__':
    # Configuración del puerto para el despliegue en Render
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

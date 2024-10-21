import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from services.model_service import ModelService


app = Flask(__name__)
CORS(app)  # Erlaube CORS für alle Routen und Ursprünge

current_dir = os.path.dirname(os.path.abspath(__file__))
model_service = ModelService(current_dir)

@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello New World!'}), 200

# Neuer Test-Endpoint
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'This is a test endpoint test'}), 200


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    print("Received Request:")
    print("Files:", request.files)
    print("Blocked Classes:", request.form.get('blockedClasses'))
    
    if 'files' not in request.files:
        return jsonify({'error': 'No files part'}), 400

    files = request.files.getlist('files')
    if len(files) == 0:
        return jsonify({'error': 'No selected files'}), 400

    # Überprüfe, ob alle Dateien zulässig sind
    for file in files:
        if not allowed_file(file.filename):
            return jsonify({'error': f'File {file.filename} is not an allowed type'}), 400

    if len(files) == 0:
        return jsonify({'error': 'No selected files'}), 400

    blocked_classes = request.form.get('blockedClasses', '[]')
    blocked_classes = json.loads(blocked_classes)
    print(blocked_classes)

    predictions = []
    try:
        cumulative_probabilities, num_images = model_service.predict(files, blocked_classes)
        prediction_result = model_service.filter_predictions(cumulative_probabilities, blocked_classes)

        return jsonify({
            'message': 'Images received and processed successfully with predictions',
            'predictions': prediction_result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)


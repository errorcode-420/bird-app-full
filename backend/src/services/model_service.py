import os
import numpy as np
import tensorflow as tf
import pickle
from services.image_service import preprocess_image

class ModelService:
    def __init__(self, base_path):
        self.model_path = os.path.join(base_path, 'model', 'model.h5')
        self.labels_path = os.path.join(base_path, 'model', 'label_map.pkl')
        self.model = tf.keras.models.load_model(self.model_path)
        
        with open(self.labels_path, 'rb') as f:
            self.label_map = pickle.load(f)
        self.class_names = {v: k for k, v in self.label_map.items()}
        self.num_classes = len(self.class_names)

    def predict(self, files, blocked_classes):
        cumulative_probabilities = np.zeros(self.num_classes)
        num_images = 0

        for file in files:
            if file.content_type not in ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg']:
                continue

            image_bytes = file.read()
            preprocessed_image = preprocess_image(image_bytes, 224)

            prediction = self.model.predict(preprocessed_image)
            cumulative_probabilities += prediction[0]
            num_images += 1

        return cumulative_probabilities, num_images

    def filter_predictions(self, cumulative_probabilities, blocked_classes):
        # Logik zum Filtern der Vorhersagen
        blocked_indices = [i for i, class_name in enumerate(self.class_names.values()) if class_name in blocked_classes]
        filtered_probabilities = np.copy(cumulative_probabilities)
        filtered_probabilities[blocked_indices] = -1

        top_7_indices = np.argsort(filtered_probabilities)[-7:][::-1]
        top_7_probabilities = filtered_probabilities[top_7_indices]

        prediction_result = []
        for i in range(len(top_7_indices)):
            probability = top_7_probabilities[i]
            index = top_7_indices[i]
            predicted_class = self.class_names[index]
            prediction_result.append({'class': predicted_class, 'probability': float(probability)})
        
        return prediction_result

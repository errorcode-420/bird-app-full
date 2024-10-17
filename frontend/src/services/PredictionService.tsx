import apiService from "./ApiService";
import { Prediction } from "../types/Prediction";

class PredictionService {
    async predictImages(files: File[]): Promise<Prediction[]> {
        alert(23)
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        formData.append('blockedClasses', JSON.stringify(["111"]));

        const response = await apiService.post('predict', formData);

        // Überprüfe, ob das response-Objekt das erwartete Feld 'predictions' enthält
        if (response.predictions && Array.isArray(response.predictions)) {
            // Konvertiere jedes Element in das Prediction-Format
            const predictions: Prediction[] = response.predictions.map((p: any) => ({
                class: p.class,
                probability: parseFloat(p.probability) // Stelle sicher, dass probability eine Zahl ist
            }));

            return predictions;
        } else {
            throw new Error("Predictions not found in the response");
        }
    }
}

const predictionService = new PredictionService();
export default predictionService;

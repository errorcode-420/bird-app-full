import mockingBirdImage1 from "../assets/images/mockingBird1.jpg";
import {Prediction} from "../types/Prediction";

class PredictionService {



    async predictImages(files: File[]): Promise<any> {
        const mockPredictions = [
            {
                class: "american kestrel",
                probability: 0.55
            },
            {
                class: "african collared dove",
                probability: 0.25,
                color: "brown"
            },
            {
                class: "arctic redpoll",
                probability: 0.2,

            },
        ] as Prediction[];

        const predictions: Prediction[] = mockPredictions.map((p: any) => ({
            id: 0,
            class: p.class,
            probability: parseFloat(p.probability) // Stelle sicher, dass probability eine Zahl ist
        }));

        return new Promise((resolve) => {


            setTimeout(() => {
                resolve(predictions);
            }, 1000);
        });
    }
    
}

const predictionService = new PredictionService();
export default predictionService;








import { Info } from "../types/Info";
import {Prediction} from "../types/Prediction";
import {Result} from "../types/Result";


class ResultService {
    // Liefert die URL für das Bild basierend auf dem Klassennamen


    // Generiert den wissenschaftlichen Namen basierend auf dem Klassennamen
    getScientificName(className: string): string {
        // Beispiel: Umbenennung von Klassennamen in wissenschaftliche Namen (hier nur als Platzhalter)
        const scientificNames = {
            class1: 'Species scientificus',
            class2: 'Aves exampleus',
            // Füge weitere Klassennamen und wissenschaftliche Namen hinzu
        };

        return 'Unknown Species';//scientificNames[className] || 'Unknown Species';
    }

    // Generiert die Farbe basierend auf dem Klassennamen
    getColor(className: string): string {
        const colors = {
            class1: 'blue',
            class2: 'green',
            // Füge weitere Farben für verschiedene Klassen hinzu
        };

        return 'gray';//colors[className] || 'gray';
    }

    // Generiert den Kontinent basierend auf dem Klassennamen oder Vorhersagen
    getContinentId(className: string): number {
        const continentIds = {
            class1: 1, // Beispiel für Europa
            class2: 2, // Beispiel für Nordamerika
            // Füge weitere Kontinent-IDs hinzu
        };

        return 0 //continentIds[className] || 0;  // Rückfall auf eine Standard-ID (z. B. 0 für unbekannt)
    }

    // Diese Methode wandelt die Vorhersagen in das gewünschte Result-Format um
    async getResults(predictions: Prediction[]): Promise<Result[]> {
        const results: Result[] = await Promise.all(predictions.map(async (prediction) => {
            const className = prediction.class;

            return {
                class: className,
                probability: prediction.probability,
                id: Math.floor(Math.random() * 1000)
            };
        }));

        return results;
    }

}

const resultService = new ResultService();
export default resultService;

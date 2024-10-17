import { CollectionItem } from "../types/CollectionItem";

class CollectionService {
    
    // Diese Methode wandelt die Vorhersagen in das gewünschte Result-Format um
    async getCollectionMOCKED(): Promise<CollectionItem[]> {
        return [
            {
                id: 1,
                class: "red-breasted goose",
                results: [
                    {
                        id: 8,
                        class: "red-breasted goose",
                        probability: 0.2
                    },
                    {
                        id: 8,
                        class: "red-breasted goose",
                        probability: 0.2
                    },
                    {
                        id: 8,
                        class: "red-breasted goose",
                        probability: 0.2
                    },
                ]
            },
            
        ];
    }
}

const collectionService = new CollectionService();
export default collectionService;

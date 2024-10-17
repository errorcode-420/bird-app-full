import React, { createContext, useContext, useState, ReactNode } from 'react';
import predictionServiceMOCKED from "../services/PredictionServiceMOCKED";
import predictionService from "../services/PredictionService";
import resultDataService from "../services/ResultService";
import {Result} from "../types/Result";
import {Prediction} from "../types/Prediction";
import { Collection } from 'typescript';
import { CollectionItem } from '../types/CollectionItem';

// Definiere die Typen für das Ergebnisobjekt und den ResultContext

interface CollectionContextType {
    collection: CollectionItem[];
}

// Erstelle den Context
const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

// ResultProvider-Komponente, die den Context bereitstellt
export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [collection, setCollection] = useState<CollectionItem[]>([]);



    const addCollectionItem = () => {
        // setResults(prevResults => [...prevResults, result]);
    };

    const removeCollectionItem = () => {
        // setResults(prevResults => {
        //     const updatedResults = prevResults.filter(result => result.id !== id);
        //     // Update den aktuellen Index, wenn das letzte Ergebnis entfernt wird
        //     if (currentIndex >= updatedResults.length) {
        //         setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
        //     }
        //     return updatedResults;
        // });
    };


    // Funktion zum Abrufen der Ergebnisse durch den Service
    const fetchCollection = async (files: File[]) => {
        // setIsLoading(true);
        // try {
        //     const predictions = await predictionService.predictImages(files);
        //     const newResults = await resultDataService.getResultData(predictions);
        //     setResults(newResults);
        //     setCurrentIndex(0);
        //     setIsLoading(false);
        // } catch (error) {
        //     console.error('Failed to fetch results', error);
        //     setIsLoading(false);
        // }
    };


    const nextCollectionItem = () => {
        // if (currentIndex < results.length - 1) {
        //     setCurrentIndex(prevIndex => prevIndex + 1);
        // }
    };

    const prevCollectionItem = () => {
        // if (currentIndex > 0) {
        //     setCurrentIndex(prevIndex => prevIndex - 1);
        // }
    };



    return (
        <CollectionContext.Provider
            value={{
                collection}}>
            {children}
        </CollectionContext.Provider>
    );
};

// Custom Hook, um auf den ResultContext zuzugreifen
export const useResultContext = () => {
    const context = useContext(CollectionContext);
    if (context === undefined) {
        throw new Error('useResultContext must be used within a ResultProvider');
    }
    return context;
};

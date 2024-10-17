import React, { createContext, useContext, useState, ReactNode } from 'react';
import { config } from '../config';
import predictionServiceMOCKED from "../services/PredictionServiceMOCKED";
import predictionService from "../services/PredictionService";
import resultDataService from "../services/ResultService";
import {Result} from "../types/Result";
import {Prediction} from "../types/Prediction";

// Definiere die Typen für das Ergebnisobjekt und den ResultContext

interface ResultContextType {
    results: Result[];
    isLoading: boolean;
    currentIndex: number;
    currentResult: Result | undefined;
    addResult: (result: Result) => void;
    removeResult: (result: Result) => void;
    clearResults: () => void;
    fetchResults: (files: File[]) => Promise<void>;
    nextResult: () => void;
    prevResult: () => void;
    setCurrentIndex: (index: number) => void;
}

// Erstelle den Context
const ResultContext = createContext<ResultContextType | undefined>(undefined);

// ResultProvider-Komponente, die den Context bereitstellt
export const ResultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [results, setResults] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentResult = results[currentIndex];


    const addResult = (result: Result) => {
        setResults(prevResults => [...prevResults, result]);
    };

    const removeResult = (resultToRemove: Result) => {
        setResults(prevResults => {
            const updatedResults = prevResults.filter(result => result != resultToRemove);
            // Update den aktuellen Index, wenn das letzte Ergebnis entfernt wird
            if (currentIndex >= updatedResults.length) {
                setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
            }
            return updatedResults;
        });
    };

    // Funktion zum Löschen aller Ergebnisse
    const clearResults = () => {
        setResults([]);
        setCurrentIndex(0);
    };

    // Funktion zum Abrufen der Ergebnisse durch den Service
    const fetchResults = async (files: File[]) => {
        setIsLoading(true);
        try {

            ////deldev
            let predictions;
            if (config.useMockService){
                predictions = await predictionServiceMOCKED.predictImages(files);
            }
            else
            {
                predictions = await predictionService.predictImages(files);

            }
            ////deldev

            console.log("predictions")
            console.log(predictions)

            const newResults = await resultDataService.getResults(predictions);
            setResults(newResults);
            setCurrentIndex(0);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch results', error);
            setIsLoading(false);
        }
    };

    const nextResult = () => {
        if (currentIndex < results.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevResult = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const setCurrentIndexHandler = (index: number) => {
        if (index >= 0 && index < results.length) {
            setCurrentIndex(index);
        }
    };

    return (
        <ResultContext.Provider
            value={{
                results,
                isLoading,
                currentIndex,
                currentResult,
                addResult,
                removeResult,
                clearResults,
                fetchResults,
                nextResult,
                prevResult,
                setCurrentIndex: setCurrentIndexHandler}}>
            {children}
        </ResultContext.Provider>
    );
};

// Custom Hook, um auf den ResultContext zuzugreifen
export const useResultContext = () => {
    const context = useContext(ResultContext);
    if (context === undefined) {
        throw new Error('useResultContext must be used within a ResultProvider');
    }
    return context;
};

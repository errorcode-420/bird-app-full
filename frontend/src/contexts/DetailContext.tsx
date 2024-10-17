import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Info } from '../types/Info';
import infoService from '../services/InfoServiceMOCKED';
import imageService from '../services/ImageServiceMOCKED'

// Definiere die Typen für das Ergebnisobjekt und den ResultContext

interface DetailType {
    
    currentInfo: Info | undefined;
    getInfo: (className: string) => Promise<Info>; // Asynchroner Rückgabewert
    getImage: (className: string) => Promise<string>; // Asynchroner Rückgabewert
    getImages: (className: string) => Promise<string[]>; // Asynchroner Rückgabewert
}

// Erstelle den Context
const DetailContext = createContext<DetailType | undefined>(undefined);

// ResultProvider-Komponente, die den Context bereitstellt
export const DetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentInfo, setCurrentInfo] = useState<Info>();



    // Funktion zum Abrufen der Ergebnisse durch den Service
    const getInfo = async (className: string) => {

        return await infoService.getInfo(className);
    }

    const getImage = async (className: string) => {

        return await imageService.getImageSrc(className);;
    }

    const getImages = async (className: string) => {

        return await imageService.getImageSources(className);;
    }


    return (
        <DetailContext.Provider
            value={{
                currentInfo,
                getInfo,
                getImage,
                getImages}}>
            {children}
        </DetailContext.Provider>
    );
};


// Custom Hook, um auf den ResultContext zuzugreifen
export const useDetailContext = () => {
    const context = useContext(DetailContext);
    if (context === undefined) {
        throw new Error('useResultContext must be used within a ResultProvider');
    }
    return context;
};

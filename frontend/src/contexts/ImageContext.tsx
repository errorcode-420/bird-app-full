// contexts/ImageContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import imageService from '../services/ImageServiceMOCKED'; // Sicherstellen, dass der Pfad korrekt ist
import { Image } from '../types/Image'; // Importiere die Typdefinition
import { useResultContext } from './ResultContext';

interface ImageContextType {
    images: Image[];
    loading: boolean;
    selectedImage: Image | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<Image | null>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentResult } = useResultContext();

    const [images, setImages] = useState<Image[]>([]); // Typisiere den Zustand
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const className = currentResult?.class +""; // Ersetze dies durch den gewünschten Klassennamen

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data: Image[] = await imageService.fetchImages(className); // Typisiere die Antwort
                console.log("loadImages")
                setImages(data); // Hier sollte der Fehler behoben sein
            } catch (error) {
                console.error('Fehler beim Laden der Bilder:', error);
            } finally {
                setLoading(false);
            }
        };
        loadImages();
    }, [className]);

    return (
        <ImageContext.Provider value={{ images, loading, selectedImage, setSelectedImage }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImageContext must be used within an ImageProvider');
    }
    return context;
};

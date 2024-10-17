import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definiere die Typen für den FileContext
interface FileContextType {
    files: File[];
    addFiles: (file: File[]) => void;
    removeFile: (file?: File) => void;
    clearFiles: () => void;
}

// Erstelle den Context
const FileContext = createContext<FileContextType | undefined>(undefined);

// FileProvider-Komponente, die den Context bereitstellt
export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<File[]>([]);
 

    const addFiles = (newFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const removeFile = (file?: File) => {
        setFiles(prevFiles => prevFiles.filter(f => f !== file));
    };

    const clearFiles = () => {
        setFiles([]);
        sessionStorage.removeItem('files');
    };

    return (
        <FileContext.Provider value={{ files, addFiles, removeFile, clearFiles }}>
            {children}
        </FileContext.Provider>
    );
};

// Custom Hook, um auf den FileContext zuzugreifen
export const useFileContext = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};

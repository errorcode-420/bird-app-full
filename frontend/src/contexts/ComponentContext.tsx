// ComponentContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface ComponentContextType {
    currentComponent: null | "example-images" | "info-card";
    setCurrentComponent: React.Dispatch<React.SetStateAction<null | "example-images" | "info-card">>;
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentComponent, setCurrentComponent] = useState<null | "example-images" | "info-card">(null);

    return (
        <ComponentContext.Provider value={{ currentComponent, setCurrentComponent }}>
            {children}
        </ComponentContext.Provider>
    );
};

export const useComponentContext = () => {
    const context = useContext(ComponentContext);
    if (!context) {
        throw new Error("useComponentContext must be used within a ComponentProvider");
    }
    return context;
};

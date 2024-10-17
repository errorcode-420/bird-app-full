import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definiere die Typen für den AuthContext
interface AuthContextType {
    id: number;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// Erstelle den Context mit dem definierten Typ
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider-Komponente, die den Context bereitstellt
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [id, setId] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ id, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook, um auf den AuthContext zuzugreifen
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

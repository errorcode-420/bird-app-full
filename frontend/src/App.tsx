import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import styles from './App.module.scss';
import {FileProvider} from "./contexts/FileContext";
import {ResultProvider} from "./contexts/ResultContext"; // Importiere die SCSS-Datei für Stile
import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';
import { CollectionProvider } from './contexts/CollectionContext';
import { DetailProvider } from './contexts/DetailContext';
import { ComponentProvider } from './contexts/ComponentContext';
import AppContainer from './components/AppContainer/AppContainer';
import { ImageProvider } from './contexts/ImageContext';

const App = () => {
    return (
        <div>
            <AuthProvider>
            <CollectionProvider>
            <PopupProvider>
            <ComponentProvider>
            <DetailProvider>
            <FileProvider>
            <ResultProvider>
            <ImageProvider>
                <AppContainer/>
            </ImageProvider>
            </ResultProvider>
            </FileProvider>
            </DetailProvider>
            </ComponentProvider>
            </PopupProvider>
            </CollectionProvider>
            </AuthProvider>

        </div>
    );
};

export default App;

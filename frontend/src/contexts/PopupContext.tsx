// context/PopupContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';

const PopupContext = createContext<any>(null);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [popupComponent, setPopupComponent] = useState<ReactNode | null>(null);

    const openPopup = (component: ReactNode) => {
        setPopupComponent(component);
    };

    const closePopup = () => {
        setPopupComponent(null);
    };

    return (
        <PopupContext.Provider value={{ openPopup, closePopup }}>
            {children}
            {popupComponent && ReactDOM.createPortal(
                <div>{popupComponent}</div>,
                document.body
            )}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);

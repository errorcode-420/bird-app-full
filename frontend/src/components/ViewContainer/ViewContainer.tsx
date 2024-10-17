import React from 'react';
import styles from './ViewContainer.module.scss';

interface ViewContainerProps {
    src?: string;
    onClose?: () => void; // Optionale Callback-Funktion
}

const ViewContainer: React.FC<ViewContainerProps> = ({ src, onClose }) => {
    // Wenn onClose nicht definiert ist, wird die Funktion hier leer gesetzt
    const closeViewContainer = () => {
        if (onClose) {
            onClose(); // Aufruf der Callback-Funktion, wenn diese vorhanden ist
        }
    };

    return (
        <div className={styles.viewContainer} onClick={closeViewContainer}>
            <img src={src} alt="Vergrößertes Bild" className={styles.lightboxImage} />
        </div>
    );
};

export default ViewContainer;

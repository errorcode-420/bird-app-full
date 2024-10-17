import React from 'react';
import styles from './ResultContainer.module.scss';
import mockImg from  '../../assets/images/testing/african collared dove/1.jpg';
import ActionButtonGroup from '../Buttons/ActionButtonGroup/ActionButtonGroup';

// Importiere SVGs als URLs

interface ResultContainerProps {
    src?: string;
    onCheck?: () => void; // Optionale Callback-Funktionen
    onInspect?: () => void; // Optionaler Callback für den Inspect-Button
    onRemove?: () => void;
}

const ResultContainer: React.FC<ResultContainerProps> = ({ src, onRemove, onInspect, onCheck }) => {
    return (
        <div className={styles.resultContainer}>
            <img src={src || mockImg} alt="Großes Bild" className={styles.image}/>
            <ActionButtonGroup onCheck={onCheck} onInspect={onInspect} onRemove={onRemove}></ActionButtonGroup>
        </div>
    );
};

export default ResultContainer;

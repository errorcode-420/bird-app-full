import React from 'react';
import styles from './ActionButton.module.scss';
import classNames from 'classnames'; // Optional, wenn du classnames verwenden möchtest

interface ActionButtonProps {
    label: string;
    svgIcon: string; // SVG-Symbol als URL oder Pfad
    color: string; // Hintergrundfarbe des Buttons
    invert?: boolean; // Gibt an, ob das SVG invertiert werden soll
    onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, svgIcon, color, invert=false }) => {
    return (
        <button
            className={classNames(styles.actionButton, { [styles.invert]: invert })} // Bedingte Klasse
            onClick={onClick}
            style={{ backgroundColor: color }}>
            <img src={svgIcon} alt={label} className={styles.icon} />
        </button>
    );
};

export default ActionButton;

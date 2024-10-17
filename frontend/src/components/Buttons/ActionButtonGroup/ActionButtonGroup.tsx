import React from 'react';
import styles from './ActionButtonGroup.module.scss';
import checkIcon from '../../../assets/icons/check.svg';
import inspectIcon from '../../../assets/icons/inspect.svg';
import removeIcon from '../../../assets/icons/remove.svg';
import infoIcon from '../../../assets/icons/info.svg';
import ActionButton from './ActionButton/ActionButton';


interface ButtonGroupProps {
    onCheck?: () => void;
    onInspect?: () => void;
    onRemove?: () => void;
}

const ActionButtonGroup: React.FC<ButtonGroupProps> = ({ onCheck, onInspect, onRemove }) => {
    return (
        <div className={styles.actionButtonGroup}>
            {onCheck && (
                <ActionButton 
                    label="Check" 
                    onClick={onCheck} 
                    svgIcon={checkIcon} 
                    invert={true}
                    color="#28a745" // Beispielhafte Farbe
                />
            )}
            {onInspect && (
                <ActionButton 
                    label="Inspect" 
                    onClick={onInspect} 
                    svgIcon={infoIcon} 
                    color="#ffc107" // Beispielhafte Farbe
                />
            )}
            {onRemove && (
                <ActionButton 
                    label="Remove" 
                    onClick={onRemove} 
                    svgIcon={removeIcon} 
                    invert={true}
                    color="#dc3545" // Beispielhafte Farbe
                />
            )}
        </div>
    );
};

export default ActionButtonGroup;

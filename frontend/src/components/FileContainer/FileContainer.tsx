import React from "react";
import styles from "./FileContainer.module.scss";
import ActionButtonGroup from "../Buttons/ActionButtonGroup/ActionButtonGroup";
import placeholderImage from "../../assets/images/bird-silhouette.png";

interface FileContainerProps {
    src?: string;
    onCheck?: () => void; // Optionale Callback-Funktionen
    onInspect?: () => void; // Optionaler Callback für den Inspect-Button
    onRemove?: () => void;
}

const FileContainer: React.FC<FileContainerProps> = ({ onRemove, src=placeholderImage }) => {
    return (
        <div className={styles.fileContainer}>
            <img 
                src={src} 
                alt={"File"} 
                className={styles.image}/>
            {onRemove && <ActionButtonGroup onRemove={onRemove}></ActionButtonGroup>}

        </div>
    );
};

export default FileContainer;

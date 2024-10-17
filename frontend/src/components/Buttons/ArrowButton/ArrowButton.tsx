import React from 'react';
import styles from './ArrowButton.module.scss';
import ArrowLeftUrl from "../../../assets/icons/arrowLeft.svg";
import ArrowRightUrl from "../../../assets/icons/arrowRight.svg";

interface ArrowButtonProps {
    direction: string;
    isDisabled: boolean;
    onClick: () => void;
}
const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, isDisabled, onClick}) => {

    return (
        <button className={styles.arrowButton} onClick={onClick} disabled={isDisabled}>
            <img src={direction === "left" ? ArrowLeftUrl : ArrowRightUrl} alt="Arrow"/>
        </button>
    );
};

export default ArrowButton;

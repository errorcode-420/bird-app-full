import React, { useEffect, useState } from 'react';
import styles from './ResultPreview.module.scss'; // Importiere die SCSS-Datei

import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../../contexts/FileContext';
import { useResultContext } from '../../contexts/ResultContext';
import { useComponentContext } from '../../contexts/ComponentContext';
import { useDetailContext } from '../../contexts/DetailContext';
import ArrowButton from '../Buttons/ArrowButton/ArrowButton';
import Spinner from '../Spinner/Spinner';
import ResultContainer from '../ResultContainer/ResultContainer';
const ResultPreview: React.FC = () => {

  const navigate = useNavigate();
  const { files } = useFileContext();
  const { results, isLoading, currentResult, currentIndex, nextResult, prevResult, removeResult, fetchResults } = useResultContext();
  const { setCurrentComponent } = useComponentContext();
  const { getInfo, getImage } = useDetailContext();
  const [infoText, setInfoText] = useState<string | undefined>("");
  const [imageSrc, setImageSrc] = useState<string | undefined>("");

  const showContainer = imageSrc && !isLoading;
  const showSpinner = isLoading && !showContainer;
  const showText = !isLoading && !imageSrc;

  const showArrowButtons = results.length > 0 && showContainer;
  const disablePrevious = currentIndex == 0;
  const disableNext = currentIndex == results.length - 1;

  // Abrufen der Bild-URL bei Änderung des aktuellen Ergebnisses
  useEffect(() => {
      const fetchImageUrl = async () => {
          if (currentResult) {
              const imageInfo = await getInfo(currentResult.class);
              const imageSrc = await getImage(currentResult.class);
              setInfoText(imageInfo.text);
              setImageSrc(imageSrc);
          } else {
              setImageSrc(""); // Leerer Zustand, wenn kein currentResult vorhanden ist
          }
      };
      fetchImageUrl();
  }, [currentResult]);

  const handleCheck = () => {
      if (currentResult) {
      }
  };

  const handleInspect = () => {
      if (currentResult) {
        navigate("/info")
    }
  };

  const handleRemove = () => {
      if (currentResult) {
        removeResult(currentResult); // Beispielhaft, ändere dies je nach Logik
      }
  };




  return (
      <div className={styles.resultPreview}>

        {showArrowButtons && <ArrowButton direction='left' onClick={prevResult} isDisabled={disablePrevious}></ArrowButton>}
        {showSpinner && (
            <div className={styles.spinnerWrapper}>
                <p>loading...</p>
                <Spinner />
            </div>
        )}
        {showText && <p>{(files.length > 0 && "Start Prediction") || "Please select images of the bird you want to identify"}</p>}
        {showContainer && 
          <ResultContainer
            src={imageSrc} // Verwende hier den abgerufenen `imageSrc`-Wert
            onCheck={handleCheck}
            onInspect={handleInspect}
            onRemove={handleRemove}/>
        }
        {showArrowButtons && <ArrowButton direction='right' onClick={nextResult} isDisabled={disableNext}></ArrowButton>
      }

      </div>
    );
};

export default ResultPreview;







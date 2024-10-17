import React, { useEffect, useState } from 'react';
import styles from './FilesPreview.module.scss'; // Importiere die SCSS-Datei
import ArrowButton from '../Buttons/ArrowButton/ArrowButton';
import { useFileContext } from '../../contexts/FileContext';
import FileContainer from '../FileContainer/FileContainer';

const images = [
  'https://via.placeholder.com/300x200', // Bild 1
  'https://via.placeholder.com/300x200', // Bild 2
  'https://via.placeholder.com/300x200', // Bild 3
  'https://via.placeholder.com/300x200', // Bild 4
];


const FilesPreview: React.FC = () => {
  const [maxVisible, setMaxVisible] = useState(getMaxVisible());

  const { files, removeFile } = useFileContext();
  const [currentIndex, setCurrentIndex] = useState(0);


  const filesCount = files.length;
  const placeholderCount = Math.max(0,(maxVisible - filesCount));
  const startIndex = Math.max(0, Math.min(currentIndex, filesCount - maxVisible));

  const renderedFiles = files.slice(startIndex, startIndex + maxVisible);

  const showArrowButtons = filesCount > 0;
  const disablePrevious = currentIndex == 0 || filesCount <= maxVisible;
  const disableNext = currentIndex == filesCount-maxVisible || filesCount <= maxVisible;


  const handleRemove = (file: File) => () => {
      if (file) {
          removeFile(file);
      }
  };


  const nextFile = () => {
      if (currentIndex + maxVisible < filesCount) {
          setCurrentIndex(prevIndex => prevIndex + 1);
      }
  };

  const prevFile = () => {
      if (currentIndex > 0) {
          setCurrentIndex(prevIndex => prevIndex - 1);
      }
  };

  function getMaxVisible() {
    const width = window.innerWidth;
    if (width > 1024) {
      return 4; // Für sehr große Bildschirme
    } else if (width > 768) {
      return 3; // Für große Bildschirme
    } else if (width > 480) {
      return 2; // Für Tablets
    } else {
      return 1; // Für Mobilgeräte
    }
  }
  
  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(getMaxVisible());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
    return (
      <div className={styles.filesPreview}>

        <ArrowButton direction='left' onClick={prevFile} isDisabled={disablePrevious}></ArrowButton>

        <div className={styles.fileCollectionContainer}>
          {renderedFiles.map((file, index) => (
            <FileContainer 
              src={URL.createObjectURL(file)}
              onRemove={handleRemove(file)}/>
            ))}
            {Array.from({ length: placeholderCount }).map(() => (
              <FileContainer/>
            ))}
        </div>

        <ArrowButton direction='right' onClick={nextFile} isDisabled={disableNext}></ArrowButton>

    </div>
    );
};

export default FilesPreview;

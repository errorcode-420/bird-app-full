import React, { useRef } from "react";

import styles from "./IdentificationPage.module.scss";
import { ReactComponent as FolderIcon } from "../../assets/icons/folder.svg";
import { ReactComponent as BirdIcon } from "../../assets/icons/bird.svg";
import { ReactComponent as BirdIcon1 } from "../../assets/icons/bird1.svg";

import { ReactComponent as PredictIcon } from "../../assets/icons/predict.svg";
import { useComponentContext } from "../../contexts/ComponentContext";
import { useFileContext } from "../../contexts/FileContext";
import { useResultContext } from "../../contexts/ResultContext";
import ResultPreview from "../../components/ResultPreview/ResultPreview";
import FilesPreview from "../../components/FilesPreview/FilesPreview";


const IdentificationPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentComponent, setCurrentComponent } = useComponentContext();
  const { files, addFiles, clearFiles } = useFileContext();
  const { clearResults, fetchResults, isLoading } = useResultContext();
  const disableRight =
    (currentComponent == null && files.length == 0) || isLoading;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearFiles();
    addFiles(Array.from(event.target.files || []));
    clearResults();
  };
  

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handlePredict = () => {
    fetchResults(files);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Vogel Identifikation</h1>
      </header>

      <main className={styles.main}>
        <ResultPreview />
        <FilesPreview />
      </main>

      <footer className={styles.footer}>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.selectFilesButton}`}
            onClick={handleFileSelect}
          >
            <FolderIcon className={styles.icon} />
          </button>
          <button
            className={`${styles.button} ${styles.selectFilesButton} ${styles.predictButton}${
              disableRight ? styles.disabled : ""
            }`
          }
          onClick={handlePredict}
          disabled={disableRight}          >
            <BirdIcon1 className={styles.icon} />
          </button>
          
          {/* Datei-Input sollte korrekt das fileInputRef verwenden */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef} // Der Ref wird hier übergeben
            style={{ display: "none" }} // Datei-Input bleibt versteckt
          />
        </div>
      </footer>
    </div>
  );
};

export default IdentificationPage;

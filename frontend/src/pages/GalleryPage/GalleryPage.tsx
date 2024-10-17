import React, { useContext, useState } from 'react';
import styles from './GalleryPage.module.scss';
import { ReactComponent as BackIcon } from "../../assets/icons/close.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { useNavigate } from 'react-router-dom';
import ViewContainer from '../../components/ViewContainer/ViewContainer';
import { useDetailContext } from '../../contexts/DetailContext';
import { useImageContext } from '../../contexts/ImageContext';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null); // Zustand für die Lightbox
  const { getInfo, getImages } = useDetailContext();
  const { images, loading } = useImageContext();

  const toIdentification = () => {
    navigate("/identification");
  };

  const toInfo = () => {
    navigate("/info");
  };

  // Funktion zum Öffnen der Lightbox
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };

  // Funktion zum Schließen der Lightbox
  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Vogel Identifikation</h1>
      </header>

      <main className={styles.main}>
      <div className={styles.imageContainer}>
        {loading ? (
          <p>Lade Bilder...</p> // Zeige eine Ladeanzeige an, während die Bilder geladen werden
        ) : (
          images.map(image => (
            <img
              key={image.id} // Stelle sicher, dass jedes Bild einen einzigartigen Schlüssel hat
              src={image.url}
              alt={image.title}
              className={styles.image}
              onClick={() => openLightbox(image.url)} // Öffne die Lightbox mit der entsprechenden URL
            />
          ))
        )}
      </div>
    </main>
      <footer className={styles.footer}>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.backButton}`}
            onClick={toIdentification}
          >
            <BackIcon className={styles.icon} />
          </button>
          <button
            className={`${styles.button} ${styles.galleryButton}`}
            onClick={toInfo}
          >
            <InfoIcon className={styles.icon} />
          </button>
        </div>
      </footer>

      {lightboxImage && (<ViewContainer onClose={closeLightbox} src={lightboxImage}/>)}

    </div>
  );
};

export default GalleryPage;

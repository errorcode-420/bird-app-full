import styles from "./InfoPage.module.scss";
import { ReactComponent as BackIcon } from "../../assets/icons/close.svg";
import { ReactComponent as GalleryIcon } from "../../assets/icons/gallery.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ViewContainer from "../../components/ViewContainer/ViewContainer";
import { useImageContext } from "../../contexts/ImageContext";

const imageSrc = "https://via.placeholder.com/400";
const title = "Lorem Ipsum";

const paragraphs = [
  "This is the first paragraph providing some in-depth information about the topic. It goes into a bit more detail and explains the context in a broader sense, helping the reader understand the key points.",
  "The second paragraph delves further into the specifics, offering examples and more detailed insights into the matter at hand. It's designed to engage the reader with relevant information that ties into the first paragraph.",
  "In the final paragraph, we conclude the discussion by summarizing the main points. The reader is left with a clear understanding of the subject and may be encouraged to explore the topic further.",
];

const InfoPage = () => {
  const navigate = useNavigate(); // Verwende useNavigate, um Navigation zu ermöglichen
  const [lightboxImage, setLightboxImage] = useState<string | null>(null); // Zustand für die Lightbox
  const {images} = useImageContext();
  // Funktion zum Schließen der Lightbox
    // Funktion zum Öffnen der Lightbox
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };
  
  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const toIdentification = () => {
    navigate("/identification");
  };

  const toGallery = () => {
    navigate("/gallery");
  };
// Beispielbilder für die Galerie unter dem großen Bild
const galleryImages = [
  "https://via.placeholder.com/100",
  "https://via.placeholder.com/100",
  "https://via.placeholder.com/100",
  "https://via.placeholder.com/100",
];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Vogel Identifikation</h1>
      </header>

      <main className={styles.main}>
        {/* <img src={imageSrc} alt={title} className={styles.image} onClick={() => openLightbox(imageSrc)} /> */}
        <div className={styles.imageWrapper}>
          {/* Großes Bild */}
          <div className={styles.largeImageContainer}>
            <img
              src={images[0].url}//del durch url ersetzen
              alt={title}
              className={styles.image}
              onClick={() => openLightbox(images[0].url)}
            />
          </div>

          {/* Galerie-Bilder unter dem großen Bild */}
          <div className={styles.galleryContainer}>
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Gallery ${index + 1}`}
                  className={styles.galleryImage}
                  onClick={() => openLightbox(image.url)}//del ersetzen nur mit URL
                />
              ))
            }
            
          </div>
        </div>

        <div className={styles.textContainer}>
          <h2 className={styles.title}>{title}</h2>
          {paragraphs.map((para, index) => (
            <p key={index} className={styles.paragraph}>
              {para}
            </p>
          ))}
        </div>


        {lightboxImage && (<ViewContainer onClose={closeLightbox} src={lightboxImage}/>)}
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
              onClick={toGallery}
            >
              <GalleryIcon className={styles.icon} />
            </button>
          </div>
        </footer>
    </div>
  );
};

export default InfoPage;

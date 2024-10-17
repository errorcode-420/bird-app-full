import React from 'react';
import styles from './AppContainer.module.scss';

import { Navigate, Route, Routes } from 'react-router-dom';
import IdentificationPage from '../../pages/IdentificationPage/IdentificationPage';
import Menu from '../Menu/Menu';
import GalleryPage from '../../pages/GalleryPage/GalleryPage';
import InfoPage from '../../pages/InfoPage/InfoPage';


const AppContainer: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      {/* Menü oben */}
      <div className={styles.menuContainer}>
        <Menu />
      </div>

      {/* Der Inhalt der Seite */}
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/gallery" />} />
          <Route path="/identification" element={<IdentificationPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/gallery" element={<GalleryPage />} />

        </Routes>
      </div>
    </div>
  );
};

export default AppContainer;

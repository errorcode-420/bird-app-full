import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss'; // Importiere die SCSS-Datei

const Menu: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <NavLink
        to="/identification"
        className={({ isActive }) => isActive ? `${styles.menuButton} ${styles.active}` : styles.menuButton}
      >
        Bird Identification
      </NavLink>
      <NavLink
        to="/info"
        className={({ isActive }) => isActive ? `${styles.menuButton} ${styles.active}` : styles.menuButton}
      >
        Info
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) => isActive ? `${styles.menuButton} ${styles.active}` : styles.menuButton}
      >
        Gallery
      </NavLink>
    </nav>
  );
};

export default Menu;

import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header className={styles.header}>
    <NavLink to="/" className={styles.welcomeLink}>
      <div className={styles.logo}>
        <img src="/assets/images/logo.png" alt="logo" />
      </div>
      <h1 className={styles.title}>
        Система
        <br />
        документов
      </h1>
    </NavLink>
    <ul className={styles.navLinks}>
      <li>
        <NavLink to="/documents">Документы</NavLink>
      </li>
      <li>
        <NavLink to="/user">Личный кабинет</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;

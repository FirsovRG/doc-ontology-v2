import React from "react";
import styles from "./Layout.module.css";
import Header from "../Header";

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default Layout;

import React from "react";
import styles from "./WelcomePage.module.css";
import Carousel from "../../components/UI/Carousel";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className={styles.welcomePage}>
      <div className={styles.contentBackground} />
      <div className={styles.content}>
        <div className={styles.welcomeCarousel}>
          <Carousel>
            <div className={styles.bannerItem}>
              <div className={styles.bannerTitle}>Управление</div>
              <div className={styles.bannerBody}>
                Загружайте, удаляйте и редактируйте документы в унифицированном
                хранилище вашей организации
              </div>
            </div>
            <div className={styles.bannerItem}>
              <div className={styles.bannerTitle}>Просмотр</div>
              <div className={styles.bannerBody}>
                Просматривайте отсортированные документы разных форматов в
                удобном редакторе
              </div>
            </div>
            <div className={styles.bannerItem}>
              <div className={styles.bannerTitle}>
                Унификация
              </div>
              <div className={styles.bannerBody}>
                Сделайте работу с документами вашей организации удобнее для
                каждого сотрудника
              </div>
            </div>
          </Carousel>
        <NavLink to='/documents' className={styles.beginButton}>
          Начать
        </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

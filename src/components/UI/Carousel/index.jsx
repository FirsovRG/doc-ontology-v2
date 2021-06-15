import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./Carousel.module.css";

const Carousel = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const childsArray = React.Children.toArray(children);

  const nextSlide = () => {
    if (activeSlide + 1 > childsArray.length - 1) {
      setActiveSlide(0);
      return;
    }
    setActiveSlide(activeSlide + 1);
  };

  const prevSlide = () => {
    if (activeSlide === 0) {
      setActiveSlide(childsArray.length - 1);
      return;
    }
    setActiveSlide(activeSlide - 1);
  };

  useEffect(() => {
    setTimeout(nextSlide, 5000);
  }, [activeSlide]);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselViewWindow}>
        <div className={styles.carouselTrack}>
          {childsArray.map((slide, index) => (
            <div
              key={`slide_${index}`}
              className={cx(
                styles.carouselSlide,
                activeSlide === index && styles.activeSlide
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.carouselDots}>
        <ul className={styles.dotsList}>
          {childsArray.map((item, index) => (
            <div
              key={`${Math.random() * index}`}
              className={cx(
                styles.dot,
                index === activeSlide && styles.activeDot
              )}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;

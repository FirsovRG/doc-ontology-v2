import React from 'react';

import styles from './Loader.module.css';

const Loader = () => <div className={styles.loaderWrapper}><div className={styles.loader}>Loading...</div><span className={styles.label}>Загружаем документы...</span></div>

export default Loader;
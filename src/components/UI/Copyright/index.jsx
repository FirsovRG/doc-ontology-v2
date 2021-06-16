import React from 'react';
import { GithubIcon } from '../icons/github';
import styles from './Copyright.module.css';

const Copyright = () => <div className={styles.copyright}>
    <a href='https://github.com/FirsovRG' target='_blank' rel="noopener noreferrer" className={styles.link}><span className={styles.author}>FirsovRG</span><GithubIcon /></a>
</div>

export default Copyright;
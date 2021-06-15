import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from "./ModalPortal.module.css";

const modalRoot = document.getElementById( 'modal' );

export const ModalPortal = ({children}) => {
    const element = document.createElement( 'div' );

    useEffect(() => {
        modalRoot.appendChild( element );

        return () => modalRoot.removeChild( element );
    }, [element])

    return createPortal( <div className={styles.modalWrapper}><div className={styles.modalWrapper}>{children}</div></div>, element );

} 
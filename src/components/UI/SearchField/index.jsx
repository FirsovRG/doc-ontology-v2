import React, { useEffect, useRef } from 'react';
import styles from './SearchField.module.css';
import cx from 'classnames';

const SearchField = React.memo(({isOpen, value, onChange}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isOpen && ref.current) {
            ref.current.focus()
        }
    }, [isOpen])

    return (
        <div className={cx(styles.searchFieldWrapper, isOpen && styles.opened)}>
            <input ref={ref} value={value} onChange={onChange} className={styles.searchField}/>
        </div>
    )})

export default SearchField;
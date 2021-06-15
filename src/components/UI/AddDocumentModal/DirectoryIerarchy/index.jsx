import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { filesTreeIerarchySelector } from '../../../../store/selectors/filesTreeSelector';

import { DirOpen } from "../../icons/dirOpen";
import { DirClose } from "../../icons/dirClose";
import { DirectoryIcon } from "../../icons/directory";
import cx from "classnames";

import styles from './DirectoryIerarchy.module.css';

const DirectoryIerarchy = React.memo(({selectedDir, onDirSelect}) => {
    const [openedDirs, setOpenedDirs] = useState([]);

    const ierarchy = useSelector(filesTreeIerarchySelector);

    const renderDirTree = (doc) => {
        if (doc.type !== 'directory') {
            return null;
        }

        return (<li key={doc.name} className={styles.documentsDirectory}>
            <div
              className={styles.directoryTitle} 
            >
                <div className={styles.icon} onClick={() => {
                if (openedDirs.includes(doc.name)) {
                  setOpenedDirs(openedDirs.filter((item) => item !== doc.name));
                  return;
                }
                setOpenedDirs([...openedDirs, doc.name]);
              }}>
              {doc.children && doc.children.length > 0 && doc.children.some(item => item.type === 'directory') ? (
                openedDirs.includes(doc.name) ? (
                  <DirClose />
                ) : (
                  <DirOpen />
                )
              ) : (
                <DirectoryIcon />
              )}
                </div>
                <div className={cx(styles.itemTitle, selectedDir === doc.path && styles.selectedDir)} onClick={() => onDirSelect(doc.path)}>
              {doc.name}
                </div>
            </div>
            {doc.children.some(item => item.type === 'directory') && <ul
              className={cx(
                styles.directoryChildrens,
                openedDirs.includes(doc.name) && styles.directoryChildrensOpened
              )}
            >
              {doc.children.map(renderDirTree)}
            </ul>}
          </li>)
    }

    return <div className={styles.treeIerarchy}>
    <ul>
        {[{type: 'directory', name: '/', path: '', children:ierarchy}].map(renderDirTree)}
    </ul>
</div>

})

export default DirectoryIerarchy;
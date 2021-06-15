import React from "react";
import styles from "./DocumentsList.module.css";
import { DirOpen } from "../icons/dirOpen";
import { DirClose } from "../icons/dirClose";
import { DirectoryIcon } from "../icons/directory";
import { FileIcon } from "../icons/file";
import cx from "classnames";
import { useState } from "react";

const DocumentsList = ({ items, setMovable, listWidth, setActiveDocument }) => {
  const [openedDirs, setOpenedDirs] = useState([]);

  const renderDoc = (doc) => {
    if (doc.type === "directory") {
      return (
        <li key={doc.name} className={styles.documentsDirectory}>
          <div
            className={styles.directoryTitle}
            onClick={() => {
              if (openedDirs.includes(doc.name)) {
                setOpenedDirs(openedDirs.filter((item) => item !== doc.name));
                return;
              }
              setOpenedDirs([...openedDirs, doc.name]);
            }}
          >
            {doc.children && doc.children.length > 0 ? (
              openedDirs.includes(doc.name) ? (
                <DirClose />
              ) : (
                <DirOpen />
              )
            ) : (
              <DirectoryIcon />
            )}
            {doc.name}
          </div>
          <ul
            className={cx(
              styles.directoryChildrens,
              openedDirs.includes(doc.name) && styles.directoryChildrensOpened
            )}
          >
            {doc.children.map((child) => renderDoc(child))}
          </ul>
        </li>
      );
    }
    return (
      <li key={doc.name} className={styles.documentItem} onClick={() => setActiveDocument(doc)}>
        <FileIcon /> {doc.name}
      </li>
    );
  };
  
  return (
    <div className={styles.documentsList} style={{ width: `${listWidth}px` }}>
      <div className={styles.listContent}>
        {items && <ul>{items.map((item) => renderDoc(item))}</ul>}
      </div>
      <div
        className={styles.draggableWrapper}
        onMouseUpCapture={() => setMovable(false)}
      >
        <div
          className={styles.draggablePanel}
          onMouseDown={() => setMovable(true)}
          onMouseUp={() => setMovable(false)}
        />
      </div>
    </div>
  );
};

export default DocumentsList;

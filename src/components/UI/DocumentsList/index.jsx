import React from "react";
import styles from "./DocumentsList.module.css";
import { DirOpen } from "../icons/dirOpen";
import { DirClose } from "../icons/dirClose";
import { DirectoryIcon } from "../icons/directory";
import { FileIcon } from "../icons/file";
import cx from "classnames";
import { useState } from "react";
import {PlusIcon} from '../icons/plus';
import AddDocumentModal from "../AddDocumentModal";
import Loader from "../Loader";
import {RefreshIcon} from '../icons/refresh';
import {CollapseIcon} from '../icons/collapse';
import { useDispatch } from "react-redux";
import {getDatabaseTree} from '../../../actions'

const DocumentsList = ({ loading, items, setMovable, listWidth, setActiveDocument }) => {
  const [openedDirs, setOpenedDirs] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();

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
            {doc.children.map(renderDoc)}
          </ul>
        </li>
      );
    }
    return (
      <li key={doc.name} className={styles.documentItem} onClick={() => setActiveDocument(doc)}>
        <FileIcon />
        <div className={styles.documentInfo}>
          <span className={styles.documentName}>{doc.name}</span>
          <span className={styles.documentDate}>{new Date(doc.updated).toLocaleString()}</span>
        </div>
      </li>
    );
  };

  const handleOpenModal = () => {
      setIsModalOpened(true)
  }

  const handleRefreshList = () => {
    dispatch(getDatabaseTree());
  }
  
  return (
    <React.Fragment>
    <div className={styles.documentsList} style={{ width: `${listWidth}px` }}>
      {loading ? <Loader /> :<React.Fragment><div className={styles.listContent}>
        <div className={styles.controlsWrapper}>
        <button className={styles.reloadButton} onClick={handleOpenModal}>
            <PlusIcon />
          </button>
          <button className={styles.reloadButton} onClick={() => setOpenedDirs([])} >
            <CollapseIcon />
          </button>
          <button className={styles.reloadButton} onClick={handleRefreshList}>
            <RefreshIcon />
          </button>
        </div>
        {items && <ul className={styles.list}>{items.map(renderDoc)}</ul>}
        <div className={styles.addDocumentButtonWrapper}>
          <button className={styles.addDocumentButton} onClick={handleOpenModal}>
            <PlusIcon />
            Добавить документ
          </button>
        </div>
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
      </React.Fragment>}
    </div>
    <AddDocumentModal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}/>
    </React.Fragment>
  );
};

export default DocumentsList;

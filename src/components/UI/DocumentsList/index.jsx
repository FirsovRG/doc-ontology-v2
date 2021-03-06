import React, { useEffect } from "react";
import styles from "./DocumentsList.module.css";
import { DirOpen } from "../icons/dirOpen";
import { DirClose } from "../icons/dirClose";
import { DirectoryIcon } from "../icons/directory";
import { FileIcon } from "../icons/file";
import cx from "classnames";
import { useState } from "react";
import { PlusIcon } from "../icons/plus";
import AddDocumentModal from "../AddDocumentModal";
import Loader from "../Loader";
import { RefreshIcon } from "../icons/refresh";
import { CollapseIcon } from "../icons/collapse";
import { useDispatch } from "react-redux";
import { getDatabaseTree } from "../../../actions";
import Copyright from "../Copyright";
import { DownloadIcon } from "../icons/download";
import { SearchPlusIcon } from "../icons/searchPlus";
import SearchField from "../SearchField";
import useDebounce from "../../../hooks/useDebounce";
import { searchFiles } from "../../../utils/search";
import { SearchMinusIcon } from "../icons/searchMinus";

const DocumentsList = ({
  loading,
  items,
  setMovable,
  listWidth,
  setActiveDocument,
}) => {
  const [openedDirs, setOpenedDirs] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(items);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const result = searchFiles(debouncedSearchTerm, items);
      setResults(result);
    } else {
      setResults(items);
    }
  }, [debouncedSearchTerm, items]);

  const dispatch = useDispatch();

  const toggleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleDownloadFile = () => {
    if (activeDoc) {
      const link = document.createElement("a");
      link.download = activeDoc.name;
      link.setAttribute("download", activeDoc.name);
      link.setAttribute("target", "_blank");
      link.href = activeDoc.url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
      <li
        key={doc.name}
        className={styles.documentItem}
        onClick={() => {
          setActiveDocument(doc);
          setActiveDoc(doc);
        }}
      >
        <FileIcon />
        <div className={styles.documentInfo}>
          <span className={styles.documentName}>{doc.name}</span>
          <span className={styles.documentDate}>
            {new Date(doc.updated).toLocaleString()}
          </span>
        </div>
      </li>
    );
  };

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleRefreshList = () => {
    dispatch(getDatabaseTree());
  };

  return (
    <React.Fragment>
      <div className={styles.documentsList} style={{ width: `${listWidth}px` }}>
        <div className={styles.listContent}>
          <div className={styles.controlsWrapper}>
            <button className={styles.reloadButton} onClick={handleOpenModal}>
              <PlusIcon />
            </button>
            <button
              className={styles.reloadButton}
              onClick={handleDownloadFile}
            >
              <DownloadIcon />
            </button>
            <button
              className={styles.reloadButton}
              onClick={() => setOpenedDirs([])}
            >
              <CollapseIcon />
            </button>
            <button className={styles.reloadButton} onClick={toggleSearchOpen}>
              {isSearchOpen ? <SearchMinusIcon /> : <SearchPlusIcon />}
            </button>
            <button className={styles.reloadButton} onClick={handleRefreshList}>
              <RefreshIcon />
            </button>
          </div>
          <SearchField
            isOpen={isSearchOpen}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {loading ? (
            <Loader />
          ) : (
            results && <ul className={styles.list}>{results.map(renderDoc)}</ul>
          )}
          <div className={styles.addDocumentButtonWrapper}>
            <button
              className={styles.addDocumentButton}
              onClick={handleOpenModal}
            >
              <PlusIcon />
              ???????????????? ????????????????
            </button>
          </div>
          <Copyright />
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
      <AddDocumentModal
        isOpen={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </React.Fragment>
  );
};

export default DocumentsList;

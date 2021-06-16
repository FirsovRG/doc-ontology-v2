import React, { useEffect, useState } from "react";
import DocumentsList from "../../components/UI/DocumentsList";
import cx from "classnames";
import styles from "./DocumentsPage.module.css";
import Workbench from "../../components/UI/Workbench";
import { getDatabaseTree } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import { filesTreeSelector } from '../../store/selectors/filesTreeSelector';

const DocumentsPage = () => {
  const [movable, setMovable] = useState(false);
  const [documentsListWidth, setDocumentsListWidth] = useState(300);
  const [activeDocument, setActiveDocument] = useState("");

  const dispatch = useDispatch();
  const {loading, tree: documents} = useSelector(filesTreeSelector);

  const handleResizeList = (event) => {
    setDocumentsListWidth(event.clientX + 5);
  };

  useEffect(() => {
    if (documents.length === 0){
    dispatch(getDatabaseTree());}
  }, [dispatch, documents.length])

  return (
    <div
      className={cx(styles.documentsPage, movable && styles.inMove)}
      onMouseMove={(event) => movable && handleResizeList(event)}
    >
      <DocumentsList
        items={documents}
        setMovable={(val) => setMovable(val)}
        listWidth={documentsListWidth}
        setActiveDocument={(docId) => setActiveDocument(docId)}
        loading={loading}
      />
      <Workbench file={activeDocument} />
    </div>
  );
};

export default DocumentsPage;

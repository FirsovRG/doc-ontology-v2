import React, { useEffect, useState } from "react";
import DocumentsList from "../../components/UI/DocumentsList";
import cx from "classnames";
import styles from "./DocumentsPage.module.css";
import Workbench from "../../components/UI/Workbench";
import { getDatabaseTree } from '../../actions';

const DocumentsPage = () => {
  const [movable, setMovable] = useState(false);
  const [documentsListWidth, setDocumentsListWidth] = useState(300);
  const [activeDocument, setActiveDocument] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleResizeList = (event) => {
    setDocumentsListWidth(event.clientX + 5);
  };

  useEffect(() => {
    async function getData () {
      const result = await getDatabaseTree();
      setDocuments(result)
    }

    getData();
  }, [])

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
      />
      <Workbench file={activeDocument} />
    </div>
  );
};

export default DocumentsPage;

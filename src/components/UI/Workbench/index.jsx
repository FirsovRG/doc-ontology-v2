import React, { useMemo } from "react";
import DocViewer, { DocViewerRenderers } from "@jorbdur/react-doc-viewer";
import styles from "./Workbench.module.css";

const Workbench = React.memo(({ file }) => {
  const docs = useMemo(
    () => [{ uri: file.url, fileType: file.contentType }],
    [file]
  );

  return (
    <div className={styles.workbench}>
      {file ? (
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          style={{ width: "100%" }}
        />
      ) : (
        <div className={styles.welcomeMessage}>
          <h1 className={styles.welcomeTitle}>Добро пожаловать!</h1>
          <p className={styles.welcomeBody}>
            Начните просмотр документа. Выберите файл из иерархии и получите
            доступ к дополнительным функциям.
          </p>
        </div>
      )}
    </div>
  );
});

export default Workbench;

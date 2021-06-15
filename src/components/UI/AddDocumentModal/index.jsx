import React, {useState} from 'react';
import { ModalPortal } from '../ModalPortal';
import { CloseIcon } from '../icons/close';
import {app} from '../../../base';
import Modal from 'react-modal';
import styles from "./AddDocumentModal.module.css";
import DirectoryIerarchy from './DirectoryIerarchy';

const storage = app.storage();

const AddDocumentModal = React.memo(({isOpen, onClose}) => {
    const [file, setFile] = useState(null);
    const [selectedPath, setSelectedPath] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0])
      }
    
    const onUpload = async () => {
        const storageRef = storage.ref()
        const fileRef = storageRef.child(`${selectedPath ? selectedPath + '/' : '' }${file.name}`)
        await fileRef.put(file);
    }

    const handleDirectorySelect = (path) => {
        setSelectedPath(path);
    }

    return <Modal isOpen={isOpen} className={styles.modal}
    overlayClassName={styles.overlay}>
        <div className={styles.addDocumentModal}>
            <div className={styles.modalHeader}>
                <button onClick={onClose} className={styles.closeButton}>
                    <CloseIcon />
                </button>
            </div>
            <div className={styles.modalContent}>
                <div className={styles.titleWrapper}>
                    <span className={styles.title}>
                        Здесь вы можете добавить файл в систему.
                    </span>
                    <span className={styles.title}>
                        Выберите файл и место, куда хотите его загрузить.
                    </span>
                </div>
                <div className={styles.fileInput}>
                    <input type="file" onChange={onFileChange} />
                    <button onClick={onUpload}>Upload image</button>
                </div>
                <DirectoryIerarchy selectedDir={selectedPath} onDirSelect={handleDirectorySelect}/>
            </div>
        </div>
    </Modal>
})

export default AddDocumentModal;
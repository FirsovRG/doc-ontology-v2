import React, {useState} from 'react';
import { CloseIcon } from '../icons/close';
import {app} from '../../../base';
import Modal from 'react-modal';
import styles from "./AddDocumentModal.module.css";
import DirectoryIerarchy from './DirectoryIerarchy';
import { useDispatch } from 'react-redux';
import {getDatabaseTree} from '../../../actions';

const storage = app.storage();

Modal.setAppElement('#modal');

const AddDocumentModal = React.memo(({isOpen, onClose}) => {
    const [file, setFile] = useState(null);
    const [selectedPath, setSelectedPath] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const onFileChange = (e) => {
        setFile(e.target.files[0])
      }


    const handleCloseModal = () => {
        setFile(null);
        onClose();
    }
    
    const onUpload = async () => {
        setIsLoading(true);
        const storageRef = storage.ref()
        const fileRef = storageRef.child(`${selectedPath ? selectedPath + '/' : '' }${file.name}`)
        await fileRef.put(file);
        setIsLoading(false);
        handleCloseModal();
        dispatch(getDatabaseTree());
    }

    const handleDirectorySelect = (path) => {
        setSelectedPath(path);
    }


    return <Modal isOpen={isOpen} className={styles.modal}
    overlayClassName={styles.overlay}>
        <div className={styles.addDocumentModal}>
            <div className={styles.modalHeader}>
                <button onClick={handleCloseModal} className={styles.closeButton}>
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
                    <input type="file" onChange={onFileChange} className={styles.uploadInput}/>
                </div>
                <DirectoryIerarchy selectedDir={selectedPath} onDirSelect={handleDirectorySelect}/>
            </div>
            <div className={styles.modalFooter}>
                <button disabled={!file} onClick={onUpload} className={styles.uploadButton}>
                    {isLoading ? <div className={styles.loader} /> : 'Загрузить'}
                </button>
                <button onClick={handleCloseModal} className={styles.cancelButton}>
                    Отмена
                </button>
            </div>
        </div>
    </Modal>
})

export default AddDocumentModal;
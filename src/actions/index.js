import firebase from "firebase";
import { app } from "../base";
import { getTreeRequestStart, getTreeRequestSuccess } from "../store/reducers/filesTreeReducer";

const storage = firebase.storage(app);

const prepareFileTree = async (ref) => {
    const tempTree = [];
  
    const {prefixes, items} = await ref.listAll(); 

    async function directoryPrepare (prefix) {
        const children = await prepareFileTree(prefix);
        tempTree.push({
            type: 'directory',
            name: prefix.name,
            children,
            path: prefix.fullPath
        })
    }

    async function documentPrepare (item) {
        const itemUrl = await item.getDownloadURL();
            const {contentType, timeCreated, updated} = await item.getMetadata();
            tempTree.push({
                type: 'file',
                name: item.name,
                url: itemUrl,
                contentType: contentType,
                timeCreated,
                updated
            })
    }

    async function processPrefixes() {
        
        const prefixesPromises = prefixes.map(directoryPrepare);

        const itemsPromises = items.map(documentPrepare);

        await Promise.all([...prefixesPromises, ...itemsPromises]);
    }

    await processPrefixes();
    return tempTree.sort((a) => a.type !== 'directory' ? 1 : -1);
}

export const getDatabaseTree = () => async (dispatch) => {
    dispatch(getTreeRequestStart());
    const listRef = storage.ref('/');   
    const result = await prepareFileTree(listRef);
    dispatch(getTreeRequestSuccess(result));
  }

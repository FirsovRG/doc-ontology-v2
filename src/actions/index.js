import firebase from "firebase";
import { app } from "../base";

const storage = firebase.storage(app);

const prepareFileTree = async (ref) => {
    const tempTree = [];
    const {prefixes, items} = await ref.listAll(); 

    async function processPrefixes() {
        for (const prefix of prefixes) {
            const children = await prepareFileTree(prefix);
            tempTree.push({
                type: 'directory',
                name: prefix.name,
                children: children
            })
        }

        for(const item of items) {
            const itemUrl = await item.getDownloadURL();
            const meta = await item.getMetadata();
            tempTree.push({
                type: 'file',
                name: item.name,
                url: itemUrl,
                contentType: meta.contentType
            })
        }
    }

    await processPrefixes();

    // prefixes.forEach((folderRef) => {
    //     (async () => {
    //         const children = await prepareFileTree(folderRef);
    //         tempTree.push({
    //             type: 'directory',
    //             name: folderRef.name,
    //             children: children
    //         })
    //     })();
    // })

    
    // items.forEach((itemRef) => {
    //     (async () => {
    //         const itemUrl = await itemRef.getDownloadURL();
    //         tempTree.push({
    //             type: 'file',
    //             name: itemRef.name,
    //             url: itemUrl
    //         })
    //     })();
    // });

    // ref.listAll().then((res) => {
    //     res.prefixes.forEach((folderRef) => {
    //         tempTree.push({
    //             type: 'directory',
    //             name: folderRef.name,
    //             children: prepareFileTree(folderRef)
    //         })
    //       });
    //     res.items.forEach((itemRef) => {
    //         const itemUrl = itemRef.getDownloadURL().then((url) => (url));
    //         tempTree.push({
    //             type: 'file',
    //             name: itemRef.name,
    //             url: itemUrl
    //         })
    //     });
    // })
    return tempTree;
}

export const getDatabaseTree = async () => {
    const listRef = storage.ref('/');   
    const result = await prepareFileTree(listRef);
    return result;
}


// export const getDatabaseTree = async () => {
//   const response = await db.collection('documents').get();
//   const tempTree = [];
//   response.docs.forEach(item=>{
//      tempTree.push(...tempTree, item.data())
//   })

//   return tempTree;
// }
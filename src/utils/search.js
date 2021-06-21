export const searchFiles = (searchTerm, filesArray) => {
  if (!searchTerm) {
    return filesArray;
  }

  const result = [];

  const searchFunc = (filesTree) => {
    filesTree.forEach((item) => {
      if (item.type === "directory") {
        searchFunc(item.children);
      }
      if (
        Object.entries(item).some(([key, value]) => {
          if (key === "url") {
            return false;
          }

          if (key === "updated") {
            return new Date(value).toLocaleString().indexOf(searchTerm) !== -1;
          }

          return value.indexOf(searchTerm) !== -1;
        })
      ) {
        result.push(item);
      }
    });
  };

  searchFunc(filesArray);

  return result;
};

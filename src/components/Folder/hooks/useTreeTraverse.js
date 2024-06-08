
const useTreeTraverse = () => {
  const insertNode = (tree, folderId, itemName, isFolder) => {
    if(tree.id === folderId && tree.isFolder){
      tree.items.unshift({
        id:new Date().getTime(),
        name: itemName,
        isFolder: isFolder,
        items: []
      })
      return tree;
    }
    let subTree = [];
    subTree = tree.items.map((item)=> {
      return insertNode(item, folderId, itemName, isFolder);
    })
    return { ...tree, items: subTree };
  }
  const deleteNode = (tree, id) => {
    if (tree.id === id) {
      return null;
    }
  
    const updatedItems = tree.items.map((item) => {
      const updatedItem = deleteNode(item, id);
      return updatedItem ? updatedItem : null;
    });
  
    return {
      ...tree,
      items: updatedItems.filter((item) => item !== null),
    };
  };

  const renameNode = (tree, id, newName) => {
    if (tree.id === id) {
      return { ...tree, name: newName };
    }
  
    const updatedItems = tree.items.map((item) => {
      return renameNode(item, id, newName);
    });
  
    return {
      ...tree,
      items: updatedItems,
    };
  };
  return {insertNode, deleteNode, renameNode};
}

export default useTreeTraverse;
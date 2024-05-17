
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
  const deleteNode = () => {}; // Do it Yourself

  const renameNode = () => {}; // Do it Yourself
  return {insertNode, deleteNode, renameNode};
}

export default useTreeTraverse;
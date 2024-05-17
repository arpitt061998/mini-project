import { useState } from 'react';
import explorer from '../../data/folderjson';
import FileExplorer from './FileExplorer';
import useTreeTraverse from './hooks/useTreeTraverse';

const Folder = () => {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode } = useTreeTraverse();

  const handleInsertNode = (id, item, isFolder) => {
    const finalTree = insertNode(explorerData, id, item, isFolder);
    setExplorerData(finalTree);
  }

  const handleDeleteNode = (id) => {
    const finalTree = deleteNode(explorerData, id);
    setExplorerData(finalTree)
  }

  return (
    <div>
      <FileExplorer handleInsertNode = {handleInsertNode} handleDeleteNode = {handleDeleteNode} explorer={explorerData}/>
    </div>
  )
}

export default Folder;
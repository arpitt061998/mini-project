import { useState } from 'react';
import explorer from '../../data/folderjson';
import FileExplorer from './FileExplorer';
import useTreeTraverse from './hooks/useTreeTraverse';

const Folder = () => {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTreeTraverse();

  const handleNode = (id, item, isFolder) => {
    const finalTree = insertNode(explorerData, id, item, isFolder);
    console.log("****FINal treee********",finalTree);
    setExplorerData(finalTree);
  }

  return (
    <div>
      <FileExplorer handleNode = {handleNode}  explorer={explorerData}/>
    </div>
  )
}

export default Folder;
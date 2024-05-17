import React, { useState } from 'react';
import "./folder.css";

const FileExplorer = ({handleNode= () => {}, explorer}) => {
  
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: null
  })

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true)
    setShowInput({
      isVisible: true,
      isFolder
    })
  }

  const deleteNode = (e) => {
    e.stopPropagation();
  }

  const onAddFolder = (e) => {
    if(e.keyCode === 13 && e.target.value){
      handleNode(explorer.id, e.target.value, showInput.isFolder)
      setShowInput({...showInput, isVisible:false})
    }
  }

  if(explorer.isFolder){
  return (
    <div>
      <div className="folder" onClick={() => {setExpand(!expand)}}>
        <span>📂{explorer.name}</span>
        <div>
          <button onClick={(e) => {handleNewFolder(e,true)}}>Folder +</button>
          <button onClick={(e) => {handleNewFolder(e,false)}}>File +</button>
          <button onClick={(e)=> {deleteNode(e)}}>Delete </button>
        </div>
      </div>
      <div style={{display: expand ? "block" : "none", paddingLeft:"25px"}}>
        {
          showInput.isVisible && 
          <div className='inputContainer'>
            <span>{showInput.isFolder ? "📂": "📄"}</span>
            <input
              type='text'
              onKeyDown={onAddFolder}
              onBlur={() => {setShowInput({...showInput,isVisible:false})}}
              className='inputContainer__input'
              autoFocus/>
          </div>
        }        {explorer.items.map((exp) => {
          return (
            <FileExplorer handleNode = {handleNode} explorer={exp} key={exp.id}/>
          )
        })}
      </div>
    </div>
  )}
  else {
    return <span style={{display: "block"}}>📄 {explorer.name}</span>
  }
}

export default FileExplorer
import React from 'react'
import './index.scss'
import * as monaco from 'monaco-editor'
import { useEffect } from 'react'
import { useRef } from 'react'
let editorInstance
export default function NoteContent() {
  const editorRef = useRef()
  useEffect(()=>{
      editorInstance = monaco.editor.create(editorRef.current, {
        value:  'Hello, World!',
        theme: 'transparentTheme',
        language: 'javascript',
        fontSize: 14
      })
      editorInstance.onDidChangeModelContent(() => {
        const editorValue = editorInstance.getValue()
      })
    return(()=>{
      if (editorInstance) {
        editorInstance.dispose()
      }
    })
  },[])
  return (
    <div className='noteContent'><div className="editor" ref={editorRef}></div>
    </div>
  )
}

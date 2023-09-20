import './index.scss'
import * as monaco from 'monaco-editor'
import { useEffect ,useRef} from 'react'
import { useNotes } from '../../utils'
import { updateDetail } from '../../request/api'
let editorInstance
export default function NoteContent() {
  const editorRef = useRef()
  const {notesDetail,key} = useNotes()
  useEffect(()=>{
    const editorContainer = document.querySelector('.editor');
      editorInstance = monaco.editor.create(editorRef.current, {
        value:  notesDetail||'Hello, World!',
        theme: 'transparentTheme',
        language: 'javascript',
        fontSize: 14
      })
      editorInstance.onDidChangeModelContent(() => {
        const editorValue = editorInstance.getValue()
        updateDetail(key,editorValue)
      })
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === editorContainer) {
            // 根据容器的高度来设置 Monaco Editor 的高度
            editorInstance.layout();
          }
        }
      });
  
      // 开始监听容器大小的变化
      resizeObserver.observe(editorContainer);
    return(()=>{
      if (editorInstance) {
        resizeObserver.disconnect();
        editorInstance.dispose()
      }
    })
  },[])
  return (
    <div className='noteContent'><div className="editor" ref={editorRef}></div>
    </div>
  )
}

import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useNotes } from '../../utils'
    const MonacoEditor = () => {
  const {notesDetail,key,updateDetail,label} = useNotes()
      const editorRef = useRef(null);
      function handleEditorDidMount(editor) {
        editorRef.current = editor;
      }
      function handleEditorChange(value) {
        updateDetail(key,value)
      }
      // 创建一个函数来处理容器大小的变化
      const handleResize = () => {
        if (editorRef.current) {
          editorRef.current.layout();
        }
      };
      useEffect(() => {
        // 监听窗口大小变化，当窗口大小变化时触发 handleResize 函数
        window.addEventListener('resize', handleResize);
        // 初次渲染时，手动触发一次布局
        handleResize();
        return () => {
          // 组件卸载时，移除事件监听
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      return (
        <Editor
      defaultLanguage={label||'javascript'}
      defaultValue={notesDetail||'hello world'}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
      );
    };

export default MonacoEditor;

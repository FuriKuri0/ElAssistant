import {useEffect, useState,useRef}from 'react'
import './index.scss'
import {Popconfirm,Button,Input} from 'antd'
import NoteUl from '../../components/notes'
import NoteContent from '../../components/noteContent'
import { useNotes } from '../../utils'
export default function Note() {
  const {queryNotes,allNotes,getAllNotes,showDetail,addNewNote} = useNotes()
  const addTitle = useRef()
  const addLabel = useRef()
  const confirm = ()=>{
    if(addTitle.current.input.value&&addLabel.current.input.value){
      addNewNote(Date.now(),addTitle.current.input.value,addLabel.current.input.value)
    }
  }
  useEffect(()=>{
    getAllNotes()
  },[])
  return (
    <div className='Note'>
      <div className='Note-border'>
      <div className="InputContainer">
          <input onChange={e=>{queryNotes(e.target.value)}} type="text"  className="Note-input" id="Note-input" placeholder='Search'/>
          <label htmlFor="Note-input" className="labelforsearch">
        <svg viewBox="0 0 512 512" className="searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
        </label>
        <div className="border"></div>

        <Popconfirm
        placement="bottomRight"
        title='新增笔记'
        description={<div style={{width:'300px'}}>
          <Input ref={addTitle} style={{width:'300px',marginBottom:'10px'}} placeholder="title" />
          <Input ref={addLabel} style={{width:'300px'}} placeholder="label" />
        </div>}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button className="micButton">+</Button>
      </Popconfirm>
        </div>
     {!showDetail?<NoteUl data={allNotes}/>:<NoteContent/>}
      </div>
    </div>
  )
}

import {useEffect, useState,useRef}from 'react'
import './index.scss'
import NoteUl from '../../components/notes'
import NoteContent from '../../components/noteContent'
export default function Note() {
  const data = [{title:'title1',label:'javascript',key:1},{title:'title2',label:'css',key:2},{title:'嘻嘻嘻嘻',label:'vite.config.js',key:3},{title:'title1',label:'javascript',key:1},{title:'title2',label:'css',key:2},{title:'嘻嘻嘻嘻',label:'vite.config.js',key:3}]
  const [showContent,setShowContent] = useState(false)
  return (
    <div className='Note'>
      <div className='Note-border'>
      <div className="InputContainer">
          <input type="text"  className="Note-input" id="Note-input" placeholder="Search"/>
          <label htmlFor="Note-input" className="labelforsearch">
        <svg viewBox="0 0 512 512" className="searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
        </label>
        <div className="border"></div>
        <button className="micButton"><svg viewBox="0 0 384 512" className="micIcon"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path></svg>
        </button>
        </div>
     {!showContent?<NoteUl data={data}/>:<NoteContent/>}

      </div>
    </div>
  )
}

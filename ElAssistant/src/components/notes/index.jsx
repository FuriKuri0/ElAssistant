import React from 'react'
import './index.scss'
import {Tag } from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { useNotes } from '../../utils'
const map  = {
    javaScript:'yellow',
    css:'green',
    jsx:'blue',
} 
export default function NoteUl({ data } ) {
  const {changeStatus,changeDetail} = useNotes()
  const showDetail = (key) => {
    changeStatus(true)
    changeDetail(key)
  }
  return (
    <ul className='NoteUl'>
    {data&&data.map((v)=>{
        return <li onClick={()=>showDetail(v.key)} key={v.key}><div className='Note-title'>{v.title}</div><Tag color={map[v.label]||'yellow'}>{v.label}</Tag><DeleteOutlined className='Note-delete'/></li>
    })}
</ul>
  )
}

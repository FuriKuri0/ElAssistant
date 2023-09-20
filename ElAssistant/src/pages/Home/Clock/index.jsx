import { useEffect, useState,useRef } from 'react'
import {message} from 'antd'
import './index.scss'
import {
  ClockCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import MainStore from '../../../utils/store';
import {isValidClockFormat} from '../../../utils/index'
export default function Clock() {
  const MyInput = useRef('')
  const [clockList,setClockList] = useState([])
  const limit = useRef(1)
  const handleKeyDown = (e) => {
    if(e.keyCode===13){
      let addValue = e.target.value.replace('：',":")
      if(isValidClockFormat(addValue)){
        //因为原数组是升序的，所以这里可以优化成O（n）的算法
        let newList = [...new Set([...clockList,addValue])].sort((a,b)=>{
          let [a1,a2] = a.split(':')
          let [b1,b2] = b.split(':')
          if(parseInt(a1)>parseInt(b1)){
            return 1
          }else if(parseInt(a1)<parseInt(b1)){
            return -1
          }else{
           return parseInt(a2)-parseInt(b2)
          }
        })
        setClockList(newList)
        MainStore.set('clock',newList)
        MyInput.current.value = ''
      }else{
        message.warning('请输入正确的时间格式：xx:xx,如23:30')
      }
    }
  } 
  const deleteClock = (i) => {
    let newList = clockList.filter((_,index)=>index!==i)
    setClockList(newList)
    MainStore.set('clock',newList)
  }
  const init = async () =>{
    const data = await MainStore.get('clock')
    setClockList(data) 
    MyInput.current.focus()
  }
  useEffect(()=>{
    if(limit.current===1){
    init()
    }
    limit.current++
  },[])
  return (
    <div className='Clock'>
        <div className="input-container">
                <input ref={MyInput} onKeyDown={handleKeyDown} className="Clock-input"  type="text"/>
                <label className="label" htmlFor="input">Enter The Clock</label>
                <div className="topline"></div>
                <div className="underline"></div>
                <ul className='clockList'>
                  {clockList.map((v,i)=>{
                    return <li key={v} ><div><ClockCircleOutlined />&nbsp;&nbsp;{v}</div> &nbsp;&nbsp;<DeleteOutlined onClick={()=>deleteClock(i)} className='clockList-delete'/></li>
                  })}
                </ul>
        </div>
    </div>
  )
}

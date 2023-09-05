import {useEffect, useState,useRef}from 'react'
import './index.scss'
export default function Mask() {
  const [light,setLight] = useState(0.5)
  const [r,setR] = useState(100)
  const [x,setX] = useState(0)
  const [y,setY] = useState(0)
  const limit = useRef(1)
  //监听光圈变化以及亮度变化
  const beBig = ()=>{
    setR(pre=>pre+10)
  }
  const beSmall = ()=>{
    setR(pre=>pre>10?pre-10:pre)
  }
  const beLight = ()=>{
    setLight(pre=>pre>=0.9?pre:pre+0.1)
  }
  const beDark = ()=>{
    setLight(pre=>pre<=0?pre:pre-0.1)
  }
  useEffect(()=>{
    if(limit.current===1){
      window.electronM.ListenMouse(setX,setY)
      window.electronM.ListenChange(beBig,beSmall,beLight,beDark)
    }
    limit.current++
  },[])
  return (
    <div  className='Mask'  style={ {'background': `radial-gradient(circle at ${x}px ${y}px, rgba(0,0,0,0) 0, rgba(0,0,0,0) ${r}px,rgba(0,0,0,${light})  ${r}px`}}></div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
export default function TimeCount() {
    const [time,setTime] = useState('00:00:00')
    const startTime = Date.now()
    const formatTime = (ms) => {
        const date = new Date(ms);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };
    useEffect(()=>{
        let Interval
        Interval = setInterval(()=>{
            setTime(_=>formatTime(Date.now()-startTime))
      },1000)
       return()=>{
        clearInterval(Interval)
       }
    },[])
  return (
    <div className='TimeCount'>
<div className="TimeCount-loader">
  <svg  viewBox="0 0 80 80" height="80px" width="80px" y="0px" x="0px"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1" className="clock">  <image href="data:image/png;base64,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" y="0" x="0" height="80" width="80" id="image0"></image>
  </svg>
  <i>{time}</i>
  <div className="TimeCount-stage"></div>
  <div className="TimeCount-hold">
    <div className="TimeCount-ball"></div>
  </div>
</div>
    </div>
  )
}

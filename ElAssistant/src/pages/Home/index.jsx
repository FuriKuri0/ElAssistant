import { useEffect,useRef, useState } from 'react'
import './home.scss'
import MMD from './mmd'
import clock from '../../assets/clock.mp3'
import music from '../../assets/music.mp3'
import Clock from './Clock'
import Yuyin from './Yuyin'
import TimeCount from './TimeCount'
export default function Home() {
  const clockRef = useRef()
  const musicRef = useRef()
  //是否显示clock
  const [showClock,setShowClock] = useState(false)
  //是否显示Yuyin
  const [showYuyin,setShowYuyin] = useState(false)
  //是否显示计时器
  const [showTimeCount,setShowTimeCount] = useState(false)
  const limit = useRef(1)
  //监听热键
  const init = () => {
    //监听音乐播放
    window.electron.PlayMusic(()=>{
      if(musicRef.current){
        if (!musicRef.current.paused) {
          musicRef.current.pause();
        } else {
          // 如果音乐未播放，开始播放它
          musicRef.current.play();
        }
      }
    })
    //监听闹钟组件显示
    window.electron.ShowClock(()=>{
        setShowClock(preStatus=>!preStatus)
    })
    //监听闹钟组件显示
    window.electron.PlayClock(()=>{
          clockRef.current.play();
    })
   //监听语音组件显示
   window.electron.ShowYuyin(()=>{
    setShowYuyin(preStatus=>!preStatus)
    })
       //监听计时器组件显示
   window.electron.ShowTimeCount(()=>{
    setShowTimeCount(preStatus=>!preStatus)
    })
  }
  //初始化
 useEffect(()=>{
  if(limit.current===1){
    init()
  }
  limit.current++
 },[])

  return (
      <div className='Home'>
      <audio ref={clockRef} src={clock}></audio>
      <audio ref={musicRef} src={music} loop={true}></audio>
      <MMD/>
    {showClock?<Clock/>:''}
    {showYuyin?<Yuyin/>:''}
    {showTimeCount?<TimeCount/>:''}

    </div>
  )
}
 
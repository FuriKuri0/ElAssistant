import { useEffect } from 'react'
import './base.css'

export default function App() {
  const Click = () => {
    window.electron.doThing()
  }
  useEffect(()=>{
    window.electron.test((value)=>{
      console.log(value,'value')
    })
  },[])
  return (
    <div>
    123
    </div>
  )
}
 
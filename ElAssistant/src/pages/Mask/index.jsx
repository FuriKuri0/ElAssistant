import {useState}from 'react'
import './index.scss'
export default function Mask() {
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: ''
  });
  // 监听鼠标移动事件并更新backgroundStyle
  const handleMouseMove = (e) => {
    const centerX = e.screenX + 'px';
    const centerY = e.screenY + 'px';
    const newBackgroundStyle = {
      background: `radial-gradient(circle at ${centerX} ${centerY}, rgba(0,0,0,0) 0, rgba(0,0,0,0) 100px,rgba(0,0,0,.8) 100px`
    };
    setBackgroundStyle(newBackgroundStyle);
  };

  return (
    <div onMouseMove={handleMouseMove} className='Mask'  style={backgroundStyle}></div>
  )
}

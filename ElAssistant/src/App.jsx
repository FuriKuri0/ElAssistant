import React from 'react'
import {useRoutes} from 'react-router-dom'
import routes from './routes'
import './base.css'
export default function App() {
  const element = useRoutes(routes)
  return (
    <>
      {element}
    </>
  )
}

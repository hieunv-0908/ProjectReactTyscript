import React from 'react'
import { Outlet } from 'react-router-dom'
export default function App() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: "auto",
    }}>
      <Outlet></Outlet>
    </div>
  )
}
import React from 'react'
import { Outlet } from 'react-router-dom'

function Manager() {
  return (
    <div style={{
        width:"100%",
        height:"100%",
        border:"1px solid"
    }}>
        <Outlet></Outlet>
    </div>
  )
}

export default Manager
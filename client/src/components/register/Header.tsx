import React from 'react'

function Header() {
  return (
    <div className='header' style={{
      display: 'flex',
      flexDirection: 'column',
      width: "1280px",
      height: "94px",
      // border: "1px solid"
    }}>
      <h1 style={{
        fontWeight: "600",
        fontSize: '36px',
        lineHeight: '44px',
        // letterSpacing: '10%',
        textAlign: 'center',
      }}>Đăng ký tài khoản</h1>
      <span style={{
        fontWeight: '400',
        fontSize: '20px',
        lineHeight: '30px',
        textAlign: 'center',

      }}>Đăng ký tài khoản để sử dụng dịch vụ</span>
    </div >
  )
}

export default Header
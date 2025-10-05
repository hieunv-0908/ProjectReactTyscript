import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div style={{
            display:"flex",
            // alignItems:"center",
            justifyContent:"center"
        }}>
            <span>Bạn đã có tài khoản ?</span> <Link to={"/login"}>Đăng nhập</Link>
        </div>
    )
}

export default Footer
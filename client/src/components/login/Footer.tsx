import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <span>
                Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
            </span>
        </div>
    )
}

export default Footer
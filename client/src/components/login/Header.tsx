import React from 'react'

function header() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "24%",
            // border:"1px solid"
        }}>
            <h1 style={{
                color: "#090914",
            }}>Đăng nhập</h1>
            <span style={{ color: "#52525B" }}>Đăng nhập tài khoản để sử dụng hệ thống quản lý.</span>
        </div>
    )
}

export default header
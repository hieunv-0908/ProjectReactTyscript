import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React from 'react'
import { Link } from 'react-router-dom'
import "../../css/login/forrm.css"

function Form() {
  return (
    <div className="login-form-container" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
      gap: "20px",                // tăng khoảng cách giữa các phần tử
      width: "100%",
      maxWidth: "450px"            // rộng hơn chút
    }}>
      <div style={{
        width: "100%",
      }}>
        <label htmlFor="" style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <span style={{
            fontWeight: "bold",
            fontSize: "16px"       // tăng font tiêu đề label
          }}>Email</span>
          <Input type='email' style={{ height: "45px", fontSize: "16px" }} />
        </label>
      </div>
      <div style={{
        width: "100%",
      }}>
        <label htmlFor="" style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <span style={{
            fontWeight: "bold",
            fontSize: "16px"
          }}>Mật khẩu</span>
          <Input type='password' style={{ height: "45px", fontSize: "16px" }} />
        </label>
      </div>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: 'space-between',
        gap: "10px",
        marginTop: "15px"
      }}>
        <label htmlFor="" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div style={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: "15px"
          }}>
            <input type='checkbox' style={{ width: "18px", height: "18px" }} />
            <span>Nhớ tài khoản</span>
          </div>
        </label>
        <Link to={""} style={{ fontSize: "15px" }}>Quên mật khẩu?</Link>
      </div>
      <Button type="primary" style={{ width: "100%", height: "45px", fontSize: "16px" }}>
        Đăng nhập
      </Button>
    </div>
  )
}

export default Form
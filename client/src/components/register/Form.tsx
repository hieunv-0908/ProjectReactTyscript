import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React from 'react'
import "../../css/register/Form.css"

function Form() {
    return (
        <div className="form-container" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",              
            padding: "20px",         
            // border: "1px solid #d9d9d9",
        }}>
            <div className="form-row" style={{
                display: "flex",
                gap: "15px",           
                width: "100%"
            }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px"
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Họ và tên đệm</span>
                    <Input type='text' style={{ height: "45px", fontSize: "16px" }} />
                </label>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px"
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tên</span>
                    <Input type="text" style={{ height: "45px", fontSize: "16px" }} />
                </label>
            </div>
            <div style={{ width: "100%" }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px"
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Email</span>
                    <Input type="email" placeholder='you@company.com' style={{ height: "45px", fontSize: "16px" }} />
                </label>
            </div>
            <div style={{ width: "100%" }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px"
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Password</span>
                    <Input type="password" style={{ height: "45px", fontSize: "16px" }} />
                </label>
            </div>
            <div className="form-checkbox" style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                // border:"1px solid",
                width:"100%"
            }}>
                <input type="checkbox" style={{ width: "18px", height: "18px" }} />
                <span>Bạn đồng ý với</span> <a href="">chính sách và điều kiện</a>
            </div>
            <div style={{ width: "100%" }}>
                <Button type="primary" style={{ width: "100%", height: "45px", fontSize: "16px" }}>
                    Đăng ký
                </Button>
            </div>
        </div>
    )
}

export default Form

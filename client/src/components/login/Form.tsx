import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../../css/login/forrm.css"
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store/store'
import { fetchUser } from '../../../redux/feature/user/userSlice'

function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  //-----------------------------------------------------------------------------------
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState<string>("")
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])
  return (
    <div className="login-form-container" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
      gap: "20px",
      width: "100%",
      maxWidth: "500px"
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
            fontSize: "16px"
          }}>Email</span>
          <Input type='email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} style={{ height: "45px", fontSize: "16px" }} />
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
          <Input type='password' value={pass} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPass(e.target.value) }} style={{ height: "45px", fontSize: "16px" }} />
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
            <input type='checkbox' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCheckbox(e.target.checked) }} style={{ width: "18px", height: "18px" }} />
            <span>Nhớ tài khoản</span>
          </div>
        </label>
        <Link to={""} style={{ fontSize: "15px" }}>Quên mật khẩu?</Link>
      </div>
      <Button type="primary" onClick={() => {
        
      }} style={{ width: "100%", height: "45px", fontSize: "16px" }}>
        Đăng nhập
      </Button>
    </div>
  )
}

export default Form
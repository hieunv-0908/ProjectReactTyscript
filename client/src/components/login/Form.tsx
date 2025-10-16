import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import "../../css/login/forrm.css"
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store/store'
import { fetchUser } from '../../../redux/feature/user/userSlice'
import { notification } from 'antd'

function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  //-----------------------------------------------------------------------------------
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState<string>("")
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passFocus, setPassFocus] = useState<boolean>(false);
  const [checkFocus, setCheckFocus] = useState<boolean>(false);
  const navigate = useNavigate()
  const checkEmail = (email: string) => {
    return users.some(s => s.email === email)
  }
  const checkPass = (pass: string) => {
    return users.some(s => s.password === pass)
  }

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
          <Input type='email' value={email} onFocus={() => { setEmailFocus(true) }} onBlur={() => { setEmailFocus(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} style={{ height: "45px", fontSize: "16px" }} />
          {emailFocus ? (email.length === 0 ? <span style={{ color: "red" }}>Email không được để trống.</span> : <></>) : <></>}
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
          <Input type='password' value={pass} onFocus={() => { setPassFocus(true) }} onBlur={() => { setPassFocus(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPass(e.target.value) }} style={{ height: "45px", fontSize: "16px" }} />
          {passFocus ? (pass.length === 0 ? <span style={{ color: "red" }}>Password không được để trống.</span> : <></>) : <></>}
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
        if (email.length === 0) {
          notification.warning({
            message: "Thất bại",
            description: "Email không được để trống !",
            placement: "topRight",
            duration: 3,
          })
          return
        }
        if (pass.length === 0) {
          notification.warning({
            message: "Thất bại",
            description: "Pass không được để trống !",
            placement: "topRight",
            duration: 3,
          })
          return
        }
        if (!checkEmail(email)) {
          notification.warning({
            message: "Thất bại",
            description: "Tài khoản hoặc mật khẩu sai!!",
            placement: "topRight",
            duration: 3,
          })
          return
        }
        if (!checkPass(pass)) {
          notification.warning({
            message: "Thất bại",
            description: "Tài khoản hoặc mật khẩu sai!!",
            placement: "topRight",
            duration: 3,
          })
          return
        }
        notification.success({
          message: "Thành công",
          description: "Đăng nhập thành công",
          placement: "topRight",
          duration: 3,
        })
        sessionStorage.setItem("user", JSON.stringify({ email }));
        navigate("/manager/subject")
      }} style={{ width: "100%", height: "45px", fontSize: "16px" }}>
        Đăng nhập
      </Button>
    </div>
  )
}

export default Form
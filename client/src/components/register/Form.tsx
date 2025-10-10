import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React, { useEffect, useState } from 'react'
import "../../css/register/Form.css"
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../../../redux/store/store"
import { fetchUser, registerUser } from "../../../redux/feature/user/userSlice"
import notification from 'antd/es/notification'

import {
    AppstoreOutlined,
    RiseOutlined,
    BookOutlined,
    CopyOutlined,
    BellOutlined,
    SettingOutlined,
    DeleteOutlined,
    EditOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ExclamationCircleOutlined,
    CloseOutlined,
    CloseCircleFilled,
    AppstoreFilled,
    BellFilled,
    QuestionCircleFilled,
    SettingFilled,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'

function Form() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.user);
    //-----------------------------------------------------------------------------------
    const [surname, setSurname] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const [isFocusSurname, setIsFocusSurname] = useState<boolean>(false)
    const [isFocusName, setIsFocusName] = useState<boolean>(false)
    const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false)
    const [isFocusPass, setIsFocusPass] = useState<boolean>(false)
    const navigate = useNavigate()

    const [checkbox, setCheckbox] = useState<boolean>(false);
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePass = (pass: string): boolean => {
        return users.some(u => u.password === pass)
    };


    if (loading) return <span>Đang đợi dữ liệu...</span>
    if (error) return <span>Lỗi {error}</span>
    return (
        <div className="form-container" style={{
            width: "600px",
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
                    gap: "10px",
                    width: "50%",
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Họ và tên đệm</span>
                    <Input type='text' value={surname} onFocus={() => {
                        setIsFocusSurname(true)
                    }} onBlur={() => { setIsFocusSurname(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSurname(e.target.value) }} style={{ height: "45px", fontSize: "16px", width: "100% ", border: `${isFocusSurname && surname.length === 0 ? "1px solid red" : ""}` }} />
                </label>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px",
                    width: "50%",
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tên</span>
                    <Input value={name} onFocus={() => {
                        setIsFocusName(true)
                    }} onBlur={() => { setIsFocusName(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }} type="text" style={{ height: "45px", fontSize: "16px", width: "100%", border: `${isFocusName && name.length === 0 ? "1px solid red" : ""}` }} />
                </label>
            </div>
            <div style={{ width: "100%" }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px"
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Email</span>
                    <Input value={email} onFocus={() => {
                        setIsFocusEmail(true)
                    }} onBlur={() => { setIsFocusEmail(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} type="email" placeholder='you@company.com' style={{ height: "45px", fontSize: "16px", border: `${isFocusEmail && email.length === 0 ? "1px solid red" : ""}` }} />
                </label>
            </div>
            <div style={{ width: "100%" }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "10px"
                }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Password</span>
                    <Input value={pass} onFocus={() => {
                        setIsFocusPass(true)
                    }} onBlur={() => { setIsFocusPass(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPass(e.target.value) }} type="password" style={{ height: "45px", fontSize: "16px", border: `${isFocusPass && pass.length === 0 ? "1px solid red" : ""}` }} />
                </label>
            </div>
            <div className="form-checkbox" style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                // border:"1px solid",
                width: "100%",
            }}>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCheckbox(e.target.checked) }} type="checkbox" style={{ width: "18px", height: "18px" }} />
                <span>Bạn đồng ý với</span> <a href="">chính sách và điều kiện</a>
            </div>
            <div style={{ width: "100%" }}>
                <Button type="primary" style={{ width: "100%", height: "45px", fontSize: "16px" }} onClick={() => {
                    const valid = checkbox && surname && name && pass && email
                    if (!valid) {
                        console.log("Thông tin thiếu");
                        notification.warning(
                            {
                                message: "Thất bại",
                                description: "Đăng ký thất bại",
                                placement: "topRight",
                                closeIcon: <CloseCircleFilled style={{ color: '#7A8294', backgroundColor: "#ffff", fontSize: 20, borderRadius: "50%" }} />,
                                duration: 3,
                            }
                        )
                        return;
                    }

                    if (!validateEmail(email)) {
                        notification.warning(
                            {
                                message: "Email không hợp lệ",
                                description: "VUi lòng nhập đúng định dạng email",
                                placement: "topRight",
                                duration: 3,
                            }
                        )
                        return
                    }

                    if (pass.length < 8) {
                        notification.warning(
                            {
                                message: "Pass không hợp lệ",
                                description: "Pass phải có trên 8 ký tự.",
                                placement: "topRight",
                                duration: 3,
                            }
                        )
                        return
                    }

                    if (validatePass(pass)) {
                        notification.warning(
                            {
                                message: "Pass đã được sử dụng",
                                description: "Vui lòng sử dụng pass khác.",
                                placement: "topRight",
                                duration: 3,
                            }
                        )
                        return
                    }

                    notification.success(
                        {
                            message: "Đăng ký thành công",
                            description: "Đang ký hoành thành chuyển tới trang đăng nhập trong giây lát.",
                            placement: "topRight",
                            duration: 3,
                        }
                    )
                    setTimeout(() => {
                        navigate("/login")
                    }, 1000)
                    dispatch(registerUser({ first_name: surname, last_name: name, email: email, password: pass }))
                    setCheckbox(false)
                    setName("")
                    setEmail("")
                    setSurname("")
                    setPass("")
                }}>
                    Đăng ký
                </Button>
            </div>
        </div>
    )
}

export default Form

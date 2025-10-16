import React from 'react'
import Header from '../components/login/Header'
import Footer from '../components/login/Footer'
import FormLogin from '../components/login/Form'

function Login() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            marginTop:"100px",
            flexDirection: "column",
            gap: "20px",
            width: '100%',
            height:"100%",
            // border:"1px solid"
        }}>
            <Header></Header>
            <FormLogin></FormLogin>
            <Footer></Footer>
        </div>
    )
}

export default Login
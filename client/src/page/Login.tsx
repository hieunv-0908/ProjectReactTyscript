import React from 'react'
import Header from '../components/login/Header'
import Form from '../components/login/Form'
import Footer from '../components/login/Footer'

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
            <Form></Form>
            <Footer></Footer>
        </div>
    )
}

export default Login
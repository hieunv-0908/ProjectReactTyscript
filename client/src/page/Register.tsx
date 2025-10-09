import React from 'react'
import Header from "../components/register/Header"
import Form from "../components/register/Form"
import Footer from "../components/register/Footer"
import "../css/register/register.css"
function Register() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "24px",
      width: '100%',
      paddingTop: "96px",
      paddingBottom: "96px",
      backgroundColor:"#fff"
      // border:"1px solid"
    }}>
      <Header></Header>
      <Form></Form>
      <Footer></Footer>
    </div>
  )
}

export default Register
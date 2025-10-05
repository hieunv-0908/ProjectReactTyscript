import React from 'react'
import Header from "../components/register/Header"
import Form from "../components/register/Form"
import Footer from "../components/register/Footer"
function Register() {
  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      gap:"20px",
      width:'100%',
      marginTop:"100px"
      // border:"1px solid"
    }}>
        <Header></Header>
        <Form></Form>
        <Footer></Footer>
    </div>
  )
}

export default Register
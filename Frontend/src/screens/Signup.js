import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Link } from "react-router-dom";

export default function Signup() {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",location:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://backend-4mhl.onrender.com/api/create-user",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
    })
    const json =await response.json()
    console.log(json)

    if(!json.success){
        alert("Enter valid credentials")
    }
  };
  const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Text className="fw-bold fs-1">User Ragistration</Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="name" value={credentials.name} onChange={onchange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={onchange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={credentials.password} onChange={onchange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control type="text" placeholder="Address" name="location" value={credentials.location} onChange={onchange}/>
          </Form.Group>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              variant="primary"
              className="btn btn-outline-success w-100 "
              style={{fontSize:"15px"}}
              type="submit"
            >
              Submit
            </Button>
            <Link to="/login" className="btn btn-outline-danger w-100 " style={{fontSize:"15px"}}>
              Already-A-User
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link ,useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
    const response=await fetch(`${process.env.REACT_APP_BACK_URL}/api/login-user`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json =await response.json();
    console.log(json)
   

    if(!json.success){
      alert("Enter Valid Credantials")
    }
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

  }

  const onchange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Text className="fw-bold fs-1">User Login</Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </Form.Group>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              variant="primary"
              className="btn btn-outline-success w-100 "
              style={{ fontSize: "12px" }}
              type="submit"
            >
              Login
            </Button>
            <Link
              to="/signup"
              className="btn btn-outline-danger w-100 "
              style={{ fontSize: "12px" }}
            >
              Create-An-Account
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Login;

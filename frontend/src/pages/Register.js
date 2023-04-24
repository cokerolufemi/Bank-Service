import React, { useState } from "react";
import axios from "axios";
import {Link,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col } from "react-bootstrap";



function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const HandleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:4000/signup", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
        <Container className="register-container">
        <Row>
          <Col id="cols">
            <Form autoComplete="on">
              
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control type="email"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}} placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}} placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" onClick={HandleRegister}>create Account</Button>
      
      <p style={{paddingTop: "20px"}}>Already have Account<Link style={{textDecoration: "none", backgroundColor:"blue", color: "white", 
                 padding: "6px", borderRadius: "6px", marginLeft: "20px"
                }}id="butt" to="/login">Login</Link> </p>
      </Form>
      </Col>
      </Row>
      </Container>
    </div>
  )
}

export default Register;
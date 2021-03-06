import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import "./Login.css";
import { useHistory } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {Container, Row, Col} from 'react-bootstrap'

import AuthenticationService from "../../services/AuthenticationService"
import UserService from "../../services/UserService"

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const login = (e) => {
        e.preventDefault();
        let user = {
            username: email,
            password: password,
            fetConfig: 0,
            authorities: "",
            firstName: "",
            lastName: ""
        };

        AuthenticationService.authenticate(user)
            .then((res) => {
                if(res == "failed"){
                    handleShowAlert();
                } else {
                    history.push({
                        pathname: "/",
                    });
                }
            });
    };

    const[showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
    }

    const handleNotShowAlert = () => {
        setShowAlert(false);
    }

    return (
        <div className="loginPage">
            <NavBar />
            
            <Container className="LoginPage mt-5">
                <h1 className="d-flex justify-content-center mb-4" style={{fontSize:'25px'}}>Welcome to &nbsp; <span style={{color:'green', marginTop: "0px"}}> COVID-TRACK </span>!</h1>
                <Alert style={{ width: "500px", margin: 'auto' }} show={showAlert} variant="danger" onClose={handleNotShowAlert}>
                    <p className="mb-0">Your email or password is incorrect. Please try again.</p>
                </Alert>
                <Form className="mt-4">
                    <Form.Group controlId="email" style={{width:"500px", margin:'auto'}}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control autoFocus required name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3" style={{width:"500px", margin:'auto'}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Enter password"/>
                        <div className="mt-4 mb-1" style={{textAlign:'center'}}>
                            <Form.Text className="text-muted">
                                We'll never share your personal details with anyone else.
                            </Form.Text>
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={login} style={{margin:'auto',display:'block', padding: '5px 20px'}}>
                        Login
                    </Button>
                    
                </Form>
            </Container>

            <div style={{position: "fixed", bottom:"0px"}}>
                <Footer/>
            </div>
        </div>
    );
}
// import { createContext, useState, useEffect } from 'react'
// InputGroup and FormControl from 'react-bootstrap' removed to reduce unused errors
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';

// Removed import { Redirect } from "react-router-dom"; to reduce unused errors
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Keeping this here as I will fix the jwt soon
import { useJwt } from "react-jwt";

// form validation rules 
const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

function LoginPage(){
    
    // Removed setValue, getValues, and errors to reduce unused errors
    const { register, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(loginSchema),
    });

    

    const onSubmit = async (data) => {

        // JWT Set Up WIP
        //let storage = require('../tokenStorage.js');
        //let obj = {email:email,password:password.value,jwtToken:storage.retrieveToken()};
        //let js = JSON.stringify(obj)
        console.log(data)
        var send = JSON.stringify(data);
        console.log(send)
        try {
            const response = await fetch('http://localhost:5000/api/login',
                {
                    method: 'POST',
                    body: send,
                    headers: {
                        'Content-Type':'application/json'
                    }
                });
            var txt = await response.text();
            var res = JSON.parse(txt);
            if (res.error.length > 0) {
                console.log("API Error:" + res.error);
                
            }
            else {
                var user =  {id:res.id,firstName:res.firstName,lastName:res.lastName}
                localStorage.setItem('user_data', JSON.stringify(user));
                console.log(res, user, localStorage.getItem('user_data'));
                window.location.href = '/Home';
                // <Redirect to="/Home" />
            }
        }
        catch (e) {
            console.log(e.toString());
        }
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h5>{'Login'}</h5>
                    <hr />
                    <Row>
                        <Col>
                            <Form noValidate onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            {...register("email")}
                                            // isInvalid={errors.email}                                        
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {/* {errors.email.message} */}
                                        </Form.Control.Feedback> 
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="productName"
                                            {...register("password")}
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Group as={Col} controlId="formControls">
                                    <Button
                                        type="submit"
                                        disabled={formState.isSubmitting}
                                        className="btn btn-primary">
                                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1">
                                        </span>}
                                        Login
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default LoginPage
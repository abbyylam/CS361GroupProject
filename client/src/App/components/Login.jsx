import React from 'react'

import { Form, Button } from 'react-bootstrap'

const Login = (props) => (
    <div>
        <div className="text-center">
            <h2>Welcome Back!</h2>
            <h5>Login to continue your account</h5>
        </div>
        <hr />
        <Form>
            <Form.Group controlId="formBasicEmail" style={{marginTop: "25px"}}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="abcd@gmail.com" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{marginBottom: "40px"}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <hr style={{marginBottom: "40px"}}/>
            <div className="text-center">
                <Button variant="secondary" type="submit">
                    Login
                </Button>
            </div>
        </Form>
    </div>
)

export default Login
import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

import { LoginAccount } from '../requests/Api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    function updatePassword(e) {
        setPassword(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault()

        LoginAccount(email, password)
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert(result.message)
            } else {
                alert(result.message)
            }
        })
    }

    return (
        <div>
            <div className="text-center">
                <h2>Welcome Back!</h2>
                <h5>Login to continue your account</h5>
            </div>
            <hr />
            <Form>
                <Form.Group controlId="formBasicEmail" style={{marginTop: "25px"}}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="abcd@gmail.com" 
                        onChange={updateEmail}
                        value={email}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{marginBottom: "40px"}}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={updatePassword}
                        value={password}
                        required
                    />
                </Form.Group>

                <hr style={{marginBottom: "40px"}}/>
                <div className="text-center">
                    <Button 
                        variant="secondary" 
                        type="submit"
                        onClick={onSubmit}
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Login
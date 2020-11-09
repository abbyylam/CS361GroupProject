import React from 'react'

import { Form, Button } from 'react-bootstrap'

const Signup = (props) => (
    <div>
        <div className="text-center">
            <h2>Create a new account</h2>
            <h5>Come join the Ethical Eating</h5>
        </div> 
        <hr /> 
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="abcd@gmail.com" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                    <ul>
                        <li>8 characters minimum</li>
                        <li>One uppercase</li>
                        <li>One number</li>
                    </ul>
                </Form.Text>
            </Form.Group>
            <hr />
            <div className="text-center">
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    </div>
)

export default Signup
import React, { useState } from 'react'
import { CreateAccount } from '../requests/Api';

import { Form, Button } from 'react-bootstrap'

function Signup() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const updateEmailAddress = (e) => {
        setEmailAddress(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    function passwordMeetsRequirements(password) {
        if (!password) return false;

        let requirements = /(?=[A-Za-z0-9]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g;
        return requirements.test(password);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Email cannot be empty
        if (!emailAddress || emailAddress === '') {
            alert('Invalid email address');
            return;
        }

        // Password must meet requirements
        if (!(passwordMeetsRequirements(password))) {
            alert('Invalid password');
            return;
        }

        // Ask the API to create the account
        CreateAccount(emailAddress, password)
            .then(res => res.json())
            .then((result) => {
                // Handle API success
                if (result.success) {
                    // todo - dismiss the modal
                    alert(result.message);
                } else {
                    alert(result.message);
                }
            });
    };

    return (
        <div>
            <div className="text-center">
                <h2>Create a new account</h2>
                <h5>Come join the Ethical Eating</h5>
            </div> 
            <hr /> 
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="abcd@gmail.com" value={emailAddress} onChange={updateEmailAddress} />
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={updatePassword} />
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
                    <Button variant="secondary" type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Signup;

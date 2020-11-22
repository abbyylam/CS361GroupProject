import React from 'react';
import Modal from 'react-modal';

import Signup from '../components/Signup'
import Login from '../components/Login'

import { Container, Row, Col } from 'react-bootstrap'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '70vw'
    }
};

const LoginSignup = (props) => (
    <Modal
        isOpen={!!props.isModalOpen}
        onRequestClose={props.closeModal}
        contentLabel="Login/Signup Modal"
        style={customStyles}
    >
        <Container>
            <Row>
                <Col style={{borderRight: "1px solid grey"}}>
                    <Login closeModal={props.closeModal}/>
                </Col>
                <Col>
                    <Signup closeModal={props.closeModal}/>
                </Col>
            </Row>
        </Container>
    </Modal>
)

export default LoginSignup;
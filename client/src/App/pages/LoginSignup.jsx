import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

const LoginSignup = (props) => (
    <Modal
        isOpen={!!props.isModalOpen}
        onRequestClose={props.closeModal}
        contentLabel="Login/Signup Modal"
    >
        <h3>This is Modal</h3>
    </Modal>
)

export default LoginSignup;
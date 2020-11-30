import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoginSignup from '../pages/LoginSignup';
import ModalButton from '../components/ModalButton'
import { Dropdown } from 'react-bootstrap'

import { LogoutAccount } from '../requests/Api'

function Header(props) {
    const [searchValue, setSearchValue] = useState("");
    const [isModalOpen, setIsOpen] = useState("");

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function onClickLogout() {
        LogoutAccount()
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert(result.message)
                document.location.reload()
            } else {
                alert(result.message)
                document.location.reload()
            }
        })
    }

    return(
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Ethical Eating
                    </Link>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search for a recipe" aria-label="Search" onChange={updateSearchValue} />
                        <Link to={"/search?name=" + searchValue}>
                            <button className="btn btn-light" type="submit">Search</button>
                        </Link>
                    </form>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className={`nav-item ${
                                props.location.pathname === "/" ? "active" : ""
                            }`}>
                                {props.hasSessionId ? 
                                    <Link className="nav-link" to="/recipe-book">
                                        My Recipe Book
                                    </Link>
                                    :
                                    <ModalButton openModal={openModal} isModal={true}/>
                                }
                            </li>
                            <li className={`nav-item ${
                                props.location.pathname === "/" ? "active" : ""
                            }`}>
                                <Link className="nav-link" to="/create-recipe">
                                    Create a Recipe
                                </Link>
                            </li>
                            <li className={`nav-item ${
                                props.location.pathname === "/" ? "active" : ""
                            }`}>
                                {props.hasSessionId ? 
                                        <Dropdown>
                                            <Dropdown.Toggle variant="outline-light" >
                                                {props.username}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={onClickLogout} >
                                                    Logout
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    :
                                        <ModalButton openModal={openModal}/>
                                }
                            </li>
                        </ul>
                    </div>
                    <LoginSignup 
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Header);
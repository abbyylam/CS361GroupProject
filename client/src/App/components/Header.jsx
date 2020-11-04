import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function Header(props) {
    const [searchValue, setSearchValue] = useState("");

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

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
                                <Link className="nav-link" to="/recipe-book">
                                    My Recipe Book
                                </Link>
                            </li>
                            <li className={`nav-item ${
                                props.location.pathname === "/" ? "active" : ""
                            }`}>
                                <Link className="nav-link" to="/create-recipe">
                                    Create a Recipe
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Header);
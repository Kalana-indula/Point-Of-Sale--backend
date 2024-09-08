import * as Icon from 'react-bootstrap-icons';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Navbar = () => {

    const navigate = useNavigate();

    //Detecting login/logout status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Checking login status
    const checkLoginStatus=()=>{
        const token = localStorage.getItem("token");
        //If token exists , set state variable to true , otherwise false
        setIsLoggedIn(!!token);
    }

    useEffect(() => {
        //Checking logging status initially
        checkLoginStatus();

        //Detect storage changes to update logging status dynamically
        window.addEventListener("storage",checkLoginStatus);

        //Cleanup listener as component unmounted
        return()=>{
            window.removeEventListener("storage",checkLoginStatus);
        };

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <>

            <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"><i className="bi bi-house-door-fill"></i></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                                <Link className="nav-link" to={`/allitems`}>All Items</Link>
                                <Link className="nav-link" to={`/actions`}>Actions</Link>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"
                                       href="#"
                                       role="button"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        <i className="bi bi-person-circle"></i> User
                                    </a>
                                    <ul className="dropdown-menu">
                                        {isLoggedIn ? (
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={handleLogout}>
                                                    <i className="bi bi-box-arrow-left"></i> Logout
                                                </a>
                                            </li>
                                        ) : (
                                            <li>
                                                <a className="dropdown-item" href="/login/user">
                                                    <i className="bi bi-box-arrow-in-right"></i> Login
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
}

export default Navbar;
import Cookies from 'js-cookie';
import React from 'react';
import ReactstrapDropdown from "./ReactstrapDropdown";

const Navbar = () => {

    function logOut(){
        Cookies.remove("mentorID")
        Cookies.remove("userID")
        localStorage.removeItem("userData")
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="/">Report Management System</a>
            <div style={{ width: "50%", margin: "20px auto" }}>
                    <ReactstrapDropdown />
            </div>
            <h8 style={{color : "white"}} className='mr-2'>{JSON.parse(localStorage.getItem("userData")).email}</h8>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul style={{width : "200px"}}  className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/my-report">My Report</a></li>
                        <li><a className="dropdown-item" href="/my-project">My Project</a></li>
                        <li><a className="dropdown-item" href="/create-report">Create Report</a></li>
                        <li><a className="dropdown-item" href="/choose-project">Choose Project</a></li>
                        <li><a className="dropdown-item" href="/create-project">Create Project</a></li>
                        <li><a className="dropdown-item" href="/chat">Chat</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={logOut} href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

import Cookies from 'js-cookie';
import React from 'react';

const NavbarForAdmin = () => {

    function logOut(){
        Cookies.remove("mentorID")
        Cookies.remove("userID")
        Cookies.remove("adminID")
        localStorage.removeItem("adminData")
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="/admin">New Sky</a>
            <h8 className='mr-2' style={{color : "white"}}>Khang Nguyễn</h8>                
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul style={{width : "200px"}} className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/admin/chat">Chat</a></li>
                        <li><a className="dropdown-item" href="/admin/list-report">Report</a></li>
                        <li><a className="dropdown-item" href="/admin/list-project">Project</a></li>
                        <li><a className="dropdown-item" href="/admin/list-user">User</a></li>
                        <li><a className="dropdown-item" href="/admin/my-reporttemplate">Report Template</a></li>
                        <li><a className="dropdown-item" href="/admin/create-project">Create Project</a></li>
                        <li><a className="dropdown-item" href="/admin/create-post">Create Post</a></li>
                        <li><a className="dropdown-item" href="/admin/create-report-template">Create Report Template</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={logOut} href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarForAdmin;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();

    const { auth, logout } = useAuth();

    const handleLogout = () => {
        logout();

        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white mb-3 mb-md-5">
            <div className="container-fluid px-md-5">
                <span id="sidebarToggle" type="button" className="navbar-toggler-icon"></span>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <img src="/public/vite.svg" className="rounded-circle" height="41px" width="41px"
                                    alt="User Photo" />
                                <i className="fas fa-chevron-down me-2"></i>
                                Halo, {auth.user.name}
                            </a>
                            <div className="dropdown-menu dropdown-menu-end position-absolute">
                                <a type="button" onClick={handleLogout} className="dropdown-item"
                                    >Log Out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
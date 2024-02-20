import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white mb-3">
            <div className="container-fluid px-5">
                <Link className="navbar-brand fst-italic" to="/">
                    <span className="text-primary-app fw-bold">Blog</span> Website
                </Link>
                <div>
                    <Link to="/login" className="btn btn-primary-app rounded-5">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
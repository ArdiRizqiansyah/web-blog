/* eslint-disable react/prop-types */
import Sidebar from "@components/user/sidebar/Sidebar";
import Navbar from "@components/user/navbar/Navbar";

const User = ({ children }) => {
    return (
        <div id="app-user" className="d-flex">
            <Sidebar />

            <div id="page-content-wrapper">
                <Navbar/>

                <main className="container-fluid px-md-5">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default User;
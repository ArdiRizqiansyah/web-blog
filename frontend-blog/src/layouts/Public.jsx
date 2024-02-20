/* eslint-disable react/prop-types */
import Navbar from "@components/public/Navbar";

const Public = ({ children }) => {
    return (
        <>
            <Navbar />

            <div className="container">
                {children}
            </div>
        </>
    );
}

export default Public;
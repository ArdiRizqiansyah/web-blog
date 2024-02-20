import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedLayout = () => {
    const { auth } = useAuth();
    const outlet = useOutlet();

    if (!auth || !auth.token) {
        return <Navigate to='/' />
    }

    return (
        <>
            {outlet}
        </>
    );
}
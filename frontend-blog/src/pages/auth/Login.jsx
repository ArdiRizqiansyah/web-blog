import Auth from "@layouts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    // context autentikasi
    const { login, auth } = useAuth();

    useEffect(() => {
        // Redirect ke halaman setelah berhasil login jika pengguna sudah otentikasi
        if (auth.token) {
            navigate('/user');
        }
    }, [auth]);

    // Data form login
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Validasi error form login
    const [errorValidation, setErrorValidation] = useState({
        message: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kirim permintaan login ke backend menggunakan axios
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
            const user = response.data;

            // Simpan informasi otentikasi pengguna menggunakan fungsi login dari konteks
            login(user.data);

            // Redirect ke halaman setelah berhasil login
            navigate('/user');
        } catch (error) {
            const response = error.response.data;
            console.error('Login error:', error.message);
            
            setErrorValidation({
                message: response.message ?? '',
                email: response.error ? response.error.email : '',
                password: response.error ? response.error.password : '',
            });
        }
    };

    return (
        <Auth>
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="card w-50 border-0 rounded-4">
                    <div className="px-5 py-3">
                        <Link to="/" className="text-decoration-none text-primary-app text-xs">
                            <i className="bi bi-chevron-left"></i> Back to website
                        </Link>
                        <h2 className="fw-bold mt-2">
                            Welcome !
                        </h2>
                        <p className="text-muted text-sm">
                            log in to get started.
                        </p>

                        {errorValidation.message && (
                            <div className="alert alert-danger d-flex gap-3">
                                <i className="bi bi-exclamation-circle"></i>
                                {errorValidation.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`form-control rounded-4 ${errorValidation.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errorValidation.email && (
                                    <div className="invalid-feedback">
                                        {errorValidation.email}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className={`form-control rounded-4 ${errorValidation.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password} 
                                    onChange={handleChange}
                                />
                                {errorValidation.password && (
                                    <div className="invalid-feedback">
                                        {errorValidation.password}
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary-app rounded-4 mt-3 w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Auth>
    );
}

export default Login;
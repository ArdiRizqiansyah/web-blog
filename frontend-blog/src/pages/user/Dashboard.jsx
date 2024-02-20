import User from "@layouts/User";
import Heading from "@components/user/Heading";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const { auth } = useAuth();
    const [totalCategory, setTotalCategory] = useState(0);
    const [totalPost, setTotalPost] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!auth || !auth.token) {
                    throw new Error('Token not found');
                }

                // Menjalankan permintaan ke API dengan menggunakan token untuk otorisasi
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                
                const data = response.data.data;

                // Mengatur data dashboard setelah mendapatkan respons dari API
                setTotalCategory(data.total_category);
                setTotalPost(data.total_post);
            } catch (error) {
                console.error('Error fetching dashboard data:', error.message);
                // Tangani kesalahan jika diperlukan
            }
        };

        fetchDashboardData();
    }, [auth]);

    return(
        <User>
            <Heading title="Dashboard" icon="bi bi-house-door"/>

            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="card border-0">
                        <div className="card-body d-flex align-items-center gap-3">
                            <div className="circular-wrap">
                                <i className="bi bi-bookmarks"></i>
                            </div>
                            <div>
                                <h5 className="card-title text-muted-app">Total Kategori</h5>
                                <span className="text-xl fw-bolder text-soft-primary-app">{totalCategory}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0">
                        <div className="card-body d-flex align-items-center gap-3">
                            <div className="circular-wrap">
                                <i className="bi bi-journal-bookmark"></i>
                            </div>
                            <div>
                                <h5 className="card-title text-muted-app">Total Postingan</h5>
                                <span className="text-xl fw-bolder text-soft-primary-app">{totalPost}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </User>
    );
}

export default Dashboard;
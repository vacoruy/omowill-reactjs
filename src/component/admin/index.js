import React, { useState } from "react";
import './admin.css';
import GoTopPage from "../includes/goTopPage";
import { Link } from "react-router-dom";
import Logo from '../../assets/img/logo.webp';
import AdminHome from "./home";
import axios from "axios";
import { toast } from "react-toastify";

function Admin() {
    const [adminInfo, setAdminInfo] = useState({
        email: 'admin@admin.com',
        password: 'admin',
    });

    const [adminAuth, setAdminAuth] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/adminLogin', adminInfo);

            if (response.status === 200) {
                switch (response.data.message) {
                    case 200:
                        setAdminAuth(true);                        
                        break;
                    case 400:
                        toast.error('no exist Admin Info. Please try again.');
                        setAdminAuth(false);
                        break;
                    default:
                        break;
                }
            } else {
                toast.error('Please check the network connection.');
            }

        } catch (error) {
            toast.error('Please check the network connection.');
        }
    };

    return (
        <div className="position-relative">
            <div className="d-flex admin-container">
                {
                    !adminAuth ? (
                        <div className="card mt-5 mb-5">
                            <div className="card-body p-3">
                                <div className="mb-3">
                                    <Link to=''>
                                        <img src={Logo} alt="BootstrapBrain Logo" height="57" />
                                    </Link>
                                </div>
                                <h2 className="fs-6 mb-4 fw-bold">Sign in to Admin Account</h2>
                                <div className="row gy-2 overflow-hidden">
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                placeholder="name@example.com"
                                                value={adminInfo.email}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setAdminInfo((prev) => ({ ...prev, [name]: value }));
                                                }}
                                                required
                                            />
                                            <label htmlFor="email" className="form-label">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                value={adminInfo.password}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setAdminInfo((prev) => ({ ...prev, [name]: value }));
                                                }}
                                                required
                                            />
                                            <label htmlFor="password" className="form-label">Password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid my-3">
                                            <button className="btn btn-primary btn-lg" type="submit" onClick={handleSubmit}>Log in</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <AdminHome />
                    )
                }

                <GoTopPage />
            </div>
        </div>
    )
}

export default Admin;

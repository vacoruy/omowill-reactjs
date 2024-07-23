import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.webp";

import { AuthContext } from '../../context/AuthProvider';

import "./navbar.css";

function Navbar() {
    const { omowillAuth, setCookie } = useContext(AuthContext);

    const [authFlg, setAuthFlg] = useState(omowillAuth.isAuth);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setAuthFlg(omowillAuth.isAuth);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [omowillAuth.isAuth]);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const logout = () => {
        omowillAuth.isAuth = false;
        setAuthFlg(omowillAuth.isAuth);
        setCookie(omowillAuth);
    }

    return (
        <nav className="navbar navbar-expand-xl fixed-top" style={{ backgroundColor: scrolled ? 'transparent' : 'white' }}>
            <div className="container-fluid">
                <Link className="navbar-brand navbar-response" to="/">
                    <div className="flex-nowrap flex-logo" style={{ alignItems: "center" }}>
                        <img className="p-0 logo" src={logo} alt="img" />
                    </div>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                >
                    <span className="fa fa-reorder"></span>
                </button>
                <div className='collapse navbar-collapse m-2' id="collapsibleNavbar">
                    <div className='me-auto'></div>
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{ display: scrolled ? 'none' : 'inherit' }}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/service"
                            >
                                <h6>サービス</h6>
                            </Link>
                        </li>
                        <li className="nav-item" style={{ display: scrolled ? 'none' : 'inherit' }}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/info"
                            >
                                <h6>お知らせ</h6>
                            </Link>
                        </li>
                        <li className="nav-item dropdown" style={{ display: scrolled ? 'none' : 'inherit' }}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/requestFileView"
                            >
                                <h6>動画・PDF閲覧申請</h6>
                            </Link>
                        </li>

                        <li className="nav-item dropdown" style={{ display: scrolled ? 'none' : 'inherit' }}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/pdfOrVideoView"
                            >
                                <h6>動画・PDF閲覧</h6>
                            </Link>
                        </li>

                        {authFlg ? (
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-dark font-primary"
                                    to="/mypage"
                                >
                                    <h6>マイページ</h6>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item nav-link-button">
                                    <Link className="nav-link nav-pr-0" to="/register">
                                        <button className="btn btn-primary">
                                            <h6>
                                                <i className="fa fa-user-plus"></i>
                                                &nbsp;&nbsp;&nbsp;ご利用登録
                                            </h6>
                                        </button>
                                    </Link>
                                </li>

                                <li className="nav-item nav-link-button">
                                    <Link className="nav-link nav-ps-0" to="/login">
                                        <button className="btn btn-primary">
                                            <h6>
                                                <i className="fa fa-user"></i>
                                                &nbsp;&nbsp;&nbsp;マイページ
                                            </h6>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}

                        {
                            authFlg ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <button className="btn btn-primary" onClick={logout}>
                                            <i className="fa fa-sign-out"></i>
                                            &nbsp;&nbsp;&nbsp;サインアウト
                                        </button>
                                    </Link>
                                </li>
                            ) : (null)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

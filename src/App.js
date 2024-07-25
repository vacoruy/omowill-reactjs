import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./context/AuthProvider";


import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import ProtectedRoute from "./component/includes/ProtectedRoute";

import Layout from "./component/includes/layout";
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import ForgotPage from './pages/forgotpage';

import ContactPage from './pages/contactpage';
import AbilityPage from './pages/abilitypage';
import InfoPage from './pages/infopage';
import ServicePage from './pages/servicepage';

import OftenQuestion from "./pages/oftenquestionpage";
import PrivacyPage from "./pages/privacypage";
import AboutusPage from "./pages/aboutuspage";
import TermsOfServicePage from './pages/termsofservicepage';

import Adminpage from './pages/Adminpage';
import MyPage from './pages/mypage';

import RequestFileViewPage from './pages/RequestFileViewPage';
import PdfOrVideoView from './pages/pdfOrVidePage';


import './App.css';
import './App-Responsive.css';

import { ConfigProvider } from "./context/ConfigProvider";
import ProtectedPaidRoute from './component/includes/ProtectedPaidRoute';

import AOS from "aos";
import "aos/dist/aos.css";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


function App() {
    // console.log(process.env.REACT_APP_API_KEY);

    AOS.init();
    
    return (
        <div className="App">
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <AuthProvider>
                    <ConfigProvider>
                        <BrowserRouter>
                            <ScrollToTop />
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/forgot" element={<ForgotPage />} />
                                    <Route index element={<HomePage />} />
                                    <Route path="ability" element={<AbilityPage />} />
                                    <Route path="info" element={<InfoPage />} />
                                    <Route path="service" element={<ServicePage />} />
                                    <Route path="contact" element={<ContactPage />} />
                                    <Route path="/faq" element={<OftenQuestion />} />
                                    <Route path="/privacy" element={<PrivacyPage />} />
                                    <Route path="/termsofservice" element={<TermsOfServicePage />} />
                                    <Route path="/aboutus" element={<AboutusPage />} />

                                    <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />

                                    <Route path="/omowill-admin" element={<Adminpage />} />
                                    <Route path="/requestFileView" element={<RequestFileViewPage />} />

                                    <Route path="/pdfOrVideoView" element={<ProtectedPaidRoute><PdfOrVideoView /></ProtectedPaidRoute>} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </ConfigProvider>
                </AuthProvider>
            </CookiesProvider>
            <ToastContainer position="bottom-right" theme="colored" />
            <Container />
        </div>
    );
}

export default App;

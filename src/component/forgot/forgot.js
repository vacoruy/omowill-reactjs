import { useState } from 'react';

import './forgot.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import isValidEmail from '../../util/checkEmail';
import { toast } from "react-toastify";

import logo from '../../assets/img/icon-0bc.webp';
import "react-toastify/dist/ReactToastify.css";

import Spinner from '../includes/spinner';


function Forgot() {
    const [chkEmail, setChkEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [comPwd, setComPwd] = useState('');
    const [spinnerFlg, setSpinnerFlg] = useState(false);

    const navigate = useNavigate();


    const checkEmail = async () => {
        if (email === '') {
            toast.error('メールアドレスを入力してください。');
        } else if (!isValidEmail(email)) {
            toast.error('メールの形式が正しくありません。');
        } else {
            try {
                setSpinnerFlg(true);

                var requestBody = {
                    email: email
                }

                const data = await axios.post(process.env.REACT_APP_API_URL + '/forgot', requestBody);

                setSpinnerFlg(false);

                if (data.data === 'email exist') {
                    setChkEmail(true);
                } else {
                    toast.error('メールアドレスが存在しません。')
                }

            } catch (error) {

            }
        }
    }

    const resetPwd = async () => {
        if (pwd === '') {
            toast.error('パスワードを入力してください。');
        } else if (comPwd === '') {
            toast.error('確認パスワードを入力してください。');
        } else if (pwd !== comPwd) {
            toast.error('パスワードが正しくありません。');
        } else {
            setSpinnerFlg(true);

            var resetRequestBody = {
                email: email,
                password: pwd
            }
            const resetData = await axios.post(process.env.REACT_APP_API_URL + '/reset', resetRequestBody);

            setSpinnerFlg(false);

            if (resetData.data === 'success') {
                toast.success('パスワードが正常に変更されました。');
                navigate('/login');
            } else {
                toast.error('もう一度お試しください。');
            }
        }
    }

    return (
        <div className='forgot-pwd'>
            <div className='reason-container container-fluid w-100 d-flex auth-container'>
                <div className='col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center reason-content auth-content order-1'>
                    <div className='d-flex justify-content-between flex-column home-intro'>
                        <h2 className='fw-bold'>震災/津波/災害/戦争</h2>
                        <p className='fw-bold'>
                            東日本大震災で・写真や手紙など
                            <br />
                            本来・想いを残してきたツールは
                            <br />
                            津波で跡形もなく消えてなくなる
                        </p>

                        <h1 className='fw-bold'><img alt="img" src={logo} /></h1>
                        <p className='fw-bold pt-2 home-reg-txt'>想いを「今」WEB上に残しておく</p>
                    </div>
                </div>

                <div className='col-sm-12 col-md-12 col-lg-6 px-5 order-2 auth-home auth-form-box'>
                    <div className="card">
                        <div className="card-body flex-column justify-content-between">
                            <h2 className='text-center fw-bold mb-0 auth-title-response'>パスワード<br />メールアドレス</h2>

                            {
                                !chkEmail && <input type='text' value={email} className='form-control w-100 forget-emailaddress-response' name='email' onChange={(e) => setEmail(e.target.value)} placeholder='メールアドレス' />
                            }

                            {
                                chkEmail && <input type="password" className='form-control w-100' name='pwd' value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='パスワード' />
                            }

                            {
                                chkEmail && <input type="password" className='form-control w-100' value={comPwd} name='comPwd' onChange={(e) => setComPwd(e.target.value)} placeholder='パスワード' />
                            }

                            <div className='d-flex justify-content-between auth-redirect-link'>
                                <Link to='/login'>
                                    <p className='font-primary text-dark'>ログイン</p>
                                </Link>

                                {
                                    chkEmail && <Link to='#' className="btn btn-primary fw-bold" onClick={resetPwd}>
                                        <p className='font-primary' style={{ padding: '4px' }}>リセット</p>
                                    </Link>
                                }

                                {
                                    !chkEmail &&
                                    <Link to='#' className="btn btn-primary fw-bold" onClick={checkEmail}>
                                        <p className='font-primary' style={{ padding: '4px' }}>メール送信</p>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                spinnerFlg && <Spinner />
            }
        </div >
    )
}

export default Forgot;
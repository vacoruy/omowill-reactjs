import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import $ from 'jquery';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

import logo from '../../assets/img/logo-pb.webp';

import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../includes/spinner';

function Login() {
    const { omowillAuth, handleLogin, setCookie, getUserData } = useContext(AuthContext);
    const [authInfo, setLoginInfo] = useState(omowillAuth);

    const [spinnerFlg, setSpinnerFlg] = useState(false);

    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;

        setLoginInfo(({ isAuth, id, userInfo }) => (
            {
                isAuth: isAuth,
                id: id,
                userInfo: {
                    ...userInfo,
                    [name]: value
                }
            }))
    }

    useEffect(() => {
        setLoginInfo(omowillAuth);
    }, [omowillAuth]);

    const loginAction = async () => {
        if (authInfo.userInfo.email === '') {
            toast.error('メールアドレスを入力してください。');
        } else if (authInfo.userInfo.password === '') {
            toast.error('パスワードを入力してください。');
        } else if (!$('#loginCheckBox').prop('checked')) {
            toast.error('サービス規約に同意する必要があります。');
        } else {
            setSpinnerFlg(true);

            var result = await handleLogin(authInfo.userInfo);

            if (result === false) {
                setSpinnerFlg(false);
                authInfo.isAuth = false;
                toast.error('メールアドレスまたはパスワードが正しくありません。');
                setCookie(authInfo);
            } else {
                authInfo.isAuth = true;
                authInfo.userInfo = result;
                authInfo.id = result.id;

                setLoginInfo(authInfo);
                setCookie(authInfo);

                await getUserData();

                navigate('/');
                setSpinnerFlg(false);
            }
        }
    }


    return (
        <div>
            <div className='reason-container container-fluid w-100 d-flex auth-container'>
                <div className='col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center reason-content auth-content order-1'>
                    <div className='d-flex justify-content-between flex-column home-intro'>
                        <h3 className='mb-4'>震災/津波/災害/戦争</h3>
                        <h5>
                            東日本大震災で・写真や手紙など <br />
                            本来・想いを残してきたツールは<br />
                            津波で跡形もなく消えてなくなる<br />
                        </h5>

                        <h3 className='en mt-5'><img src={logo} className="font-logo" alt="font-logo"/></h3>
                        <h5>想いを「今」WEB上に残しておく</h5>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-6 px-5 order-2 auth-home auth-form-box'>
                    <div className="card">
                        <div className="card-body flex-column justify-content-between">
                            <h2 className='text-center fw-bold mb-0 auth-title-response'>ログイン</h2>
                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='email'
                                placeholder='メールアドレス'
                                autoComplete='auto'
                                value={authInfo.userInfo.email}
                                onChange={handleLoginChange}
                            />
                            <input
                                type="password"
                                className='form-control w-100 auth-input-response'
                                name='password'
                                placeholder='パスワード'
                                autoComplete='new-password'
                                value={authInfo.userInfo.password}
                                onChange={handleLoginChange}
                            />
                            <div className="form-check auth-input-response d-flex justify-content-between w-100">
                                <div className='agreeTerms'>
                                    <input
                                        className="form-check-input border border-1 checkBox-bgColor"
                                        type="checkbox"
                                        id="loginCheckBox"
                                        name="option1"
                                        value="something" />
                                    <label htmlFor='loginCheckBox' className="form-check-label">
                                        利用規約に同意する
                                    </label>
                                </div>
                                <Link to='/privacy'>
                                    <p className='font-primary text-dark'>詳細を見る</p>
                                </Link>
                            </div>
                            <div className='w-100 text-center auth-btn-response'>
                                <button type="button" className="btn btn-primary fw-bold btn-login" onClick={() => loginAction()}>ログイン</button>
                            </div>
                            <div className='d-flex justify-content-between auth-redirect-link'>
                                <Link to='/forgot'>
                                    <p className='text-dark cursor-pointer'>パスワードをお忘れの方  </p>
                                </Link>
                                <Link to='/register'>
                                    <p className='font-primary text-dark'>ご利用登録</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                spinnerFlg ? <Spinner /> : (null)
            }
        </div>
    )
}

export default Login;
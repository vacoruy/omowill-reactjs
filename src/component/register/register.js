import { useContext, useState } from 'react';
import $ from 'jquery';
import isValidEmail from '../../util/checkEmail';
import logo from '../../assets/img/logo-pb.webp';
import { toast } from 'react-toastify';
import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../includes/spinner';

function Register() {
    const getDate = () => {
        const today = new Date();

        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const { omowillAuth, setCookie } = useContext(AuthContext);
    const [omowillAuthInfo, setRegInfo] = useState(omowillAuth);
    const [spinnerFlg, setSpinnerFlg] = useState(false);

    const [birth, setBirthDate] = useState(getDate);

    useEffect(() => {
        setRegInfo(omowillAuth);

        omowillAuthInfo.userInfo.birthDate = birth;
    }, [omowillAuthInfo]);

    const navigate = useNavigate();

    const regAction = async () => {

        if (omowillAuthInfo.userInfo.firstName === '') {
            toast.error('姓を入力してください。');
        } else if (omowillAuthInfo.userInfo.lastName === '') {
            toast.error('名前を入力してください。');
        } else if (omowillAuthInfo.userInfo.birthDate === '') {
            toast.error('誕生日を入力してください。');
        } else if (omowillAuthInfo.userInfo.prefectures === '') {
            toast.error('都道府県を入力してください。');
        } else if (omowillAuthInfo.userInfo.address1 === '') {
            toast.error('住所1を入力してください。');
        } else if (omowillAuthInfo.userInfo.address2 === '') {
            toast.error('住所2を入力してください。');
        } else if (omowillAuthInfo.userInfo.postalCode === '') {
            toast.error('郵便番号を入力してください。');
        } else if (omowillAuthInfo.userInfo.apartment === '') {
            toast.error('アパート名を入力してください。');
        } else if (omowillAuthInfo.userInfo.email === '') {
            toast.error('メールアドレスを入力してください。');
        } else if (!isValidEmail(omowillAuthInfo.userInfo.email)) {
            toast.error('メールの形式が正しくありません。');
        } else if (omowillAuthInfo.userInfo.password === '') {
            toast.error('パスワードを入力してください。');
        } else if (omowillAuthInfo.userInfo.comPassword === '') {
            toast.error('確認パスワードを入力してください。');
        } else if (omowillAuthInfo.userInfo.password !== omowillAuthInfo.userInfo.comPassword) {
            toast.error('パスワードが正しくありません。');
        } else if (omowillAuthInfo.userInfo.telephone) {
            toast.error('電話番号を入力してください。');
        } else if (!$('#regCheckBox').prop('checked')) {
            toast.error('サービス規約に同意する必要があります。')
        } else {

            setSpinnerFlg(true);

            try {
                const requestBody = omowillAuthInfo.userInfo;
                const data = await axios.post(process.env.REACT_APP_API_URL + '/register', requestBody);

                var tmp = omowillAuthInfo;

                if (data.data === 'email already exists') {
                    setSpinnerFlg(false);
                    toast.error('メールアドレスが既に存在します。');
                } else {
                    tmp.isAuth = true;
                    tmp.id = Number(data.data);
                    tmp.userInfo.id = Number(data.data);
                    setCookie(tmp);
                    setRegInfo(tmp);

                    try {
                        await axios.post(process.env.REACT_APP_API_URL + '/getUserData', tmp);

                    } catch (error) {
                        console.log(error)
                    }

                    setSpinnerFlg(false);
                    toast.success('ご利用登録が成果的に行われました。');
                    navigate('/');
                }

            } catch (error) {
                // Handle error if necessary
            }
        }
    }

    const handleRegChange = (e) => {
        const { name, value } = e.target;
        if (name === 'birthDate') {
            setBirthDate(value);
        }

        setRegInfo(({ isAuth, userInfo }) => (
            {
                isAuth: isAuth,
                userInfo: {
                    ...userInfo,
                    [name]: value
                }
            }))
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
                <div className='col-sm-12 col-md-12 col-lg-6 px-5 order-2 auth-home auth-form-box reg-form-box'>
                    <div className="card">
                        <div className="card-body flex-column justify-content-between">
                            <h2 className='text-center fw-bold mb-0 auth-title-response mb-3'>ご利用登録</h2>
                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='firstName'
                                placeholder='姓'
                                value={omowillAuthInfo.userInfo.firstName}
                                onChange={handleRegChange}
                            />

                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='lastName'
                                placeholder='名前'
                                value={omowillAuthInfo.userInfo.lastName}
                                onChange={handleRegChange}
                            />

                            <input
                                type='date'
                                className='form-control w-100 auth-input-response'
                                name='birthDate'
                                value={omowillAuthInfo.userInfo.birthDate}
                                onChange={handleRegChange}
                            />

                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='prefectures'
                                placeholder='都道府県'
                                value={omowillAuthInfo.userInfo.prefectures}
                                onChange={handleRegChange}
                            />
                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='address1'
                                placeholder='住所１'
                                value={omowillAuthInfo.userInfo.address1}
                                onChange={handleRegChange}
                            />

                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='address2'
                                placeholder='住所２'
                                value={omowillAuthInfo.userInfo.address2}
                                onChange={handleRegChange}
                            />
                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='postalCode'
                                placeholder='Postal Code'
                                value={omowillAuthInfo.userInfo.postalCode}
                                onChange={handleRegChange}
                            />
                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='apartment'
                                placeholder='マンション名'
                                value={omowillAuthInfo.userInfo.apartment}
                                onChange={handleRegChange}
                            />
                            <input
                                type='text'
                                className='form-control w-100 auth-input-response'
                                name='email'
                                placeholder='メールアドレス'
                                value={omowillAuthInfo.userInfo.email}
                                onChange={handleRegChange}
                            />
                            <input
                                type="password"
                                className='form-control w-100 auth-input-response'
                                name='password'
                                placeholder='パスワード'
                                value={omowillAuthInfo.userInfo.password}
                                onChange={handleRegChange}
                            />
                            <input
                                type="password"
                                className='form-control w-100 auth-input-response'
                                name='comPassword'
                                placeholder='パスワード'
                                value={omowillAuthInfo.userInfo.comPassword}
                                onChange={handleRegChange}
                            />

                            <input
                                type="text"
                                className='form-control w-100 auth-input-response'
                                name='telephone'
                                placeholder='電話(任意)'
                                value={omowillAuthInfo.userInfo.telephone}
                                onChange={handleRegChange}
                            />
                            <div className="form-check auth-input-response mb-2 mt-2">
                                <div className='w-100'>
                                    <input className="form-check-input border border-1 checkBox-bgColor" type="checkbox" id="regCheckBox" name="option1" value="something" />
                                    <label className="form-check-label">
                                        無断転載・無断使用をしない事に同意する
                                    </label>
                                </div>

                            </div>
                            <div className='d-flex justify-content-between auth-redirect-link mt-2'>
                                <Link to='/privacy'>
                                    <p className='font-primary text-dark'>詳細を見る</p>
                                </Link>

                                <Link to='#' type="button" className="btn btn-primary register-btn" onClick={() => regAction()}>
                                    登録
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

export default Register;
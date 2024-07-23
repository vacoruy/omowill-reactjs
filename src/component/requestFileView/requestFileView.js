import { useNavigate } from 'react-router';
import './requestFileView.css';

import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import isValidEmail from '../../util/checkEmail';
import axios from 'axios';
import $ from 'jquery';
import Spinner from '../includes/spinner';
import { AuthContext } from '../../context/AuthProvider';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutform';
import { Elements } from '@stripe/react-stripe-js';

const STEP = {
    'FIRST': 'first_step',
    'SECOND': "second_step",
    "THIRD": "third_step",
}

function RequestFileView() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    const { setPaidAuth } = useContext(AuthContext);
    const getDate = () => {
        const today = new Date();
        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [requestUser, setRequestUser] = useState({
        firstname: '',
        lastname: '',
        birth: getDate(),
        address: '',
        email: '',
        phone_number: ''
    });

    const [confimedUser, setConfirmedUser] = useState({
        id: 0,
        firstname: '',
        lastname: '',
        birthdate: getDate(),
        address1: '',
        email: '',
        telephone: ''
    });

    const [myConfirmData, setMyConfirmData] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        birth: getDate(),
        address: '',
        email: '',
        relation_file: null,
        death_file: null,
        user_id: 0,
        pay_state: true,
    });

    const [paidUserIdx, setPaidUserIdx] = useState([]);
    const [activeStep, setStep] = useState(STEP.FIRST);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const reqeustUserInfo = async () => {
        if (requestUser.firstname === '') {
            toast.error('姓を入力してください。');
        } else if (requestUser.lastname === '') {
            toast.error('名前を入力してください。');
        } else if (requestUser.birth === '') {
            toast.error('誕生日を入力してください。');
        } else if (requestUser.address === '') {
            toast.error('住所1を入力してください。');
        } else if (requestUser.email === '') {
            toast.error('メールアドレスを入力してください。');
        } else if (!isValidEmail(requestUser.email)) {
            toast.error('メールの形式が正しくありません。');
        } else {
            setIsLoading(true);
            try {
                const response = await axios.post(process.env.REACT_APP_API_URL + '/confirmRequestUser', requestUser);

                if (response.data.message === 200) {
                    setConfirmedUser(response.data.data);

                    setMyConfirmData((prev) => ({
                        ...prev,
                        user_id: response.data.data.id
                    }))

                    toast.success('データを確認して次の段階に進んでください。');
                    setIsSubmit(true);

                } else if (response.data.message === 400) {
                    toast.error('要求されたデータは存在しません。サポートにお問い合わせください。 ');
                } else {
                    console.log('database access error');
                }
                setIsLoading(false);
            } catch (error) {
                toast.error('Please check the network Connection.');
                setIsLoading(false);
            }
        }
    }

    const setCookieOfReqUser = (cookieInfo) => {
        setPaidAuth(cookieInfo);

        navigate('/pdfOrVideoView');
    }

    const showPayPage = async () => {
        setStep(STEP.THIRD);
        // setCookieOfReqUser();

        //if Payment Success
        // try {
        //     const response = await axios.post(process.env.REACT_APP_API_URL + '/payForReadDoc', myConfirmData);

        //     setMyConfirmData((prev) => ({
        //         ...prev,
        //         id: response.data.data
        //     }));

        //     var tmp = paidUserIdx;
        //     tmp.push(myConfirmData.user_id);

        //     setPaidUserIdx(tmp);            

        //     setCookieOfReqUser({
        //         auth: true,
        //         value: tmp
        //     });
        // } catch (error) {
        //     toast.error('ネットワーク接続を確認してください。');
        // }
    }

    const changeDataType = (date) => {
        const today = new Date(date);

        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const submitMyInfo = async () => {
        if (myConfirmData.first_name === '') {
            toast.error('姓を入力してください。');
        } else if (myConfirmData.last_name === '') {
            toast.error('名前を入力してください。');
        } else if (myConfirmData.birth === '') {
            toast.error('誕生日を入力してください。');
        } else if (myConfirmData.address === '') {
            toast.error('住所1を入力してください。');
        } else if (myConfirmData.email === '') {
            toast.error('メールアドレスを入力してください。');
        } else if (!isValidEmail(myConfirmData.email)) {
            toast.error('メールの形式が正しくありません。');
            // } else if (!myConfirmData.relation_file) {
            //     toast.error('遺族との関係がわかる書類をアップロードしてください。');
            // } else if (!myConfirmData.death_file) {
            //     toast.error('死亡報告書または死体検眼書をアップロードしてください。');
        } else if (!$('#myInfoCheckBox').prop('checked')) {
            toast.error('サービス規約に同意する必要があります。');
        } else if (!myConfirmData.pay_state) {
            toast.error('300円の有料手続き決済を行う必要があります。');
        } else {
            setIsLoading(true);
            try {
                const response = await axios.post(process.env.REACT_APP_API_URL + '/checkPayStatu', myConfirmData);

                if (response.data.message === 200) {
                    if (response.data.data.length === 0) {
                        showPayPage();
                    } else {
                        const tmp = [];
                        var flg = false;

                        //check if request user is exist or not
                        response.data.data.forEach(ele => {
                            tmp.push(ele.user_id);
                            if (ele.user_id === myConfirmData.user_id) {
                                flg = true;
                            }
                        });

                        if (!flg) {
                            showPayPage();
                        } else {
                            setPaidUserIdx(tmp);
                            setCookieOfReqUser({
                                auth: true,
                                value: tmp
                            });
                        }

                    }
                }

                setIsLoading(false);
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');

                setIsLoading(false);
            }

            // try {
            //     const response = await axios.post(process.env.REACT_APP_API_URL + '/payForReadDoc', myConfirmData);

            //     setMyConfirmData((prev) => ({
            //         ...prev,
            //         id: response.data.data
            //     }));

            //     //////////////////
            //     ///handle cookie//
            //     //////////////////


            // } catch (error) {
            //     toast.error('ネットワーク接続を確認してください。');
            // }
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        getStripeKey();
        getPaymentIntent();
    }, []);

    const getPaymentIntent = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/create-payment-intent', {});

            setClientSecret(data.clientSecret);
        } catch (error) {

        }
    }

    const getStripeKey = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/payConfig', {});

            setStripePromise(loadStripe(response.data.publishableKey));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="position-relative request-view">
            {
                isLoading && <Spinner />
            }
            {
                activeStep === STEP.FIRST && (
                    <div className='d-flex flex-column'>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <div className="card p-5 request-pdf-form">
                                    <h3 className="card-title fw-bold">動画・PDF等の登録確認申請</h3>
                                    <div className='form-group'>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="氏"
                                                name='firstname'
                                                value={requestUser.firstname}
                                                onChange={(e) => setRequestUser((prev) => ({
                                                    ...prev,
                                                    firstname: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="名前"
                                                name='lastname'
                                                value={requestUser.lastname}
                                                onChange={(e) => setRequestUser((prev) => ({
                                                    ...prev,
                                                    lastname: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="生年月日"
                                                name='birth'
                                                value={requestUser.birth}
                                                onChange={(e) => setRequestUser((prev) => ({
                                                    ...prev,
                                                    birth: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="住所"
                                                name='address'
                                                value={requestUser.address}
                                                onChange={(e) => setRequestUser((prev) => ({
                                                    ...prev,
                                                    address: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="メールアドレス"
                                                name='email'
                                                value={requestUser.email}
                                                onChange={(e) => setRequestUser((prev) => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="電話(任意)"
                                                name='phone_number'
                                                value={requestUser.phone_number}
                                                onChange={(e) => setRequestUser((prev) => ({
                                                    ...prev,
                                                    phone_number: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <button className='btn btn-primary en fw-bold en' onClick={reqeustUserInfo}>Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className="card p-5 request-pdf-form" style={{ zIndex: 1 }} >
                                    <h3 className="card-title fw-bold">動画・PDF等の登録確認資料</h3>
                                    <div className='form-group'>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="氏"
                                                name='firstname'
                                                defaultValue={confimedUser.firstname}
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="名前"
                                                name='lastname'
                                                defaultValue={confimedUser.lastname}
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="生年月日"
                                                name='birth'
                                                defaultValue={changeDataType(confimedUser.birthdate)}
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="住所"
                                                name='address'
                                                defaultValue={confimedUser.address1}
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="メールアドレス"
                                                name='email'
                                                defaultValue={confimedUser.email}
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="電話(任意)"
                                                name='phone_number'
                                                defaultValue={confimedUser.telephone}
                                                disabled
                                            />
                                        </div>
                                        <button className='btn btn-primary en fw-bold en' onClick={() => navigate('/contact')}>Contact</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-primary en btn-next fw-bold' onClick={() => {
                                if (!isSubmit) {
                                    toast.error('送信ボタンをクリックしてデータを確認してください。');
                                } else {
                                    setStep(STEP.SECOND);
                                    setIsSubmit(false);
                                }
                            }}>Next <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i></button>
                        </div>
                    </div>
                )
            }

            {
                activeStep === STEP.SECOND && (
                    <div className='d-flex flex-column'>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
                                <div className="card p-5 request-pdf-form">
                                    <h3 className="card-title fw-bold">本人確認資料</h3>
                                    <div className='form-group'>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control me-1"
                                                placeholder="氏"
                                                name='first_name'
                                                value={myConfirmData.first_name}
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    first_name: e.target.value
                                                }))}
                                            />

                                        </div>
                                        <div className='input-group'>
                                            <input
                                                type="text"
                                                className="form-control ms-1"
                                                placeholder="名前"
                                                name='last_name'
                                                value={myConfirmData.last_name}
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    last_name: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="date"
                                                className="form-control me-1"
                                                placeholder="生年月日"
                                                name='birth'
                                                value={myConfirmData.birth}
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    birth: e.target.value
                                                }))}
                                            />

                                        </div>
                                        <div className='input-group'>
                                            <input
                                                type="text"
                                                className="form-control ms-1"
                                                placeholder="住所"
                                                name='address'
                                                value={myConfirmData.address}
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    address: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="メールアドレス"
                                                name='email'
                                                value={myConfirmData.email}
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                className="form-control"
                                                placeholder="遺族との関係が分かる書類(登記簿謄本など)"
                                                name='relation_file'
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    relation_file: e.target.files[0]
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                className="form-control"
                                                placeholder="死亡届出書、 死体検案書"
                                                name='death_file'
                                                onChange={(e) => setMyConfirmData((prev) => ({
                                                    ...prev,
                                                    death_file: e.target.files[0]
                                                }))}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <input type="checkbox" id="myInfoCheckBox" />
                                            </div>
                                            <span className="form-control terms-text" onClick={() => navigate('/termsofservice')}>個人情報関連の説明･同意</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button className='btn btn-default en btn-next fw-bold' onClick={() => {
                                            setStep(STEP.FIRST);
                                            setIsSubmit(false);
                                        }}><i className="fa fa-long-arrow-left ms-2" aria-hidden="true" /> Back</button>
                                        <button className='btn btn-primary en btn-next fw-bold' onClick={submitMyInfo}>Next <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                activeStep === STEP.THIRD && (
                    <div className='d-flex flex-column'>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
                                <div className="card p-5 request-pdf-form">
                                    <h3 className="card-title fw-bold">300円有料手続決済</h3>
                                    <div className='form-group'>
                                        {
                                            stripePromise && clientSecret && (
                                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                    <CheckoutForm confirmData = {myConfirmData} paidUserIdx = {paidUserIdx}/>
                                                </Elements>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default RequestFileView;

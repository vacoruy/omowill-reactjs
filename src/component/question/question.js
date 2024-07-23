import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import $ from 'jquery';

function Question() {
    const navigate = useNavigate();

    const sendQuestion = () => {
        if ($('#question').val() === '') {
            toast.error('お問い合わせ内容を入力してください。');
        }else {
            toast.success('送信されました。');
            navigate('/');
        }
    }
    return (
        <div className='login-container'>
            <div className="container">
                <div className="row login-box">
                    <div className="col-sm-12 col-md-12 col-lg-6 px-5 login-intro-box">
                        <div className='d-flex justify-content-between flex-column'>
                            <h2 className='fw-bold'>震災/津波/災害/戦争</h2>
                            <p className='mb-0'>東日本大震災で・写真や手紙など</p>
                            <p className='fw-bold mb-0'>本来・想いを残してきたツールは</p>
                            <p className='fw-bold mb-0'>津波で跡形もなく消えてなくなる</p>
                            <h1 className='fw-bold mt-4'>OMOW<span className='opacity-3'>I</span>LL</h1>
                            <p className='fw-bold mb-0'>想いを「今」WEB上に残しておく</p>
                        </div>
                        <p className='mt-4'>マイページ入会/ご利用登録はこちら...</p>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 login-form-box">
                        <div className="card">
                            <div className="card-body">
                                <h2 className='text-center fw-bold mb-0'>お問合せをしてください。</h2>
                                <textarea type='textarea' className='form-control w-100 h-75' id='question' placeholder='お問合せ内容' />
                                <div className='w-100 text-center'>
                                    <button type="button" className="btn btn-primary fw-bold" onClick={sendQuestion}>転送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Question;
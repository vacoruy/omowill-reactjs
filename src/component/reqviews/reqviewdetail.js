import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import $ from 'jquery';
import logo from '../../assets/img/logo-pb.webp';
import axios from 'axios';
import Modal from 'react-modal';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
export default function Reqviewdetail() {
    const [reqid, setReqid] = useState('');
    const [me, setMe] = useState('');
    const [rel, setRel] = useState();
    const [rlfilename, setrlfilename] = useState("ドラッグ・アンド・ドロップ");
    const [report, setReport] = useState();
    const [rpfilename, setrpfilename] = useState('ドラッグ・アンド・ドロップ');
    const [description, setDescription] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = async () => {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const insert = async () => {
        const relurl = await upload('Check\\Relation', rel);
        const reporturl = await upload('Check\\Report', report);

        const rvdetail = {
            reqid: reqid,
            reporter: me,
            relcheck: relurl,
            report: reporturl,
            personel: description
        }
        fetch(process.env.REACT_APP_API_URL + '/detail', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rvdetail)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data === 'success') {
                    toast.success('手数料が決済されました。しばらくお待ちください。');
                    setReqid("")
                    setMe("");
                    setRel("");
                    setDescription("");
                    setrlfilename("ドラッグ・アンド・ドロップ");
                    setrpfilename("ドラッグ・アンド・ドロップ");
                    setReport();
                    setRel();
                    $("#reqid").val("");
                    $("#me").val("");
                    $("#medescription").val("");
                } else {
                    toast.error('名前または生年月日が正しくありません。');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const payment = async () => {
        if (reqid === '') {
            toast.error('リクエスト識別子を入力してください。');
            return;
        }
        else if (me === '') {
            toast.error('本人確認資料を入力してください。');
            return;
        } else if (rel === undefined) {
            toast.error('登記簿謄本を選択してください。');
            return;
        } else if (report === undefined) {
            toast.error('死亡届、遺体確認書を選択してください。');
            return;
        } else if (description === '') {
            toast.error('個人確認資料の説明を入力してください。');
            return;
        } else {
            setIsOpen(true)
        }
    }

    const upload = async (field, files) => {
        const formData = new FormData();

        formData.append(field, files[0]);
        return await axios.post(process.env.REACT_APP_API_URL + "/pdf", formData, {
            headers: {
                "Content-Type": "multipart/form-data; encoding=utf-8",
            },
        })
            .then(function (data) {
                if (data.data) {
                    return data.data;
                } else {
                    toast.error('名前または生年月日が正しくありません。');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const deathReportOver = (e) => {
        e.preventDefault();
    };

    const deathReportDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        var names = "";
        for (var i = 0; i < files.length; i++) {
            if (names === "") names += files[i].name;
            else names += ("・" + files[i].name);
        }
        setReport(files);
        setrpfilename(names);
    };

    const relOver = (e) => {
        e.preventDefault();
    };

    const relDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        var names = "";
        for (var i = 0; i < files.length; i++) {
            if (names === "") names += files[i].name;
            else names += ("・" + files[i].name);
        }
        setRel(files);
        setrlfilename(names);
    };

    return (
        <>
            <div className='login-container' style={{ height: 'auto' }}>
                <div className="container">
                    <div className="row login-box" style={{ height: 'auto' }}>
                        <div className="col-sm-12 col-md-12 col-lg-6 px-5 login-intro-box">
                            <div className='d-flex justify-content-between flex-column'>
                                <h2 className='fw-bold'>震災/津波/災害/戦争</h2>
                                <p className='fw-bold mb-0'>東日本大震災で・写真や手紙など</p>
                                <p className='fw-bold mb-0'>本来・想いを残してきたツールは</p>
                                <p className='fw-bold mb-0'>津波で跡形もなく消えてなくなる</p>
                                <h1 className='fw-bold mt-4'><img src={logo} alt=""/></h1>
                                <p className='fw-bold mb-0'>想いを「今」WEB上に残しておく</p>
                            </div>
                            <p className='mt-4'>マイページ入会/ご利用登録はこちら...</p>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 login-form-box">
                            <div className="card" style={{ height: 'auto' }}>
                                <div className="card-body">
                                    <h2 className='text-center fw-bold mb-0'>リクエスト識別子</h2>
                                    <input type="text" className='form-control w-100 mb-2' id='reqid' placeholder='識別子' onChange={(e) => setReqid(e.target.value)} />
                                    <h2 className='text-center fw-bold mb-0'>関係確認</h2>
                                    <input type="text" className='form-control w-100 mb-4' id='me' placeholder='本人確認' onChange={(e) => setMe(e.target.value)} />
                                    <h6>遺族との関係</h6>
                                    <div className="p-5 rounded-4 mb-2 bg-primary text-light text-center"
                                        onDrop={relDrop} onDragOver={relOver}>
                                        {rlfilename}
                                    </div>
                                    <h6>死亡報告書・死体検眼書</h6>
                                    <div className="p-5 rounded-4 mb-2 bg-primary text-light text-center"
                                        onDrop={deathReportDrop} onDragOver={deathReportOver}>
                                        {rpfilename}
                                    </div>
                                    <input type="text" className='form-control w-100 mb-3' id='medescription' placeholder='個人情報' onChange={(e) => setDescription(e.target.value)} />
                                    <div className='w-100 text-center'>
                                        <button type="button" className="btn btn-primary fw-bold" target="_blank" data-url="https://square.link/u/2HHl4xWS?src=embd" href="https://square.link/u/2HHl4xWS?src=embed" onClick={() => {openModal(); payment();} }>手数料</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <PaymentForm
                    applicationId={'sandbox-sq0idb-2YuN1eIhrJNDgsQVIUwx6Q'}
                    locationId={'LKZXKB4NXBJ4X'}
                    amount={550}
                    currencyCode={'JPY'}
                    cardTokenizeResponseReceived={(token, buyer) => {
                        if (token.status === 'OK') {
                            insert();
                            closeModal();
                        }
                    }}
                    onPaymentSuccess={(res) => console.log(res)}
                >
                    <CreditCard />
                </PaymentForm>
            </Modal>
        </>
    )
}

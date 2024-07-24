import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

import MakeWillPDF from '../../../assets/samplepdf/makeWill.pdf';

function MakeWill(props) {
    const [willSelOption, setWillSelOption] = useState(0);
    const [wills, setWills] = useState({
        ...props.makeWill.wills,
        file: {},
        will_note: ''
    });

    const pdfSampleURL = '/data/sample/makeWill.pdf';

    const handleUpdateWill = async () => {
        if (wills.will_real_estate === '') {
            toast.error('不動産のリストを追加してください。');
            return;
        } else if (willSelOption === 1 && wills.will_note === '') {
            toast.error('遺言書にメモを添えてください。');
        } else if (willSelOption === 0 && wills.file.name === undefined) {
            toast.error('保存する遺言を選択してください。');
        } else {
            switch (Number(willSelOption)) {
                case 1:
                    createPdf();
                    break;
                case 0:
                    await uploadPdf();
                    break;
                default:
                    break;
            }
        }
    }

    const createPdf = async () => {
        const updatedWills = {
            ...wills,
            will_status: 1,
        };

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: wills.will_real_url });
        } catch (error) {
            toast.error('ネットワーク接続を確認してください。');
        }

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/createWills', updatedWills);

            setWills(updatedWills);
            toast.success('success upload');
        } catch (error) {
            toast.error('ネットワーク接続を確認してください。');
        }
    }

    const uploadPdf = async () => {
        try {
            const formData = new FormData();
            formData.append('file', wills.file);

            try {
                await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: wills.will_real_url });

            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }

            const response = await axios.post(process.env.REACT_APP_API_URL + '/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                const updatedWills = {
                    ...wills,
                    will_real_url: '/data/' + response.data.filename,
                    will_status: 1,
                };

                try {
                    await axios.post(process.env.REACT_APP_API_URL + '/updateWills', updatedWills);

                    setWills(updatedWills);
                    toast.success('success upload');
                } catch (error) {
                    toast.error('ネットワーク接続を確認してください。');
                }

            }
        } catch (error) {
            toast.error('please check network connection');
        }
    }

    const pdfFileUpload = (event) => {
        let file = event.target.files[0];

        if (file && file.type !== 'application/pdf') {
            toast.error('ファイルタイプが正しくありません。');
            file = {};
        }

        setWills((prev) => ({
            ...prev,
            file: file,
        }));
    };

    useEffect(() => {
        setWills({
            ...props.makeWill.wills,
            file: {},
            will_note: ''
        });
    }, [props])

    return (
        <div className='make-will'>
            <h3 className="mb-5">自筆証書遺言</h3>
            <h6>遺言書を記載しておけば、死後の財産分与の際に混乱を避けることができます。</h6><br />
            <h6>遺言書を作成する場合、保管場所についても整理しておけば、探す手間が省け、手続きまでの時間を短縮することができます。</h6><br />
            <h6>また、OMOWILLは法的な効力がないため、財産分与の割合や相続人を指定したい場合は、遺言書を作成しておくことをおすすめします。</h6><br />
            <h6>遺言書作成の詳しい紹介は、以下のリンクからご覧いただけます。</h6><br />

            <Link to={MakeWillPDF} className='fw-bold' target='_blank' rel='noopener noreferrer'><h6><i className="fa fa-caret-right me-1" aria-hidden="true" target="_blank" />詳細情報</h6></Link>

            <div className='d-flex justify-content-center pt-5 pb-5 mt-5'>
                <div className='d-flex flex-column born-pdf-field'>
                    <iframe
                        title="deathVideo"
                        src={wills.will_status === 0 ? pdfSampleURL + `#toolbar=0` : wills.will_real_url + `#toolbar=0`}
                        width="100%"
                        height="400px"
                        border="none"
                    />
                    <button
                        className='btn btn-primary'
                        onClick={() => window.open(wills.will_status === 0 ? pdfSampleURL : wills.will_real_url, '_blank')}>詳細を表示</button>
                </div>

                <div className='form ps-2 pe-2'>
                    <div className="input-group">
                        <span className="input-group-text">自筆証書遺言</span>
                        <select
                            className="form-select"
                            value={willSelOption}
                            onChange={(event) => { setWillSelOption(event.target.value); }}
                        >
                            <option value={0}>PDF化ファイル掲載</option>
                            <option value={1}>自筆証書遺言文字入力</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">財産目録見本</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="財産目録見本"
                            name="will_real_estate"
                            value={wills.will_real_estate}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setWills((prev) => ({ ...prev, [name]: value }));
                            }}
                        />
                    </div>

                    {
                        Number(willSelOption) === 0 &&
                        <div className="input-group">
                            <span className="input-group-text">遺書PDF</span>
                            <input
                                type="file"
                                className="form-control"
                                placeholder="PDFをアップロード"
                                name="file"
                                onChange={pdfFileUpload}
                            />
                        </div>
                    }

                    {
                        Number(willSelOption) === 1 &&
                        <div className="input-group">
                            <span className="input-group-text align-items-start">詳細説明</span>
                            <textarea
                                type="text"
                                className="form-control"
                                rows={20}
                                maxLength="10000"
                                style={{ resize: 'none' }}
                                placeholder="死亡時に残すメッセージ"
                                name='will_note'
                                value={wills.will_note}
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    setWills((prev) => ({ ...prev, [name]: value }));
                                }}
                            />
                        </div>
                    }

                    <div className="d-flex flex-row-reverse mt-5">
                        <button className="btn btn-primary" onClick={handleUpdateWill}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeWill;

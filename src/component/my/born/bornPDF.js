import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function BornPDF(props) {
    const getDate = () => {
        const today = new Date();
        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [bornsData, setBornsData] = useState(props.bornsPdf);
    const [pdfCount, setEnableCount] = useState(0);
    const [pdfSelOption, setPdfSelOption] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [newPdf, setNewPdf] = useState({
        idx: props.bornsPdf.id,
        childIdx: 0,
        status: 1,
        name: '',
        birth: getDate(),
        url: '',
        description: '',
        update_date: getDate(),
        file_note: '',
        file: {}
    });

    const pdfSampleURL = '/data/sample/sample.pdf';

    const addNewPdf = () => {
        if (newPdf.name === '') {
            toast.error('お子様の名前を追加してください。');
            return;
        } else if (newPdf.description === '') {
            toast.error('お子様の誕生についての説明を追加します。');
            return;
        } else if (pdfCount === 0) {
            toast.error('新しい PDF を追加できません。管理者に問い合わせてください。');
        }

        switch (Number(pdfSelOption)) {
            case 0:
                createPdf();
                break;
            case 1:
                uploadPdf();
                break;
            default:
                break;
        }
    };

    const uploadPdf = async () => {
        try {
            const formData = new FormData();
            formData.append('file', newPdf.file);

            const response = await axios.post(process.env.REACT_APP_API_URL + '/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                const updatedPdf = {
                    ...newPdf,
                    url: '/data/' + response.data.filename
                };

                await axios.post(process.env.REACT_APP_API_URL + '/updateBornsPdf', updatedPdf);

                setBornsData((prevBornsPdf) => {
                    const updatedData = [...prevBornsPdf.data];
                    updatedData[updatedPdf.childIdx] = updatedPdf;
                    return {
                        ...prevBornsPdf,
                        data: updatedData,
                    };
                });
                toast.success("子供向けの新しいPDFを追加しました。");
                closeModal();
            }
        } catch (error) {
            toast.error('ネットワーク接続を確認してください。');
            closeModal();
        }
    };

    const createPdf = async () => {
        if (newPdf.file_note === '') {
            toast.error("生まれた子供のためにメモを追加します。");
        } else {
            try {
                await axios.post(process.env.REACT_APP_API_URL + '/createBornsPDF', newPdf);
                closeModal();
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }
        }
    };

    const pdfFileUpload = (event) => {
        let file = event.target.files[0];
        if (file && file.type !== 'application/pdf') {
            toast.error('ファイルタイプが正しくありません。');
            file = {};
        }

        setNewPdf((prev) => ({
            ...prev,
            file: file
        }));
    };

    useEffect(() => {
        let count = 0;
        props.bornsPdf.data.forEach((ele) => {
            if (ele.status === 0) {
                count += 1;
            }
        });

        setEnableCount(count);
        setBornsData(props.bornsPdf);
        setNewPdf((prev) => ({
            ...prev,
            childIdx: 5 - count
        }));
    }, [props.bornsPdf]);

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };

    return (
        <div>
            <div className="px-2 mb-3 justify-content-between d-flex">
                <h2 className="fw-bold"><span className='en'>PDF</span>管理</h2>
                <button className="btn btn-primary born-create-btn" onClick={openModal}><span className='en'>PDF</span>管理</button>
            </div>

            <div className="px-2 w-100">
                <ul className="list-group list-group-flush born-list">
                    {bornsData.data.map((ele, idx) => {
                        if (pdfCount === 5 && pdfCount - idx > 4) {
                            return (
                                <li className="list-group-item d-flex flex-reverse flex-column flex-md-row gap-3 gap-md-0" key={idx}>
                                    <div className='d-flex flex-column born-pdf-field'>
                                        <iframe
                                            title="deathVideo"
                                            src={pdfSampleURL + `#toolbar=0`}
                                            width="100%"
                                            minWidth="100%"
                                            height="360px"
                                            border="none"                                            
                                        ></iframe>
                                        <button className='btn btn-primary' onClick={() => window.open(pdfSampleURL, '_blank')}>詳細を表示</button>
                                    </div>
                                    <div className="born-info ps-0 ps-md-5 position-relative">
                                        <h5><span className="fw-bold">こども氏名:</span> Akay</h5>
                                        <div className="d-flex justify-content-between">
                                            <h5><span className="fw-bold">生年月日&nbsp;:</span>&nbsp;&nbsp;&nbsp;&nbsp; 2024-05-12</h5>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h5><span className="fw-bold">掲載日 &nbsp;&nbsp;&nbsp;&nbsp;: </span>&nbsp;&nbsp;&nbsp;&nbsp;2024-05-18</h5>
                                        </div>
                                        <h6 className='mt-3'>
                                            '動画を残すには、まずYouTubeに動画をアップロードした後、Waontに戻る必要があります。 次に会員登録をし、マイページから動画を残すきっかけを選択します。 次の動画ボタンをクリック(デフォルトで選択されています。)し・受取人情報を入力します。 次にYouTubeにアップロードした動画のパスを入力し・保存ボタンをクリックすれば完了です。
                                        </h6>
                                        <p className='card-pattern'>見 本</p>
                                    </div>
                                </li>
                            );
                        } else if (ele.status !== 0) {
                            return (
                                <li className="list-group-item d-flex flex-reverse flex-column flex-md-row gap-3 gap-md-0" key={idx}>
                                    <div className='d-flex flex-column'>
                                        <iframe
                                            title="deathVideo"
                                            src={ele.url + `#toolbar=0`}
                                            height="390px"
                                            style={{ border: 'none' }}
                                        />
                                        <button className='btn btn-primary' onClick={() => window.open(ele.url, '_blank')}>詳細を表示</button>
                                    </div>
                                    <div className="born-info ps-0 ps-md-5">
                                        <h5><span className="fw-bold">こども氏名:</span> {ele.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <h5><span className="fw-bold">生年月日&nbsp;:</span>&nbsp;&nbsp;&nbsp;&nbsp; {ele.birth}</h5>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h5><span className="fw-bold">掲載日 &nbsp;&nbsp;&nbsp;&nbsp;: </span>&nbsp;&nbsp;&nbsp;&nbsp;{ele.update_date}</h5>
                                        </div>
                                        <h6>{ele.description}</h6>
                                    </div>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>

                <div className={`my-modal modal ${modalShow ? 'fade show' : 'fade'}`} tabIndex="-1" role="dialog" style={{ display: modalShow ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title fw-bold">生誕時に残すメッセージ</h4>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>

                            <div className="modal-body">
                                <div className='d-flex justify-content-center'>
                                    <div className='form'>
                                        <div className="input-group">
                                            <span className="input-group-text">こども氏名</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='name'
                                                placeholder="氏名"
                                                value={newPdf.name}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setNewPdf((prev) => ({ ...prev, [name]: value }));
                                                }}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">生年月日</span>
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="生年月日"
                                                name="birth"
                                                value={newPdf.birth}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setNewPdf((prev) => ({ ...prev, [name]: value }));
                                                }}
                                            />
                                        </div>

                                        <div className="input-group">
                                            <span className="input-group-text">遺書PDF</span>
                                            <select
                                                className="form-select"
                                                value={pdfSelOption}
                                                onChange={(e) => setPdfSelOption(e.target.value)}
                                            >
                                                <option value={1}>遺書PDF</option>
                                                <option value={0}>文字入力</option>
                                            </select>
                                        </div>

                                        {Number(pdfSelOption) === 1 && (
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
                                        )}

                                        <div className="input-group">
                                            <span className="input-group-text align-items-start">簡単な説明</span>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                rows={5}
                                                maxLength="300"
                                                style={{ resize: 'none' }}
                                                placeholder="簡単な説明"
                                                value={newPdf.description}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setNewPdf((prev) => ({ ...prev, [name]: value }));
                                                }}
                                            />
                                        </div>

                                        {Number(pdfSelOption) === 0 && (
                                            <div className="input-group">
                                                <span className="input-group-text align-items-start">詳細説明</span>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    name="file_note"
                                                    rows={10}
                                                    maxLength="10000"
                                                    style={{ resize: 'none' }}
                                                    placeholder="死亡時に残すメッセージ"
                                                    onChange={(e) => {
                                                        const { name, value } = e.target;
                                                        setNewPdf((prev) => ({ ...prev, [name]: value }));
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <div className='input-group justify-content-between mt-3'>
                                    <button type="button" className="btn btn-default" onClick={closeModal}>終了</button>
                                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={addNewPdf}>更新取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BornPDF;

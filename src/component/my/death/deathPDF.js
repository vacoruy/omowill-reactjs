import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function DeathPDF(props) {
    const [willsPdfs, setWillsPdfs] = useState(props.deathPdf);
    const [editFlg, setEditFlg] = useState(false);
    const [uploadSpinner, setUploadSpineer] = useState(false);

    const [userPdf, setUserPdf] = useState({
        ...props.deathPdf.data[0],
        id: props.deathPdf.id,
        file: {},
        file_note: '',
        idx_relation: 0,
    });

    const [receiverFlg, setReceiverFlg] = useState(1);
    const [pdfType, setPdfType] = useState(0);


    const uploadWillPdf = () => {
        if (receiverFlg === 1 && userPdf.lawyer_name === '') {
            toast.error('受取人名を追加してください。');
        } else if (pdfType === 1 && userPdf.file_note === '') {
            toast.error('遺言書に死後の遺言を書いてください。');
        } else {
            switch (pdfType) {
                case 0: //upload exist file
                    uploadFile();
                    break;
                case 1: //create text into new file
                    createFile();
                    break;
                default:
                    break;
            }
        }
    }

    const uploadFile = async (e) => {
        if (userPdf.url === '/data/sample/sample.pdf' && userPdf.file.name === undefined) {
            toast.error('アップロードするファイルを選択してください。');
            return;
        } else {


            const formData = new FormData();
            const file = userPdf.file;
            formData.append('file', file);

            if (userPdf.url !== '/data/sample/sample.pdf') {
                try {
                    setUploadSpineer(true);
                    await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: userPdf.url });
                    setUploadSpineer(false);
                } catch (error) {
                    toast.error('ネットワーク接続を確認してください。');
                }
            }

            try {
                setUploadSpineer(true);
                const response = await axios.post(process.env.REACT_APP_API_URL + '/fileUpload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (Number(response.status) === 200) {

                    const updatedPdf = {
                        ...userPdf,
                        url: '/data/' + response.data.filename,
                        id: props.deathPdf.id,
                        status: 1
                    };

                    // userPdf.url = '/data/' + response.data.filename;
                    // userPdf.id = props.deathPdf.id;
                    // userPdf.status = 1;

                    if (receiverFlg === 1) {
                        updatedPdf.lawyer_state = 1;
                        // userPdf.lawyer_relation = 
                    } else {
                        updatedPdf.lawyer_state = 0;
                    }

                    setEditFlg(false);

                    try {
                        const response = await axios.post(process.env.REACT_APP_API_URL + '/updataDeathPdfs', updatedPdf);

                        if (response) {


                            setUserPdf(updatedPdf);

                            setWillsPdfs((prevDeathPdf) => {
                                const updatedData = [...prevDeathPdf.data];
                                updatedData[updatedPdf.idx_relation] = updatedPdf;
                                return {
                                    ...prevDeathPdf,
                                    data: updatedData,
                                };
                            });


                            toast.success('正常に更新されました。');
                        }

                        setUploadSpineer(false);

                    } catch (error) {
                        toast.error('Error Update Data');
                        setUploadSpineer(false);
                    }

                }
            } catch (error) {
                if (error) {
                    toast.error('ネットワーク接続を確認してください。');
                    setUploadSpineer(false);
                }
            }

        }
    }

    const createFile = async () => {
        if (userPdf.url !== '/data/sample/sample.pdf') {
            try {
                await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: userPdf.url });
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }
        }

        const updatedPdf = {
            ...userPdf,
            id: props.deathPdf.id,
            status: 1
        };

        if (receiverFlg === 1) {
            updatedPdf.lawyer_state = 1;
            // userPdf.lawyer_relation = 
        } else {
            updatedPdf.lawyer_state = 0;
        }

        try {
            setUploadSpineer(true);
            const response = await axios.post(process.env.REACT_APP_API_URL + '/createFile', updatedPdf);

            updatedPdf.url = response.data.filepath;
            setUserPdf(updatedPdf);

            setWillsPdfs((prevDeathPdf) => {
                const updatedData = [...prevDeathPdf.data];
                updatedData[updatedPdf.idx_relation] = updatedPdf;
                return {
                    ...prevDeathPdf,
                    data: updatedData,
                };
            });
            
            toast.success('正常に更新されました。');
            setUploadSpineer(false);
            setEditFlg(false);

        } catch (error) {
            toast.error('ネットワーク接続を確認してください。');
            setUploadSpineer(false);
            setEditFlg(false);
        }


    }

    const pdfFileUpload = (event) => {
        let file = event.target.files[0];

        if (file && file.type !== 'application/pdf') {
            toast.error('ファイルタイプが正しくありません。');
            file = {};
        } else {
            userPdf.file = file;
            setUserPdf(userPdf);
        }
    };


    useEffect(() => {
        props.deathPdf.data.forEach((element, idx) => {
            if (element.status === 0) {
                props.deathPdf.data[idx].description = '動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。';
                props.deathPdf.data[idx].url = '/data/sample/sample.pdf';
                props.deathPdf.data[idx].lawyer_name = 'なし';
                props.deathPdf.data[idx].idx_relation = idx;
            }
        });

        setWillsPdfs(props.deathPdf);
        setUserPdf({
            ...props.deathPdf.data[0],
            id: props.deathPdf.id,
            file: {},
            file_note: '',
            idx_relation: 0,
        });
    }, [props]);


    return (
        <div>
            <div className="px-2 mb-3">
                <h2 className="fw-bold"><span className='en'>PDF</span>管理</h2>
            </div>

            {
                !editFlg ? (
                    <div className="d-flex death-items-list">
                        {
                            willsPdfs.data.map((ele, idx) => (
                                <div className="p-2 flex-fill my-card-container" key={idx}>
                                    <div className="card my-content-card my-pdf">
                                        <iframe
                                            title="deathVideo"
                                            src={ele.url + `#toolbar=0`}
                                            width="100%"
                                            height="600px"
                                            style={{ border: 'none' }}
                                        ></iframe>
                                        <button className='btn btn-primary' onClick={() => window.open(ele.url, '_blank')}>詳細を表示</button>

                                        <div className="card-body">
                                            <p className="card-text update-date">更新日: {ele.update_date}</p>
                                            <h3 className="card-title fw-bold">{ele.lawyer_relation} : {ele.lawyer_name}</h3>
                                            <h5 className="fw-bold">生年月日 : {ele.lawyer_birth}</h5>

                                            <p className='my-card-des'>{ele.description}</p>

                                            <div className='d-flex justify-content-end mt-4'>
                                                <button className="btn btn-primary" onClick={() => {
                                                    setEditFlg(true);
                                                    willsPdfs.data[idx].idx_relation = idx;
                                                    setUserPdf(willsPdfs.data[idx]);
                                                }}>資料更新</button>
                                            </div>
                                            {
                                                ele.status === 0 &&
                                                <p className='card-pattern'>見 本</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="d-flex position-relative">
                        <div className="p-2 my-card-container my-edit-card-container">
                            <div className="card my-content-card my-pdf">
                                <iframe
                                    title="deathVideo"
                                    src={userPdf.url + `#toolbar=0`}
                                    width="100%"
                                    height="600px"
                                    style={{ border: 'none' }}
                                ></iframe>
                                <button className='btn btn-primary' onClick={() => window.open(userPdf.url, '_blank')}>詳細を表示</button>

                                <div className="card-body">
                                    <p className="card-text update-date">更新日: {userPdf.update_date}</p>
                                    <h3 className="card-title fw-bold">{userPdf.lawyer_relation} : {userPdf.lawyer_name}</h3>
                                    <h5 className="fw-bold">生年月日 : {userPdf.lawyer_birth}</h5>

                                    <p className='my-card-des'>{userPdf.description}</p>

                                    <div className='d-flex justify-content-end mt-4'>
                                        <button className="btn btn-primary">資料更新</button>
                                    </div>
                                    {
                                        userPdf.status === 0 &&
                                        <p className='card-pattern'>見 本</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="p-2 flex-grow-1 update-my-video m-2 align-items-center justify-content-center d-flex">
                            <div className='form'>
                                <div className="input-group">
                                    <span className="input-group-text">受取人指定</span>
                                    <select
                                        className="form-select my-vidoe-ms"
                                        value={receiverFlg}
                                        onChange={(e) => setReceiverFlg(Number(e.target.value))}
                                    >
                                        <option value={1}>あり</option>
                                        <option value={0}>なし</option>
                                    </select>
                                </div>
                                <div className='law-man'>
                                    <div className="input-group">
                                        <span className="input-group-text">氏名</span>
                                        <input
                                            type="text"
                                            placeholder="氏名"
                                            className={!Number(receiverFlg) ? `form-control sub-form dlsabled_form` : 'form-control sub-form'}
                                            disabled={!Number(receiverFlg)}
                                            name='lawyer_name'
                                            value={userPdf.lawyer_name}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setUserPdf((prev) => ({ ...prev, [name]: value }));
                                            }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text">生年月日</span>
                                        <input
                                            type="date"
                                            placeholder="生年月日"
                                            className={!Number(receiverFlg) ? `form-control sub-form dlsabled_form` : 'form-control sub-form'}
                                            disabled={!Number(receiverFlg)}
                                            name='lawyer_birth'
                                            value={userPdf.lawyer_birth}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setUserPdf((prev) => ({ ...prev, [name]: value }));
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text">遺書PDF</span>
                                    <select
                                        className="form-select my-vidoe-ms"
                                        value={pdfType}
                                        onChange={(e) => setPdfType(Number(e.target.value))}
                                    >
                                        <option value={0}>遺書PDF</option>
                                        <option value={1}>文字入力</option>
                                    </select>
                                </div>

                                {
                                    Number(pdfType) === 0 && <div className='law-man'>
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
                                    </div>
                                }


                                <div className="input-group">
                                    <span className="input-group-text align-items-start">簡単な説明</span>
                                    <textarea
                                        type="text"
                                        className="form-control my-vidoe-ms"
                                        rows={5}
                                        maxLength="300"
                                        style={{ resize: 'none' }}
                                        placeholder="簡単な説明"
                                        name='description'
                                        value={userPdf.description}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setUserPdf((prev) => ({ ...prev, [name]: value }));
                                        }}
                                    />
                                </div>

                                {
                                    Number(pdfType) === 1 &&
                                    <div className="input-group">
                                        <span className="input-group-text align-items-start">詳細説明</span>
                                        <textarea
                                            type="text"
                                            className="form-control my-vidoe-ms"
                                            rows={10}
                                            maxLength="10000"
                                            style={{ resize: 'none' }}
                                            placeholder="死亡時に残すメッセージ"
                                            name="file_note"
                                            value={userPdf.file_note}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setUserPdf((prev) => ({ ...prev, [name]: value }));
                                            }}
                                        />
                                    </div>
                                }


                                <div className='input-group justify-content-between mt-3'>
                                    <button className="btn btn-default" onClick={() => setEditFlg(false)}>資料更新</button>
                                    <button className="btn btn-primary btn-spinner" onClick={uploadWillPdf}>
                                        {
                                            uploadSpinner &&
                                            <div className="spinner-border" />
                                        }
                                        更新取消
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DeathPDF;
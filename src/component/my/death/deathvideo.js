import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function DeathVideo(props) {
    const [editFlg, setEditFlg] = useState(false);
    const [willsVides, setWillsvideos] = useState(props.deathVideo);
    const [receiverFlg, setReceiverFlg] = useState(1);

    const [userVideo, setUserVideo] = useState({
        ...props.deathVideo.data[0],
        id: props.deathVideo.id,
        idx_relation: 0,
    });

    const updateVideo = async () => {
        if (receiverFlg === 1 && userVideo.lawyer_name === 'なし') {
            toast.error('Please add lawyer name');
        } else if (receiverFlg === 1 && userVideo.lawyer_birth === '') {
            toast.error('Please add lawyer birth');
        } else if (userVideo.url === '') {
            toast.error('Please add youtube URL');
        } else if (userVideo.description === '') {
            toast.error('Please add brief description');
        } else {
            try {
                userVideo.status = 1;
                userVideo.lawyer_state = 1;

                await axios.post(process.env.REACT_APP_API_URL + '/updateWillsVideoData', userVideo);

                willsVides[userVideo.idx_relation] = userVideo;

                setWillsvideos((prev) => {
                    const newData = [...prev.data]; // Create a shallow copy of the data array
                    newData[userVideo.idx_relation] = userVideo; // Update the specific element
                    return { ...prev, data: newData };
                });

                setUserVideo(userVideo);
                setEditFlg(false);

            } catch (error) {
                toast.error('Please check the network connection')
            }
        }
    }

    useEffect(() => {
        props.deathVideo.data.forEach((element, idx) => {
            if (element.status === 0) {
                props.deathVideo.data[idx].description = '動画を残すには、まずYouTubeに動画をアップロードした後、Waontに戻る必要があります。 次に会員登録をし、マイページから動画を残すきっかけを選択します。 次の動画ボタンをクリック(デフォルトで選択されています。)し・受取人情報を入力します。 次にYouTubeにアップロードした動画のパスを入力し・保存ボタンをクリックすれば完了です。';
                props.deathVideo.data[idx].url = 'https://www.youtube.com/embed/tgbNymZ7vqY';
                props.deathVideo.data[idx].lawyer_name = 'なし';
                props.deathVideo.data[idx].idx_relation = idx;
            }
        });

        setWillsvideos(props.deathVideo);

        setUserVideo({
            ...props.deathVideo.data[0],
            id: props.deathVideo.id,
            idx_relation: 0,
        });
    }, [props]);

    return (
        <div>
            <div className="px-2 mb-3">
                <h2 className="fw-bold">動画管理</h2>
            </div>
            <div>
                {
                    !editFlg ? (
                        <div className="d-flex death-items-list">
                            {
                                willsVides.data.map((ele, idx) => (
                                    <div className="p-2 flex-fill my-card-container" key={idx}>
                                        <div className="card my-content-card">
                                            <iframe
                                                title="deathVideo"
                                                src={ele.url}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                            <div className="card-body">
                                                <p className="card-text update-date">更新日: {ele.update_date} </p>
                                                <h3 className="card-title fw-bold">{ele.lawyer_relation}: {ele.lawyer_name}</h3>
                                                <h5 className="fw-bold">生年月日 : {ele.lawyer_birth}</h5>
                                                <p className='my-card-des'>{ele.description}</p>
                                                <div className='d-flex justify-content-end mt-4'>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        setEditFlg(true);
                                                        setUserVideo({
                                                            ...willsVides.data[idx],
                                                            id: willsVides.id,
                                                            idx_relation: idx,
                                                        });
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
                            <div className="p-2 flex-fill my-card-container">
                                <div className="card my-content-card">
                                    <iframe
                                        title="deathVideo"
                                        src={userVideo.url}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="card-body">
                                        <p className="card-text update-date">更新日: {userVideo.update_date}</p>
                                        <h3 className="card-title fw-bold">{userVideo.lawyer_relation}:{userVideo.lawyer_name}</h3>
                                        <h5 className="fw-bold">生年月日 : {userVideo.lawyer_birth}</h5>
                                        <p className='my-card-des'>{userVideo.description}</p>
                                        <div className='d-flex justify-content-end mt-4'>
                                            <button className="btn btn-primary" disabled>資料更新</button>
                                        </div>
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
                                                className={!Number(receiverFlg) ? `form-control sub-form dlsabled_form` : 'form-control sub-form'}
                                                disabled={!Number(receiverFlg)}
                                                name='lawyer_name'
                                                placeholder="氏名"
                                                value={userVideo.lawyer_name}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setUserVideo((prev) => ({ ...prev, [name]: value }));
                                                }}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">生年月日</span>
                                            <input
                                                type="date"
                                                className={!Number(receiverFlg) ? `form-control sub-form dlsabled_form` : 'form-control sub-form'}
                                                disabled={!Number(receiverFlg)}
                                                placeholder="生年月日"
                                                name='lawyer_birth'
                                                value={userVideo.lawyer_birth}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setUserVideo((prev) => ({ ...prev, [name]: value }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">Video ID</span>
                                        <input
                                            type="text"
                                            className="form-control my-vidoe-ms"
                                            placeholder="tgbNymZ7vqY"
                                            name='url'
                                            value={userVideo.url}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setUserVideo((prev) => ({ ...prev, [name]: value }));
                                            }}
                                        />
                                    </div>

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
                                            value={userVideo.description}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setUserVideo((prev) => ({ ...prev, [name]: value }));
                                            }}
                                        />
                                    </div>

                                    <div className='input-group justify-content-between mt-3'>
                                        <button className="btn btn-default" onClick={() => setEditFlg(false)}>資料更新</button>
                                        <button className="btn btn-primary" onClick={updateVideo}>更新取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default DeathVideo;

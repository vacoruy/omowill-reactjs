import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import axios from "axios";

function BornVideo(props) {
    const getDate = () => {
        const today = new Date();

        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [bornsVideos, setBornsVideos] = useState(props.bornsVideo);
    const [toggleSample, setToggleSample] = useState(true);
    const [enableVideoCount, setEnableCount] = useState(0);
    const [newVideo, setNewVideo] = useState({
        status: 1,
        name: '',
        birth: getDate(),
        url: '',
        description: '',
        update_date: getDate(),
    });

    const addNewVideo = async () => {
        const newChildIdx = 5 - enableVideoCount;
        const updatedNewVideo = {
            ...newVideo,
            childIdx: newChildIdx,
            idx: bornsVideos.id,
        };

        if (updatedNewVideo.name === '') {
            toast.error('名前が設定されていません');
        } else if (updatedNewVideo.birth === '') {
            toast.error('生年月日が設定されていません');
        } else if (updatedNewVideo.url === '') {
            toast.error('動画のURLが設定されていません');
        } else if (updatedNewVideo.description === '') {
            toast.error('説明が設定されていません');
        } else if (enableVideoCount === 0) {
            toast.error('新しいビデオを追加できません。管理者に連絡してください');
        } else {
            try {
                var result = await axios.post(process.env.REACT_APP_API_URL + '/updateBornsVideo', updatedNewVideo);

                if (result) {
                    toast.success('新しい子情報の追加に成功しました');

                    setBornsVideos((prevBornsVideos) => {
                        const updatedData = [...prevBornsVideos.data];
                        updatedData[newChildIdx] = updatedNewVideo;
                        return {
                            ...prevBornsVideos,
                            data: updatedData,
                        };
                    });

                    setNewVideo({
                        status: 1,
                        name: '',
                        birth: getDate(),
                        url: '',
                        description: '',
                    });

                    setToggleSample(false);
                }
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVideo((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        let count = 0;
        props.bornsVideo.data.forEach((ele) => {
            if (ele.status === 0) {
                count += 1;
            }
        });

        if (count === 5) {
            setToggleSample(true);
        } else {
            setToggleSample(false);
        }

        setEnableCount(count);
        setBornsVideos(props.bornsVideo);
    }, [props.bornsVideo]);

    return (
        <div>
            <div className="px-2 mb-3 justify-content-between d-flex">
                <h3 className="fw-bold">動画管理</h3>
                <button className="btn btn-primary born-create-btn" data-bs-toggle="modal" data-bs-target="#bornVideoModal">新規追加</button>
            </div>

            <div className="px-2 w-100">
                <ul className="list-group list-group-flush born-list">
                    {bornsVideos.data.map((ele, idx) => {
                        if (ele.status === 1) {
                            return (
                                <li className="list-group-item d-flex flex-reverse flex-column flex-md-row gap-3 gap-md-0" key={idx}>
                                    <iframe
                                        title="deathVideo"
                                        src={`https://www.youtube.com/embed/` + ele.url}
                                        height='180px'
                                        className='rounded-3'
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
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
                        } else if (ele.status === 0 && toggleSample && enableVideoCount - idx > 4) {
                            return (
                                <li className="list-group-item d-flex flex-reverse flex-column flex-md-row gap-3 gap-md-0" key={idx}>
                                    <iframe
                                        title="deathVideo"
                                        src={`https://www.youtube.com/embed/tgbNymZ7vqY`}
                                        height='180px'
                                        className='rounded-3'
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="born-info ps-0 ps-md-5 position-relative">
                                        <h5><span className="fw-bold">こども氏名:</span> {ele.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <h5><span className="fw-bold">生年月日&nbsp;:</span>&nbsp;&nbsp;&nbsp;&nbsp; {ele.birth}</h5>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h5><span className="fw-bold">掲載日 &nbsp;&nbsp;&nbsp;&nbsp;: </span>&nbsp;&nbsp;&nbsp;&nbsp;{ele.update_date}</h5>
                                        </div>
                                        <h6 className='mt-3'>
                                            '動画を残すには、まずYouTubeに動画をアップロードした後、Waontに戻る必要があります。 次に会員登録をし、マイページから動画を残すきっかけを選択します。 次の動画ボタンをクリック(デフォルトで選択されています。)し・受取人情報を入力します。 次にYouTubeにアップロードした動画のパスを入力し・保存ボタンをクリックすれば完了です。'
                                        </h6>
                                        <p className='card-pattern'>見 本</p>
                                    </div>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>

                <div className="modal fade" id="bornVideoModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title fw-bold">生誕時に残すメッセージ</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
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
                                                onChange={handleChange}
                                                value={newVideo.name}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">生年月日</span>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name='birth'
                                                placeholder="生年月日"
                                                onChange={handleChange}
                                                value={newVideo.birth}
                                                min="1900-01-01"
                                                max="2200-12-31"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">Youtube URL</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='url'
                                                placeholder="https://www.youtube.com/embed/tgbNymZ7vqY"
                                                onChange={handleChange}
                                                value={newVideo.url}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text align-items-start">簡単な説明</span>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                rows={5} maxLength="300"
                                                style={{ resize: 'none' }}
                                                placeholder="簡単な説明"
                                                onChange={handleChange}
                                                value={newVideo.description}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <div className='input-group justify-content-between mt-3'>
                                    <button type="button" className="btn btn-default close-modal" data-bs-dismiss="modal">終了</button>
                                    <button className="btn btn-primary" onClick={addNewVideo}>更新取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BornVideo;

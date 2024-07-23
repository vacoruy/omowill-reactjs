import React, { useEffect, useState } from "react";
import './admin.css';
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../includes/spinner";


function Notify() {
    const [isLoading, setIsLoading] = useState(true);
    const [flgSave, setFlgSave] = useState(false);

    const [infos, setInfos] = useState([]);
    const [info, setInfo] = useState({
        data: {
            title: '',
            subTitle: '',
            content: '',
        },
        infoIdx: 0
    });
    const [modalShow, setModalShow] = useState(false);

    const changeDataType = (date) => {
        const today = new Date(date);
    
        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
    
        // Format: YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
    
        return formattedDate;
    }

    const editInfo = async () => {
        await axios.post(process.env.REACT_APP_API_URL + '/updateInfo', info.data);
        setInfos(prevInfos => [...prevInfos.slice(0, info.infoIdx), info.data, ...prevInfos.slice(info.infoIdx + 1)]);

        closeModal();
    }

    const addInfo = async () => {
        if (info.data.title === '') {
            toast.error('Please add title.');
        } else if (info.data.subTitle === '') {
            toast.error('Please add subTitle.');
        } else if (info.data.content === '') {
            toast.error('Please add content.');
        } else {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/addNewInfo', info.data);

            if (response.data.message === 200) {
                var tmpData = {
                    title: info.data.title,
                    subTitle: info.data.subTitle,
                    content: info.data.content,
                    id: response.data.data.insertId,
                    date: getCurrentDate(),
                    kind: 'admin',
                    senderInfo: 'admin@admin.com'
                }

                var allInfos = infos;
                allInfos.push(tmpData);

                setInfos(allInfos);

                closeModal();

            } else {
                console.log('database access error');
            }


        }
    }

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };

    useEffect(() => {
        let isMounted = true;
        axios.post(process.env.REACT_APP_API_URL + '/getAllInfo', {})
            .then(response => {
                if (isMounted) {
                    setInfos(response.data.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    console.log(err);
                    setIsLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="position-relative notify-container">
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => {
                    openModal();
                    setFlgSave(true);
                    setInfo({
                        data: {
                            title: '',
                            subTitle: '',
                            content: '',
                        },
                        infoIdx: infos.length
                    });
                }}>情報を追加</button>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>投稿日</th>
                        <th>表題</th>
                        <th>サブタイトル</th>
                        <th>内容</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        infos.length === 0 ? (<tr>
                            <td colSpan={5} className="text-center">データが存在しません。</td>
                        </tr>):(
                            infos.map((ele, idx) => (
                                <tr key={idx} onClick={() => {
                                    setInfo({
                                        data: infos[idx],
                                        infoIdx: idx
                                    });
                                    setFlgSave(false);
                                    openModal();
                                }}>
                                    <td>{idx + 1}</td>
                                    <td>{changeDataType(ele.date)}</td>
                                    <td>{ele.title}</td>
                                    <td>{ele.subTitle}</td>
                                    <td>{ele.content}</td>
                                </tr>
                            ))
                        )
                    }

                </tbody>
            </table>

            <div className={`my-modal modal ${modalShow ? 'fade show' : 'fade'}`} tabIndex="-1" role="dialog" style={{ display: modalShow ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title fw-bold">お知らせ</h4>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>

                        <div className="modal-body">
                            <div className='modal-container'>
                                <div className='form'>
                                    <div className="input-group">
                                        <span className="input-group-text">表題</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='title'
                                            placeholder="表題"
                                            value={info.data.title}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setInfo((prev) => ({
                                                    ...prev, data: {
                                                        ...prev.data,
                                                        [name]: value
                                                    }
                                                }));
                                            }}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">サブタイトル</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='subTitle'
                                            placeholder="サブタイトル"
                                            value={info.data.subTitle}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setInfo((prev) => ({
                                                    ...prev, data: {
                                                        ...prev.data,
                                                        [name]: value
                                                    }
                                                }));
                                            }}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">内容</span>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name='content'
                                            placeholder="内容"
                                            rows={5}
                                            maxLength="300"
                                            value={info.data.content}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setInfo((prev) => ({
                                                    ...prev, data: {
                                                        ...prev.data,
                                                        [name]: value
                                                    }
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className='input-group justify-content-between mt-3'>
                                <button type="button" className="btn btn-default" onClick={closeModal}>キャンセル</button>
                                <button
                                    className="btn btn-primary"
                                    onClick={flgSave ? (addInfo) : (editInfo)}
                                >{
                                        flgSave ? '情報を追加' : '更新情報'
                                    }</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isLoading && <Spinner />
            }
        </div>
    )
}

export default Notify;

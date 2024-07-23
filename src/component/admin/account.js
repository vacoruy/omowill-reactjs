import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './admin.css';
import { Link } from "react-router-dom";


function AccountManagement() {
    const [updateHistory, setUpdateHistory] = useState([]);
    const [contactInfo, setContactInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(19);
    const [adminInfo, setAdminInfo] = useState({
        email: '',
        password: '',
    });

    const [searchTerm, setSearchTerm] = useState("");

    const getDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const updateAdminInfo = async () => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + '/updateAdminInfo', adminInfo);
            toast.success('Admin Email and password were changed.');
        } catch (error) {
            toast.error('Please check the network connection.');
        }
    };

    const changeStatus = async (idx) => {
        const updatedContactInfo = contactInfo.map((item, index) => {
            if (index === idx) {
                return { ...item, status: Math.abs(item.status - 1) };
            }
            return item;
        });
        setContactInfo(updatedContactInfo);

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/updateContactStatus', {
                id: contactInfo[idx].id,
                status: updatedContactInfo[idx].status
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const nextPage = () => {
        setCurrentPage(currentPage => currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage => currentPage - 1);
    };

    useEffect(() => {
        getAdminInfo();
    }, []);

    const getAdminInfo = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/getAdminInfo', {});
            setAdminInfo(data.result.adminInfo[0]);
            setUpdateHistory(data.result.updateHistory);
            setContactInfo(data.result.contactUser);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredContactInfo = contactInfo.filter(info =>
        info.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.kind.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContactInfo.slice(indexOfFirstItem, indexOfLastItem);

    const splishPath = (path) => {
        const pathArray = path.split('\\');

        return pathArray[pathArray.length - 1]
    }

    return (
        <div className="position-relative account-management d-flex flex-row">
            <div className="d-flex flex-column col-5">
                <div className="card admin-profile-setting mb-2">
                    <div className="card-body">
                        <h4 className="card-title">アカウント設定</h4>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='email'
                                value={adminInfo.email}
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    setAdminInfo((prev) => ({
                                        ...prev,
                                        [name]: value
                                    }));
                                }}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='password'
                                value={adminInfo.password}
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    setAdminInfo((prev) => ({
                                        ...prev,
                                        [name]: value
                                    }));
                                }}
                            />
                        </div>

                        <div className="input-group flex-row-reverse m-0">
                            <button className="btn btn-primary" onClick={updateAdminInfo}>管理者情報の更新</button>
                        </div>
                    </div>
                </div>
                <div className="card mb-2">
                    <div className="card-body">
                        <h4 className="card-title mb-5">バックアップ情報</h4>
                        <div className="table-responsive-sm update_table">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>PDF</th>
                                        <th>Database</th>
                                        <th>Backup Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        updateHistory.map((ele, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <Link to={ele.data_path} download>{splishPath(ele.data_path)}</Link>
                                                </td>
                                                <td>
                                                    <Link to={ele.database_path} download>{splishPath(ele.database_path)}</Link>
                                                </td>
                                                <td>{getDate(ele.create_at)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column col-7 ms-3">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-5">ユーザー連絡先</h4>

                        <div className="table-responsive-sm">
                            <div className="d-flex justify-content-end">
                                <div className="input-group search-bar">
                                    <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="検索"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>表題</th>
                                        <th>サブタイトル</th>
                                        <th>内容</th>
                                        <th>送信者のメールアドレス</th>
                                        <th>投稿日</th>
                                        <th>状態</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center">データが存在しません。</td>
                                            </tr>
                                        ) : (
                                            currentItems.map((ele, idx) => (
                                                <tr key={idx}>
                                                    <td>{(idx + 1) + currentPage * itemsPerPage - itemsPerPage}</td>
                                                    <td>{ele.title}</td>
                                                    <td>{ele.subTitle}</td>
                                                    <td>{ele.content}</td>
                                                    <td>{ele.senderInfo}</td>
                                                    <td>{getDate(ele.date)}</td>
                                                    <td onClick={() => changeStatus(idx)}>{
                                                        ele.status === 0 ? <span className='font-red'>Unread</span> : <span className='font-green'>Read</span>}</td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>


                            <div className="d-flex justify-content-center w-100">
                                <ul className="pagination pagination-sm">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link to="#" className="page-link" onClick={prevPage}>Prev</Link>
                                    </li>
                                    <li className="page-item"><Link to="#" className="page-link">{currentPage}</Link></li>
                                    <li className={`page-item ${currentItems.length < itemsPerPage ? 'disabled' : ''}`}>
                                        <Link to="#" className="page-link" onClick={nextPage}>Next</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountManagement;

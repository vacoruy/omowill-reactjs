import React, { useEffect, useContext, useState } from "react";
import './pdfORvideo.css';

import { AuthContext } from '../../context/AuthProvider';
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../includes/spinner";

function PdfOrVideo() {
    const { paidUserIdx } = useContext(AuthContext);
    const [userList, setUserList] = useState([]);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Change this value as per your requirement
    // const [searchTerm, setSearchTerm] = useState("");
    const [searchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const handleRowClick = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const next = () => {
        setCurrentPage(prev => prev + 1);
    }

    const prev = () => {
        setCurrentPage(prev => prev - 1);
    }

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);
    // }

    const getPdfFIleName = (fileUrl) => {
        var fileArray = fileUrl.split('/');

        return fileArray[fileArray.length - 1];
    }

    const changeDataType = (date) => {
        const today = new Date(date);

        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getPaidUser();
    }, []);

    const getPaidUser = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/getPaidUserList', paidUserIdx);

            setUserList(response.data.data);

            setLoading(false);

        } catch (error) {
            toast.error('Please check the network Connections');
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>;

    // Filter users based on search term
    const filteredUsers = userList ? userList.filter(user =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.birthdate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prefectures.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address2.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.postal_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.password.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.created_at.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="position-relative user-handle req-video-view">
            <div className="table-responsive-sm pt-5">
                {/* <div className="d-flex justify-content-end">
                    <div className="input-group search-bar">
                        <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div> */}

                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>姓</th>
                            <th>名前</th>
                            <th>生年月日</th>
                            <th>都道府県</th>
                            <th>住所１</th>
                            <th>住所２</th>
                            <th>郵便番号</th>
                            <th>マンション名</th>
                            <th>メールアドレス</th>
                            <th>パスワード</th>
                            <th>電話</th>
                            <th>作成日</th>
                            <th>もっと詳しく</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => handleRowClick(index)} className="dropdown-toggle">
                                    <td>{item.id}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{changeDataType(item.birthdate)}</td>
                                    <td>{item.prefectures}</td>
                                    <td>{item.address1}</td>
                                    <td>{item.address2}</td>
                                    <td>{item.postal_code}</td>
                                    <td>{item.apartment}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>{item.telephone}</td>
                                    <td>{changeDataType(item.created_at)}</td>
                                    <td>もっと見せる</td>
                                </tr>
                                <tr className={`dropdown-menu ${openDropdown === index ? 'show' : ''}`}>
                                    <td colSpan="14">
                                        <div className="d-flex w-100 text-left detail-info flex-column">
                                            <h3 className="fw-bold m-2 ps-3 pe-3">自筆証書遺言</h3>
                                            <div className="d-flex flex-row">
                                                <div className="col">
                                                    <div>
                                                        <h6>
                                                            更新日: {changeDataType(item.will_update_date)}
                                                        </h6>
                                                        <h6 onClick={() => window.open(item.will_real_url, '_blank')}>
                                                            PDF URL: <span className="pdf-open">{getPdfFIleName(item.will_real_url)}</span>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex w-100 text-left detail-info flex-column">
                                            <h3 className="fw-bold m-2 ps-3 pe-3">死亡時に残すメッセージ(Youtube)</h3>
                                            <div className="d-flex flex-row">
                                                <div className="col">
                                                    <div>
                                                        <h5 className="fw-bold">家族・恋人</h5>
                                                        <h6>
                                                            受取人氏名: {item.video_family_lawyer_name}
                                                        </h6>
                                                        <h6>
                                                            受取人生年月日: {changeDataType(item.video_family_lawyer_birth)}
                                                        </h6>
                                                        <h6>
                                                            更新日: {changeDataType(item.video_family_update_date)}
                                                        </h6>
                                                        <h6>
                                                            Video URL: {item.video_family_url}
                                                        </h6>
                                                        <h6 className="mt-2">
                                                            {
                                                                item.video_family_description
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div>
                                                        <h5 className="fw-bold">友人</h5>
                                                        <h6>
                                                            受取人氏名: {item.video_relation_lawyer_name}
                                                        </h6>
                                                        <h6>
                                                            受取人生年月日: {changeDataType(item.video_relation_lawyer_birth)}
                                                        </h6>
                                                        <h6>
                                                            更新日: {changeDataType(item.video_relation_update_date)}
                                                        </h6>
                                                        <h6>
                                                            Video URL: {item.video_relation_url}
                                                        </h6>
                                                        <h6 className="mt-2">
                                                            {
                                                                item.video_relation_description
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div>
                                                        <h5 className="fw-bold">他の</h5>
                                                        <h6>
                                                            受取人氏名: {item.video_other_lawyer_name}
                                                        </h6>
                                                        <h6>
                                                            受取人生年月日: {changeDataType(item.video_other_lawyer_birth)}
                                                        </h6>
                                                        <h6>
                                                            更新日: {changeDataType(item.video_other_update_date)}
                                                        </h6>
                                                        <h6>
                                                            Video URL: {item.video_other_url}
                                                        </h6>
                                                        <h6 className="mt-2">
                                                            {
                                                                item.video_other_description
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex w-100 text-left detail-info flex-column">
                                            <h3 className="fw-bold m-2 mt-3 ps-3 pe-3">死亡時に残すメッセージ(PDF)</h3>
                                            <div className="d-flex flex-row">
                                                <div className="col">
                                                    <div>
                                                        <h5 className="fw-bold">家族・恋人</h5>
                                                        <h6>
                                                            受取人氏名: {item.pdf_family_lawyer_name}
                                                        </h6>
                                                        <h6>
                                                            受取人生年月日: {changeDataType(item.pdf_family_lawyer_birth)}
                                                        </h6>
                                                        <h6>
                                                            更新日: {changeDataType(item.pdf_family_update_date)}
                                                        </h6>
                                                        <h6 onClick={() => window.open(item.pdf_family_url, '_blank')}>
                                                            Pdf URL: <span className="pdf-open">{getPdfFIleName(item.pdf_family_url)}</span>
                                                        </h6>
                                                        <h6 className="mt-2">
                                                            {
                                                                item.pdf_family_description
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div>
                                                        <h5 className="fw-bold">友人</h5>
                                                        <h6>
                                                            受取人氏名: {item.pdf_relation_lawyer_name}
                                                        </h6>
                                                        <h6>
                                                            受取人生年月日: {changeDataType(item.pdf_relation_lawyer_birth)}
                                                        </h6>
                                                        <h6>
                                                            更新日: {changeDataType(item.pdf_relation_update_date)}
                                                        </h6>
                                                        <h6 onClick={() => window.open(item.pdf_relation_url, '_blank')}>
                                                            pdf URL: <span className="pdf-open">{getPdfFIleName(item.pdf_relation_url)}</span>
                                                        </h6>
                                                        <h6 className="mt-2">
                                                            {
                                                                item.pdf_relation_description
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div>
                                                        <h5 className="fw-bold">他の</h5>
                                                        <h6>
                                                            受取人氏名: {item.pdf_other_lawyer_name}
                                                        </h6>
                                                        <h6>
                                                            受取人生年月日: {changeDataType(item.pdf_other_lawyer_birth)}
                                                        </h6>
                                                        <h6>
                                                            更新日: {changeDataType(item.pdf_other_update_date)}
                                                        </h6>
                                                        <h6 onClick={() => window.open(item.pdf_other_url, '_blank')}>
                                                            Pdf URL: <span className="pdf-open">{getPdfFIleName(item.pdf_other_url)}</span>
                                                        </h6>
                                                        <h6 className="mt-2">
                                                            {
                                                                item.pdf_other_description
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex w-100 text-left detail-info flex-column">
                                            <h3 className="fw-bold m-2 ps-3 pe-3">生誕時に残すメッセージ(Youtube)</h3>
                                            <div className="d-flex flex-row">
                                                {
                                                    item.video_child0_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.video_child0_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.video_child0_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.video_child0_update_date)}
                                                            </h6>
                                                            <h6>
                                                                Youtube URL: {item.video_child0_url}
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.video_child0_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.video_child1_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.video_child1_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.video_child1_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.video_child1_update_date)}
                                                            </h6>
                                                            <h6>
                                                                Youtube URL: {item.video_child1_url}
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.video_child1_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.video_child2_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.video_child2_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.video_child2_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.video_child2_update_date)}
                                                            </h6>
                                                            <h6>
                                                                Youtube URL: {item.video_child2_url}
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.video_child2_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.video_child3_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.video_child3_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.video_child3_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.video_child3_update_date)}
                                                            </h6>
                                                            <h6>
                                                                Youtube URL: {item.video_child3_url}
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.video_child3_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.video_child4_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.video_child4_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.video_child4_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.video_child4_update_date)}
                                                            </h6>
                                                            <h6>
                                                                Youtube URL: {item.video_child4_url}
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.video_child4_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <div className="d-flex w-100 text-left detail-info flex-column">
                                            <h3 className="fw-bold m-2 ps-3 pe-3">生誕時に残すメッセージ(PDF)</h3>
                                            <div className="d-flex flex-row">
                                                {
                                                    item.video_child0_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.pdf_child0_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.pdf_child0_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.pdf_child0_update_date)}
                                                            </h6>
                                                            <h6 onClick={() => window.open(item.pdf_child0_url, '_blank')}>
                                                                PDF URL: <span className="pdf-open">{getPdfFIleName(item.pdf_child0_url)}</span>
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.pdf_child0_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.pdf_child1_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.pdf_child1_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.pdf_child1_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.pdf_child1_update_date)}
                                                            </h6>
                                                            <h6 onClick={() => window.open(item.pdf_child1_url, '_blank')}>
                                                                PDF URL: <span className="pdf-open">{getPdfFIleName(item.pdf_child1_url)}</span>
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.pdf_child1_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.pdf_child2_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.pdf_child2_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.pdf_child2_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.pdf_child2_update_date)}
                                                            </h6>
                                                            <h6 onClick={() => window.open(item.pdf_child2_url, '_blank')}>
                                                                PDF URL: <span className="pdf-open">{getPdfFIleName(item.pdf_child2_url)}</span>
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.pdf_child2_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.pdf_child3_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.pdf_child3_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.pdf_child3_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.pdf_child3_update_date)}
                                                            </h6>
                                                            <h6 onClick={() => window.open(item.pdf_child3_url, '_blank')}>
                                                                PDF URL: <span className="pdf-open">{getPdfFIleName(item.pdf_child3_url)}</span>
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.pdf_child3_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    item.pdf_child4_status === 1 &&
                                                    <div className="col">
                                                        <div>
                                                            <h6>
                                                                こども氏名: {item.pdf_child4_name}
                                                            </h6>
                                                            <h6>
                                                                生年月日: {changeDataType(item.pdf_child4_birth)}
                                                            </h6>
                                                            <h6>
                                                                更新日: {changeDataType(item.pdf_child4_update_date)}
                                                            </h6>
                                                            <h6 onClick={() => window.open(item.pdf_child4_url, '_blank')}>
                                                                PDF URL: <span className="pdf-open">{getPdfFIleName(item.pdf_child4_url)}</span>
                                                            </h6>
                                                            <h6 className="mt-2">
                                                                簡単な説明: {item.pdf_child4_description}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center w-100">
                    <ul className="pagination pagination-sm">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to="#" className="page-link" onClick={prev}>Prev</Link>
                        </li>
                        <li className="page-item"><Link to="#" className="page-link">{currentPage}</Link></li>
                        <li className={`page-item ${currentItems.length < itemsPerPage ? 'disabled' : ''}`}>
                            <Link to="#" className="page-link" onClick={next}>Next</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {
                loading && <Spinner />
            }
        </div>
    );
}

export default PdfOrVideo;

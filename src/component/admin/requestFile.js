import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../includes/spinner";
import { Link } from "react-router-dom";

function RequestFile() {
    const [isLoading, setIsLoading] = useState(false);
    const [paidUserList, setPaidUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); 

    const changeDataType = (date) => {
        const today = new Date(date);
    
        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const next = () => {
        setCurrentPage(prev => prev + 1);
    }

    const prev = () => {
        setCurrentPage(prev => prev - 1);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        getRequestFile();
    }, []);

    const getRequestFile = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/getRequestUserINfo', {});
            if (response.data.message === 200) {
                setPaidUserList(response.data.data);
            } else {
                console.log(response.data.message);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    
    // Filter users based on search term
    const filteredUsers = paidUserList ? paidUserList.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.birth.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.relation_file.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.death_file.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="position-relative user-handle">
            <div className="table-responsive-sm">
                <div className="d-flex justify-content-end">
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
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>姓</th>
                            <th>名前</th>
                            <th>生年月日</th>
                            <th>住所</th>
                            <th>メールアドレス</th>
                            <th>遺族との関係が分かる書類</th>
                            <th>死亡届出書 、 死体検案書</th>
                            <th>故人氏名</th>
                            <th>作成日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.length === 0 && 
                            <tr>
                                <td className="text-center" colSpan={10}>データが存在しません。</td>
                            </tr>
                        }
                        {filteredUsers.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{changeDataType(item.birth)}</td>
                                <td>{item.address}</td>
                                <td>{item.email}</td>
                                <td>{item.relation_file}</td>
                                <td>{item.death_file}</td>
                                <td>{item.user_id}</td>
                                <td>{changeDataType(item.create_at)}</td>
                            </tr>
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
                isLoading && <Spinner />
            }
        </div>
    )
}

export default RequestFile;
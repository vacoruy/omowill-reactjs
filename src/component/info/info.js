import { useEffect, useState } from "react";

import './info.css';
import GoTopPage from "../includes/goTopPage";
import Spinner from "../includes/spinner";
import axios from "axios";

// import { toast } from "react-toastify";
// import { translate } from "pdf-lib";

function Info() {
    const [infoData, setInfo] = useState([]);
    const [spinnerFlg, setSpinnerFlg] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            setSpinnerFlg(true);
            try {
                var endpoint = '/getInfo';
                const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, {});

                setInfo(response.data);
            } catch (error) {
                // Handle error if necessary
            } finally {
                setSpinnerFlg(false);
            }
        };

        getInfo();
    }, []);

    const resetDate = (value) => {
        if (value < 10) {
            return '0' + value
        } else {
            return value
        }
    }
    return (
        <div className="position-relative">
            <div className='container info-list-container'>
                <div className="info-header d-flex flex-column">
                    <h2 className='fw-bold w-100'>お知らせ</h2>
                    <p className='en fw-bold'>Information</p>
                    <p>サービスチームから毎日新しいお知らせが届きます。</p>
                </div>
                {
                    infoData === 'no data' ? (
                        <div className="info-list-content d-flex flex-column">
                            <div className="info-content-header text-center">
                                <h3>データが存在しません</h3>
                            </div>
                        </div>
                    ) : (
                        infoData.map((item, idx) => (
                            <div className="info-list-content d-flex flex-column" key={idx}>
                                <div className="info-content-header">
                                    <h4>
                                        {new Date(item.date).getFullYear()}&nbsp;{resetDate(new Date(item.date).getMonth() + 1)}.{resetDate(new Date(item.date).getDate())}
                                    </h4>
                                    <h3>{item.title}</h3>
                                    <p>{item.subTitle}</p>
                                </div>

                                <div className="info-body">
                                    <p>
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

            <GoTopPage />

            {spinnerFlg && <Spinner />}
        </div>
    )
}

export default Info;
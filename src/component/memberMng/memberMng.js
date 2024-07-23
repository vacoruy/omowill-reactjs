import { useEffect, useState } from "react";
import $ from "jquery";

function MemberMng() {
    const [userInfos, setUserInfos] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/members', {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    setUserInfos(data);
                    setTimeout(() =>{
                        init(data)
                    }, 1500);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])

    const init = (data) =>{
        for(var i = 0; i < data.length; i++){
            $(`#user_${i}`).prop('checked', data[i].state);
        }
    }

    const memberBlock = (index) => {
        userInfos[index].state = Number(!(userInfos[index].state));
        $(`#user_${index}`).prop('checked', userInfos[index].state);

        const state = {
            index: userInfos[index].id,
            value: userInfos[index].state
        }

        fetch(process.env.REACT_APP_API_URL + '/membersBlock', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(state)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.data ==='failure') {
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <div>
            <div className='container'>
                <h2 className='fw-bold w-100 text-center mt-5'>会員管理</h2>
            </div>
            <div className='bg-secondary mt-5 pb-5'>
                <div className='container px-0 pt-5'>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered pt-10 text-center bg-white">
                            <thead>
                                <tr>
                                    <th style={{ verticalAlign: "middle" }} rowSpan="2">番号</th>
                                    <th colSpan="2" className="text-center" rowSpan="1">氏名</th>
                                    <th style={{ verticalAlign: "middle" }} rowSpan="2" className="text-center" >Eamil</th>
                                    <th style={{ verticalAlign: "middle" }} rowSpan="2" className="text-center" >生年月日</th>
                                    <th colSpan="4" style={{ verticalAlign: "middle" }} rowSpan="1" className="text-center" >住所</th>
                                    <th style={{ verticalAlign: "middle" }} rowSpan="2" className="text-center" >電話番号</th>
                                    <th style={{ verticalAlign: "middle" }} rowSpan="2" className="text-center" >状態</th>
                                </tr>
                                <tr>
                                    <th className="text-center" >姓</th>
                                    <th className="text-center" >名前</th>
                                    <th className="text-center" >都道府県</th>
                                    <th className="text-center" >住所１</th>
                                    <th className="text-center" >住所2</th>
                                    <th className="text-center" >マンション名</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userInfos.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.birth}</td>
                                            <td>{item.prefectures}</td>
                                            <td>{item.address1}</td>
                                            <td>{item.address2}</td>
                                            <td>{item.apartment}</td>
                                            <td>{item.telephone}</td>
                                            <td><input id={`user_${index}`} type="checkbox" onChange={() => memberBlock(index)} /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MemberMng;
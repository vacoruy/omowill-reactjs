import { useEffect, useContext, useState } from "react";
import { AuthContext } from '../../context/AuthProvider';
import axios from "axios";
import { toast } from 'react-toastify';

function ProfileSetting() {
    const { omowillAuth, setCookie } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(omowillAuth);

    const updateProfile = async () => {
        try {
            setCookie(userProfile);
            await axios.post(process.env.REACT_APP_API_URL + '/updateUserInfo', userProfile);
            toast.success('profile Update success');
        } catch (error) {
            toast.error('Please check the network connection');
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        setUserProfile(omowillAuth);
    }, [omowillAuth]);


    return (
        <div className='profile-setting'>
            <h3 className='fw-bold text-center'>プロフィール設定</h3>

            <div className='d-flex justify-content-center'>
                <div className='form'>
                    <div className="input-group">
                        <span className="input-group-text">姓</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="姓"
                            name="firstname"
                            value={userProfile.userInfo.firstname}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">名前</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="名前"
                            value={userProfile.userInfo.lastname}
                            name="lastname"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">生年月日</span>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="生年月日"
                            value={formatDate(userProfile.userInfo.birthdate)}
                            name="birthdate"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">都道府県</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="都道府県"
                            value={userProfile.userInfo.prefectures}
                            name="prefectures"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">住所１</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="住所１"
                            value={userProfile.userInfo.address1}
                            name="address1"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">住所２</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="住所２"
                            value={userProfile.userInfo.address2}
                            name="address2"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Postal Code</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Postal Code"
                            value={userProfile.userInfo.postal_code}
                            name="postal_code"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">メールアドレス</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="メールアドレス"
                            value={userProfile.userInfo.email}
                            name="email"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">電話(任意)</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="電話(任意)"
                            value={userProfile.userInfo.telephone}
                            name="telephone"
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setUserProfile((prev) => ({
                                    ...prev,
                                    userInfo: {
                                        ...prev.userInfo,
                                        [name]: value
                                    }
                                }));
                            }}
                        />
                    </div>

                    <div className="d-flex flex-row-reverse mt-5">
                        <button className="btn btn-primary" onClick={updateProfile}>update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetting;
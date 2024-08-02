
import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../../context/AuthProvider';

import BornVideo from './born/bornVideo';
import BornPDF from './born/bornPDF';
import DeathPDF from './death/deathPDF';
import DeathVideo from './death/deathvideo';
import './my.css';
import ProfileSetting from './profilesetting';
import MakeWill from './will/makewill';
import axios from 'axios';

function MyPage() {
    const { omowillAuth, getUserData } = useContext(AuthContext);
    const [omowillAuthData] = useState(omowillAuth);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        try {
            // const userDataResponse = await getUserData();
            const requestBody = {
                id: omowillAuthData.id
            };

            const response = await axios.post(process.env.REACT_APP_API_URL + '/getUserData', requestBody);
            
            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle the error appropriately (e.g., show an error message).
        }
    }, [getUserData]);

    useEffect(() => {
        // setOmowillAuthData(omowillAuth);
        
        fetchUserData();
    }, [fetchUserData]);


    if (loading) {
        return (
            <div>loading ...</div>
        )
    }

    return (
        <div className="my-container d-flex">
            <div className='my-sidebar-left'>
                <ul className="nav nav-tabs flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#whenDeath">死亡時に残すメッセージ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#whenBirth">生誕時に残すメッセージ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#makeWill">自筆証書遺言見本PDF 作成</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#profileSetting">プロファイル設定</a>
                    </li>
                </ul>
            </div>

            <div className="tab-content flex-grow-1 my-tab-content">
                <div className="tab-pane container active" id="whenDeath">

                    <div className='d-flex flex-column'>
                        <h4 className='w-100 border pt-4 pb-4 fw-bold cursor-pointer my-content-title m-0'>死亡時に残すメッセージ</h4>

                        <ul className="nav nav-tabs nav-justified my-sub-tabs-header">
                            <li className="nav-item">
                                <a className="nav-link active pt-4 pb-4 fw-bold" data-bs-toggle="tab" href="#willVideo"><h5 className='fw-bold m-0'>動画</h5></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pt-4 pb-4 fw-bold" data-bs-toggle="tab" href="#willPDF"><h5 className='fw-bold m-0'>PDF</h5></a>
                            </li>
                        </ul>

                        <div className="tab-content border border-top-0 pb-3 pt-3 px-0 px-md-4">
                            <div className="tab-pane container active" id="willVideo">
                                <div className='p-2 mb-4 mt-4'>
                                    <h3 className='mb-4'>
                                        動画を残す方法
                                    </h3>

                                    <div className='d-flex px-2 flex-column flex-md-row gap-3 gap-md-0'>
                                        <h6 className='guide pe-0 pe-md-5'>
                                            動画を残すには、まずYouTubeに動画をアップロードした後、Waontに戻る必要があります。 次に会員登録をし、マイページから動画を残すきっかけを選択します。 次の動画ボタンをクリック(デフォルトで選択されています。)し・受取人情報を入力します。 次にYouTubeにアップロードした動画のパスを入力し・保存ボタンをクリックすれば完了です。
                                        </h6>
                                        <iframe
                                            title="deathVideo"
                                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                                            height='180px'
                                            className='rounded-3'
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                                <DeathVideo deathVideo={userData.wills.videos} />
                            </div>
                            <div className="tab-pane container fade" id="willPDF">
                                <div className='p-2 mb-4 mt-4'>
                                    <h3 className='mb-4'>
                                        <span className='en fw-bold'>PDF</span>を残す方法
                                    </h3>

                                    <div className='d-flex px-2'>
                                        <h6 className='guide pe-0 pe-md-5'>
                                            PDFを残す方法は基本的に動画を残す時と同じです。 PDFを残すには・会員登録を行い・マイページからPDFを残すきっかけを選択します。 次に・PDFボタンをクリック(基本的に動画ボタンが選択されています。)をクリックした後・受信者情報と残したいメッセージを入力します。 その後・保存ボタンをクリックすれば完了です。
                                        </h6>
                                        {/* <iframe
                                            title="deathVideo"
                                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                                            height='180px'
                                            className='rounded-3'
                                        ></iframe> */}
                                    </div>
                                </div>

                                <DeathPDF deathPdf={userData.wills.pdf} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="tab-pane container fade" id="whenBirth">
                    <div className='d-flex flex-column'>
                        <h4 className='w-100 border pt-4 pb-4 fw-bold cursor-pointer my-content-title m-0'>生誕時に残すメッセージ</h4>

                        <ul className="nav nav-tabs nav-justified my-sub-tabs-header">
                            <li className="nav-item">
                                <a className="nav-link active pt-4 pb-4 fw-bold" data-bs-toggle="tab" href="#bornVideo"><h5 className='m-0'>動画</h5></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pt-4 pb-4 fw-bold" data-bs-toggle="tab" href="#bornPDF"><h5 className='m-0'>PDF</h5></a>
                            </li>
                        </ul>


                        <div className="tab-content border border-top-0 pb-3 pt-3 px-0 px-md-4">
                            <div className="tab-pane container active" id="bornVideo">
                                <div className='p-2 mb-4 mt-4'>
                                    <h3 className='fw-bold mb-4'>
                                        動画を残す方法
                                    </h3>

                                    <div className='d-flex px-2 flex-column flex-md-row gap-3 gap-md-0'>
                                        <h6 className='guide pe-0 pe-md-5'>
                                            動画を残すには、まずYouTubeに動画をアップロードした後、Waontに戻る必要があります。 次に会員登録をし、マイページから動画を残すきっかけを選択します。 次の動画ボタンをクリック(デフォルトで選択されています。)し・受取人情報を入力します。 次にYouTubeにアップロードした動画のパスを入力し・保存ボタンをクリックすれば完了です。
                                        </h6>
                                        <iframe
                                            title="deathVideo"
                                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                                            height='180px'
                                            className='rounded-3'
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>

                                <BornVideo bornsVideo = {userData.borns.videos} />
                            </div>

                            <div className="tab-pane container" id="bornPDF">
                                <div className='p-2 mb-4 mt-4'>
                                    <h2 className='fw-bold mb-3'>
                                        <span className='en fw-bold'>PDF</span>を残す方法
                                    </h2>

                                    <div className='d-flex px-2'>
                                        <p className='guide pe-0 pe-md-5'>
                                            PDFを残す方法は基本的に動画を残す時と同じです。 PDFを残すには・会員登録を行い・マイページからPDFを残すきっかけを選択します。 次に・PDFボタンをクリック(基本的に動画ボタンが選択されています。)をクリックした後・受信者情報と残したいメッセージを入力します。 その後・保存ボタンをクリックすれば完了です。
                                        </p>
                                    </div>
                                </div>

                                <BornPDF bornsPdf = {userData.borns.pdf}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane container fade" id="makeWill">
                    <MakeWill makeWill = {userData.makeWills} />
                </div>
                <div className="tab-pane container fade" id="profileSetting">
                    <ProfileSetting userData = {userData} />
                </div>
            </div>
        </div>
    )
}

export default MyPage;
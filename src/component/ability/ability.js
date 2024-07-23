import { useContext } from "react";

import "./ability.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ConfigContext } from "../../context/ConfigProvider";

function Ability() {
    // const {selTabInfo, changeSelTabInfo} = useContext(ConfigContext);
    const {changeTabIdx} = useContext(ConfigContext);

    const navigate = useNavigate();

    const gotoURL = (url) => {
        navigate(url);
    };

    const switchTab = (tabIndx) => {
        changeTabIdx(tabIndx);
    }

    return (
        <div className='d-flex w-100 ability-card-content'>
            <div className='border d-flex flex-column justify-content-between card-content' >
                <div className='d-flex justify-content-between pb-5'>
                    <h6 className='en mt-4'>Main</h6>
                    <h1 className="card-number">01</h1>
                </div>
                <h4 className="mt-5">「亡くなった時」<br />に備えて大切な人にメッセージを残す</h4>
                <h5 className="fw-bold mt-4 mb-4">遺書のようなメッセージを残す</h5>
                <h6>動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                    <Link to="/service"  onClick={()=>switchTab(0)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                    <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL("/mypage/death")}>利用する</button>
                </div>
            </div>
            <div className='border d-flex flex-column justify-content-between card-content'>
                <div className='d-flex justify-content-between pb-5'>
                    <h6 className='en mt-4'>Main</h6>
                    <h1 className="card-number">02</h1>
                </div>
                <h4 className="mt-5">「生誕時」<br />に産まれた時の気持ちを残す</h4>
                <h5 className="fw-bold mt-4 mb-4">生誕時の想いをメッセージとして残す</h5>
                <h6>動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                    <Link to="/service"  onClick={()=>switchTab(0)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                    <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL("/mypage/newborn")}>利用する</button>
                </div>
            </div>
            <div className='border d-flex flex-column justify-content-between card-content'>
                <div className='d-flex justify-content-between pb-5'>
                    <h6 className='en mt-4'>Sub</h6>
                    <h1 className="card-number">03</h1>
                </div>
                <h4 className="mt-5">自筆遺言の見本を作る</h4>
                <h5 className="fw-bold mt-4 mb-4">自筆証書遺言の見本を作る</h5>
                <h6>サブコンテンツとして、自筆証書遺言の見本が作成できます。 お名前などの情報を入力頂くと、自筆証書遺言の見本が発行されます。それを元に遺言書を作成でき、メールにて即時に受け取れます。</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                    <Link to="/service" onClick={()=>switchTab(1)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                    <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL("/mypage/newborn")}>利用する</button>
                </div>
            </div>
        </div>
    );
}

export default Ability;

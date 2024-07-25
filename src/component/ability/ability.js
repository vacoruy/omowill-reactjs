import { useContext } from "react";

import "./ability.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ConfigContext } from "../../context/ConfigProvider";

function Ability() {
    // const {selTabInfo, changeSelTabInfo} = useContext(ConfigContext);
    const { changeTabIdx } = useContext(ConfigContext);

    const navigate = useNavigate();

    const gotoURL = (url) => {
        navigate(url);
    };

    const switchTab = (tabIndx) => {
        changeTabIdx(tabIndx);
    }

    return (
        <div className='d-flex w-100 ability-card-content'>
            <div className='border d-flex flex-column card-content'>
                <h6 className='en en-card-title'>Main</h6>
                <h1 className="card-number">01</h1>
                <h4 className="fw-bold">「亡くなった時」</h4>
                <h5 className="fw-bold">遺書のようなメッセージを残す</h5>
                <h6>動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                    <Link to="/service" onClick={() => switchTab(0)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                    <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL("/mypage/death")}>利用する</button>
                </div>
            </div>
            <div className='border d-flex flex-column card-content'>
                <h6 className='en en-card-title'>Main</h6>
                <h1 className="card-number">02</h1>
                <h4>「生誕時」</h4>
                <h5 className="fw-bold">生誕時の想いをメッセージとして残す</h5>
                <h6>動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                    <Link to="/service" onClick={() => switchTab(0)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                    <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL("/mypage/newborn")}>利用する</button>
                </div>
            </div>
            <div className='border d-flex flex-column card-content'>
                <h6 className='en en-card-title'>Sub</h6>
                <h1 className="card-number">03</h1>
                <h4>自筆遺言の見本を作る</h4>
                <h5 className="fw-bold">自筆証書遺言の見本を作る</h5>
                <h6>サブコンテンツとして、自筆証書遺言の見本が作成できます。 お名前などの情報を入力頂くと、自筆証書遺言の見本が発行されます。それを元に遺言書を作成でき、メールにて即時に受け取れます。</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                    <Link to="/service" onClick={() => switchTab(1)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                    <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL("/mypage/newborn")}>利用する</button>
                </div>
            </div>
        </div>
    );
}

export default Ability;

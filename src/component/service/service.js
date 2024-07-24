import { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from "../../context/ConfigProvider";
// import $ from 'jquery';


import './service.css';
import Ability from '../ability/ability';

import MakeWillPDF from '../../assets/samplepdf/makeWill.pdf';
import GoTopPage from '../includes/goTopPage';

function Service() {
    const { tabIdx, changeTabIdx } = useContext(ConfigContext);
    const myRef = useRef();

    const [acitveSidebar, setAcitveSidebar] = useState(false); //when mobile, toggle side bar;
    const tabRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const sidebarToggle = () => {
        setAcitveSidebar(!acitveSidebar);
    }

    const handleTab = (selTabIdx) => {
        window.scrollTo({ top: myRef.current.offsetHeight, behavior: 'smooth' });

        changeTabIdx(selTabIdx);
    }


    useEffect(() => {
        if (tabIdx !== null) {
            tabRefs[tabIdx].current.click();
        }
    }, [tabIdx, tabRefs]);

    return (
        <div className="service-container position-relative">
            <div className='container service-description' ref={myRef}>
                <div className="d-flex justify-content">
                    <div className='service-des-logo-title'>
                        <h1 style={{ textAlign: 'center' }} className='en'>OMOWILL</h1>
                    </div>

                    <div className='service-des-detail'>
                        <h3 className='text-center'>何のために必要なのか？</h3>
                        <h6 className='mt-5'>
                            人生の最後に、自分のこれまでの人生を振り返り、家族への思いをまとめる目的で作成する覚書のことです。
                        </h6>
                        <br />
                        <h6>
                            エンディング・オブ・ライフ」とも呼ばれ、自分の死後、残された家族がさまざまな手続きを行うために必要な情報を残すために使われることが多い。
                        </h6>
                        <br />
                        <h6>
                            経済産業省が2012年に発表した報告書によると、幅広い年齢層がエンディングテキストの作成に関心を示しているという。
                        </h6>
                        <br />
                        <h6>
                            調査してみると、30代の若者でも約3割、70代以上では2人に1人がエンディングテキストの作成意向があることがわかる。
                        </h6>
                        <br />
                        <h6>
                            エンディングノートの書き方や内容は自由に決めることができ、財産分与などの法的拘束力もありません。
                        </h6>
                        <br />
                        <h6>
                            これまでの人生を振り返る意味合いもあるので、若いうちから日々のメモとして作成しておくとよいだろう。
                        </h6>
                        <br />
                        <h6>
                            何を書くかは自由に決められますが、何を書いたらいいのかわからないという方も多いと思いますので、今回は必要な項目をまとめてご紹介します。
                        </h6>
                    </div>
                </div>
            </div>

            <div className='service-detail-description' id="service-detail-description">
                <div className="d-flex service-sidebar">
                    <ul className={`nav nav-tabs flex-column sidebar-left ${acitveSidebar ? "sidebar-active" : ''}`} role="tablist">
                        <div className='sidebar-toggle' onClick={() => sidebarToggle()}>
                            {
                                acitveSidebar ? <i className="fa fa-angle-left" aria-hidden="true" /> : <i className="fa fa-angle-right" aria-hidden="true" />
                            }
                        </div>
                        <li className="nav-item">
                            <Link ref={tabRefs[0]} className="nav-link active" onClick={() => handleTab(0)} data-bs-toggle="tab" to="#endOfDie">亡くなった & 生誕時</Link>
                        </li>
                        <li className="nav-item">
                            <Link ref={tabRefs[1]} className="nav-link" onClick={() => handleTab(1)} data-bs-toggle="tab" to="#makeWill">自筆遺言の見本を作る</Link>
                        </li>
                        <li className="nav-item">
                            <Link ref={tabRefs[2]} className="nav-link" onClick={() => handleTab(2)} data-bs-toggle="tab" to="#makePdf">動画やPDFを残す方法</Link>
                        </li>
                        <li className="nav-item">
                            <Link ref={tabRefs[3]} className="nav-link" onClick={() => handleTab(3)} data-bs-toggle="tab" to="#requestReading">閲覧申請</Link>
                        </li>
                    </ul>


                    <div className="tab-content flex-grow-1 service-tab-content">
                        <div className='d-flex service-tab-box flex-column'>
                            <h1 className='service-tab-title'>詳細説明</h1>
                            <h5 className='service-tab-link-title fw-bold'>サービス&nbsp;&nbsp;/&nbsp;&nbsp;亡くなった時</h5>
                        </div>

                        <div id="endOfDie" className="container tab-pane active">
                            <div className='d-flex justify-content-center flex-column'>
                                <div className='sidebar-detail-content'>
                                    <h3>「亡くなった & 生誕時」に備えて大切な人にメッセージを残す</h3>

                                    <h5 className='fw-bold mb-2'>遺言書との違い</h5>
                                    <h6>
                                        生を終える過程で「遺言書」の作成を検討されている方も多いのではないでしょうか。
                                    </h6>
                                    <h6>
                                        遺言書との違いについて簡単にまとめてご紹介します。
                                    </h6>

                                    <table className="table table-bordered my-5">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>亡くなった & 生誕時</th>
                                                <th>遺言書</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>法的効力</td>
                                                <td>なし</td>
                                                <td>あり</td>
                                            </tr>
                                            <tr>
                                                <td>形式・様式</td>
                                                <td>なし</td>
                                                <td>あり<br />※規定の要件を満たさないと無効になる</td>
                                            </tr>
                                            <tr>
                                                <td>費用</td>
                                                <td>数百円〜</td>
                                                <td>自筆証書遺言：数百円〜<br />公正証書遺言：数万円〜</td>
                                            </tr>
                                            <tr>
                                                <td>記載内容</td>
                                                <td>自由</td>
                                                <td>主に財産分与</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <h6>
                                        死と出生時に残すメッセージは、記載内容や形式などは一切決まっておらず、自分の好きなように書くことができる。
                                    </h6><br />
                                    <h6>
                                        自分でメッセージを用意したり、ワードやエクセル、スマートフォンのメモ帳などのデジタルツールで作成することもある。
                                    </h6><br />
                                    <h6>
                                        自分が保有する財産や不動産について記載することも可能だが、法的効力はまったくないため、遺言書と同じような用途には使えない。
                                    </h6><br />
                                    <h6>
                                        一方、遺言書は、自分の死後の財産の分配について記載するのが一般的で、民法で定められた規定の要件に従って作成する必要があります。
                                    </h6><br />
                                    <h6>
                                        財産分与に関する法的効力を有する一方、規定された要件を満たさないとその遺言は無効となるため、自由に作成できるものではありません。
                                    </h6><br />
                                    <h6>
                                        遺言書と作成目的が異なるため、それぞれの違いを理解した上で作成する必要があります。
                                    </h6><br />
                                    <h6>
                                        日記を書くように日常を記録したり、写真を使ってアルバムのように作ったり、パソコンやスマートフォンでまとめるなど、方法は自由です。
                                    </h6><br />
                                    <h6>
                                        一般的には「残された家族へのメッセージ」や「自分の死後の各種手続きに必要な情報」を書くことが多いようです。
                                    </h6>
                                </div>
                            </div>

                            <Ability />

                        </div>
                        <div id="makeWill" className="container tab-pane fade">
                            <div className='d-flex justify-content-center flex-column'>
                                <div className='sidebar-detail-content'>
                                    <h3>自筆遺言の見本を作る</h3>
                                    <h6 className='mt-5'>
                                        遺言書を記載しておけば、死後の財産分与の際に混乱を避けることができます。
                                    </h6><br/>
                                    <h6>
                                        遺言書を作成する場合、保管場所についても整理しておけば、探す手間が省け、手続きまでの時間を短縮することができます。
                                    </h6><br/>
                                    <h6>
                                        また、OMOWILLは法的な効力がないため、財産分与の割合や相続人を指定したい場合は、遺言書を作成しておくことをおすすめします。
                                    </h6><br/>
                                    <h6>
                                        遺言書作成の詳しい紹介は、以下のリンクからご覧いただけます。
                                    </h6><br/>
                                    <h6>
                                        <Link to={MakeWillPDF} className='fw-bold' target='_blank' rel='noopener noreferrer'><i className="fa fa-caret-right me-1" aria-hidden="true" target="_blank" />詳細情報</Link>
                                    </h6>
                                </div>
                            </div>

                            <Ability />
                        </div>
                        <div id="makePdf" className="container tab-pane fade">
                            <div className='d-flex justify-content-center flex-column'>
                                <div className='sidebar-detail-content'>
                                    <h3>動画やPDFを残す方法</h3>
                                    <h6 className='mt-5'>
                                        動画を残すには、まずYouTubeに動画をアップロードした後、Waontに戻る必要があります。 次に会員登録をし、マイページから動画を残すきっかけを選択します。 次の動画ボタンをクリック(デフォルトで選択されています。)し・受取人情報を入力します。 次にYouTubeにアップロードした動画のパスを入力し・保存ボタンをクリックすれば完了です。
                                    </h6><br />
                                    <h6>
                                        PDFを残す方法は基本的に動画を残す時と同じです。 PDFを残すには・会員登録を行い・マイページからPDFを残すきっかけを選択します。 次に・PDFボタンをクリック(基本的に動画ボタンが選択されています。)をクリックした後・受信者情報と残したいメッセージを入力します。 その後・保存ボタンをクリックすれば完了です。
                                    </h6>
                                </div>
                            </div>

                            {/* <Ability /> */}

                        </div>
                        <div id="requestReading" className="container tab-pane fade">
                            <div className='d-flex justify-content-center flex-column'>
                                <div className='sidebar-detail-content'>
                                    <h3>ご家族やご遺族からの閲覧申請</h3>
                                    <h6 className='mt-5'>
                                        「亡くなった時」 「生誕時」のメッセージどちらも動画または手紙の登録時にログインID・PASSの記載されたPDFを発行。 その後、PDFを持って故人に代わってログインし、遺言書を閲覧することができる。 やむを得ずPDFを相続できなかった場合や紛失した場合は、動画・PDFの閲覧申請と300円の手数料を支払うことで、故人の遺言書を閲覧することができる。
                                    </h6>
                                </div>
                            </div>

                            {/* <Ability /> */}

                        </div>
                    </div>
                </div>
            </div>

            <GoTopPage />
        </div >
    )
}

export default Service;
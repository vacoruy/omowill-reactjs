import React from "react";
import GoTopPage from "../includes/goTopPage";

import './aboutus.css';

function Aboutus() {
    return (
        <div className="position-relative">
            <div className='container about-container'>
                <div className='about-death-content text-left'>
                    <h3 className='fw-bold'>死のケアへの現代的アプローチ</h3>
                    <h6>私たちは皆、死によって影響を受けるが、死について公然と語ることはない。社会は、私たちが悲しみを隠し、特定の時間枠の中で嘆き悲しむことを期待している。死は人間の普遍的な経験であるにもかかわらず、このような考え方は孤立させ、混乱させ、不公平である。</h6>
                    <br />
                    <h6>アイリーンはそれを変えたいと考えている。私たちは、愛する人を失った家族が支えられ、安心できる世界を思い描いている。悲しみが正常化され、人々が喪失感について語り合うコミュニティを築けるような世界を。</h6>
                    <br />
                    <h6>もしこれを読んでいるあなたが大切な人を亡くしたのなら、私たちはその悲しみを乗り越えるお手伝いをします。</h6>
                </div>

                <div className='trust-family'>
                    <h3 className='fw-bold'>何千もの家族と人々から信頼されている</h3>
                    <h6>私たちの思いやりと優しさへのコミットメントは、困難な時期に私たちが支援したご家族が語る証言にも表れています。</h6>

                    <div className="trust-content d-flex">
                        <div className="card flex-fill">
                            <div className="card-body">
                                <h3 className="fw-bold en">
                                    Akay Akyol
                                </h3>
                                <h6>
                                    「愛する人の最期を看取ることは、信じられないほど難しいことです。Omowill.comの思いやりのあるアドバイザーは、お別れのメッセージを作成し、有意義な追悼式を計画するプロセスを通して、必要な精神的サポートを提供してくれました。彼らは本当に私たちのニーズを第一に考えてくれました。」
                                </h6>
                            </div>
                        </div>

                        <div className="card flex-fill">
                            <div className="card-body">
                                <h3 className="fw-bold en">
                                    Kara Dikmen
                                </h3>
                                <h6>
                                    「Omowill.comは救世主でした！幼い子供がいるため、遺言書が必要であることは分かっていましたが、その思いは私を圧倒しました。Omowill.comのサービスはとても使いやすく、すべてのステップを案内してくれました。今では、娘の面倒を見ることができ、私の意志が尊重されるという安心感があります。」
                                </h6>
                            </div>
                        </div>

                        <div className="card flex-fill">
                            <div className="card-body">
                                <h3 className="fw-bold en">
                                    Nergis Basar
                                </h3>
                                <h6>
                                    「Omowill.comは明確で手頃な価格で遺言書を作成する方法を提供してくれました。Omowill.comは、遺言書作成を明瞭かつリーズナブルな価格で提供してくれました。従来の弁護士と比較して、そのサービスは驚くほど費用対効果が高く、料金体系も透明性があり、隠れた料金もありませんでした。非常にお勧めです！」
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GoTopPage />
        </div>
    )
}

export default Aboutus;
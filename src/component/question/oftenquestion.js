import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import './faq.css';

function OftenQuestion() {
    const faqContent = [
        {
            title: '私の情報は安全ですか？',
            content: "個人情報は安全に保護されます。紹介ツールに入力されるすべてのデータは匿名化され、安全に保護されます。この情報は、Omowill.comは、お客様がOmowill.comのウェブサイトに滞在している間、より関連性の高いコンテンツを提供するためにレコメンデーションを改善するためにのみ使用されます。"
        },
        {
            title: '私の情報は安全ですか？',
            content: '個人情報は安全に保護されます。\n 紹介ツールに入力されるすべてのデータは匿名化され、安全に保護されます。この情報は、Omowill.comは、お客様がOmowill.comのウェブサイトに滞在している間、より関連性の高いコンテンツを提供するためにレコメンデーションを改善するためにのみ使用されます。'
        },
        {
            title: '私の情報は安全ですか？',
            content: '個人情報は安全に保護されます。\n 紹介ツールに入力されるすべてのデータは匿名化され、安全に保護されます。この情報は、Omowill.comは、お客様がOmowill.comのウェブサイトに滞在している間、より関連性の高いコンテンツを提供するためにレコメンデーションを改善するためにのみ使用されます。'
        },
    ]
    const [faqFlgList, setFaqItemOpen] = useState([false, false, false]); // State for collapse visibility

    // Use useCallback to memoize the handleFaqCollapseToggle function
    const handleFaqCollapseToggle = useCallback((idx) => {
        setFaqItemOpen((prevFaqFlgList) => {
            return [...prevFaqFlgList.slice(0, idx), !prevFaqFlgList[idx], ...prevFaqFlgList.slice(idx + 1)];
        });
    }, []);

    return (
        <div>
            <div className='container faq-container d-flex flex-column'>
                <div className='faq-lg-txt'>
                    <p className='en'>FAQ</p>
                </div>

                <div className='faq-content-row'>
                    <div className='faq-header'>
                        <h2 className='fw-bold'>よく要求される質問</h2>
                        <p>ユーザーが最も多く発生したリクエストを投稿します。</p>
                    </div>

                    <div className='faq-area'>
                        <ul className="list-group list-group-flush">
                            {faqContent.map((item, idx) => (
                                <li className="list-group-item" key={idx}>
                                    <div
                                        onClick={() => handleFaqCollapseToggle(idx)}
                                        aria-controls={'faq-collapse' + idx}
                                        aria-expanded={faqFlgList[idx]}
                                        className='faq-title d-flex justify-content-between'
                                    >
                                        <span>{item.title}</span>
                                        <i className={faqFlgList[idx] ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} aria-hidden="true"></i>
                                    </div>
                                    <Collapse in={faqFlgList[idx]} className='faq-content'>
                                        <div id={'faq-collapse' + idx}>
                                            <p>
                                                {item.content}
                                            </p>
                                        </div>
                                    </Collapse>
                                </li>
                            ))}
                        </ul>

                        <div className='d-flex flex-column faq-contact'>
                            <p>まだお困りですか？  その他のご質問やご意見は、チームまでEメールでお寄せください。</p>
                            <Link to="/contact" className='btn btn-primary'>お問い合わせ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OftenQuestion;

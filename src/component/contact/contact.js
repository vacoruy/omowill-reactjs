import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isValidEmail from '../../util/checkEmail';

import './contact.css';
import axios from "axios";

function Contact() {
    const [contactInfo, setContactInfo] = useState({
        title: '',
        subTitle: '',
        content: '',
        receiverEmail: 'admin@admin.com',
        senderEmail: ''
    });

    const send = async () => {
        if (contactInfo.senderEmail === '') {
            toast.error('送信者のメールアドレスを入力してください。 ');
        } else if (!isValidEmail(contactInfo.senderEmail)) {
            toast.error('正しいメールアドレスを入力してください。');
        } else if (contactInfo.title === '') {
            toast.error('タイトルを入力してください。');
        } else if (contactInfo.subTitle === '') {
            toast.error('サブタイトルを入力してください。');
        } else if (contactInfo.content === '') {
            toast.error('内容を入力してください。');
        } else {
            try {
                await axios.post(process.env.REACT_APP_API_URL + '/sendContact', contactInfo);

                toast.success('お客様のリクエストが管理者に正常に送信されました。 少々お待ちください。');
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className='d-flex justify-content-between'>
            <div className='contact-container mx-auto'>
                <div className='w-100 d-flex flex-column'>
                    <h3 className='fw-bold'>お問い合わせ</h3>
                    <h6>内容を入力後・送信ボタンを押してください。</h6>
                    <input
                        type='text'
                        className='form-control w-100'
                        name="senderEmail"
                        value={contactInfo.senderEmail}
                        onChange={(e) => setContactInfo((prev) => ({
                            ...prev,
                            senderEmail: e.target.value
                        }))}
                        placeholder='送信者のメール' />
                    <input
                        type="text"
                        className='form-control w-100'
                        name="title"
                        value={contactInfo.title}
                        onChange={(e) => setContactInfo((prev) => ({
                            ...prev,
                            title: e.target.value
                        }))}
                        placeholder='タイトルを入力してください。'
                    />
                    <input
                        type='text'
                        className='form-control w-100'
                        name="subTitle"
                        value={contactInfo.subTitle}
                        onChange={(e) => setContactInfo((prev) => ({
                            ...prev,
                            subTitle: e.target.value
                        }))}
                        placeholder='サブタイトルを入力してください。'
                    />

                    <textarea
                        className='form-control w-100'
                        rows='5'
                        name="content"
                        value={contactInfo.content}
                        onChange={(e) => setContactInfo((prev) => ({
                            ...prev,
                            content: e.target.value
                        }))}
                        placeholder='内容をここに入力してください。' />

                    <div className="d-flex" style={{ textAlign: 'center' }}>
                        <button className='btn btn-primary w-100' onClick={send}>送&nbsp;&nbsp;&nbsp;信</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
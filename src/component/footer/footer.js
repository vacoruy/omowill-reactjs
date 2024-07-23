import { useNavigate } from 'react-router';
import logo from '../../assets/img/logo.webp';
import './footer.css';

function Footer() {
    const navigate = useNavigate()
    const gotoUrl = (url) => {
        navigate(url)
    }
    return (
        <div className='footer-container'>
            <div className='d-flex justify-content-between flex-column footer-logo-row order-2 order-md-1'>
                <div className='footer-logo-wrap'>
                    <img alt="footerImg" src={logo} />
                    <p className='en footer-copy-writer'>©OMOWILL All Rights Reserved</p>
                </div>
            </div>
            <div className='d-flex gap-3 footer-content order-1 order-md-2'>
                <div className='d-flex justify-content-between flex-column'>
                    <div>
                        <h6 style={{ cursor: "pointer" }} onClick={() => gotoUrl("/")}>▸ HOME</h6>
                        <h6 style={{ cursor: "pointer" }} onClick={() => gotoUrl("/faq")}>▸ FAQ</h6>
                    </div>
                </div>
                <div className='d-flex justify-content-between flex-column'>
                    <div>
                        <h6 style={{ cursor: "pointer" }} onClick={() => gotoUrl("/privacy")}>▸ プライバシーポリシー</h6>
                        <h6 style={{ cursor: "pointer" }} onClick={() => gotoUrl("/termsofservice")}>▸ ご利用規約</h6>
                    </div>
                </div>
                <div className='d-flex justify-content-between flex-column'>
                    <div>
                        <h6 style={{ cursor: "pointer" }} onClick={() => gotoUrl("/aboutus")}>▸ 会社概要</h6>
                        <h6 style={{ cursor: "pointer" }} onClick={() => gotoUrl("/contact")}>▸ お問い合わせ</h6>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;
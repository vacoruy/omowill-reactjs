import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import $ from 'jquery';
import logo from '../../assets/img/logo-pb.webp';

export default function Reqview() {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [addr, setAddr] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [rel, setRel] = useState("");

  const proposal = () => {
    if (name === '') {
      toast.error('氏名を入力してください。');
    } else if (birth === '') {
      toast.error('誕生日を入力してください。');
    } else if (addr === '') {
      toast.error('住所を入力してください。');
    } else if (mail === '') {
      toast.error('メールアドレスを入力してください。');
    } else if (phone === '') {
      toast.error('電話を入力してください。');
    } else if (rel === '') {
      toast.error('故人との関係を入力してください。');
    } else {
      const propo = {
        name: name,
        birth: birth,
        addr: addr,
        mail: mail,
        phone: phone,
        rel: rel
      }

      fetch(process.env.REACT_APP_API_URL + "/proposal", {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(propo)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        if (data !== 'failure') {
          toast.success('保存されました。');
          setName("");
          setBirth("");
          setAddr("");
          setMail("");
          setPhone("");
          setRel("");
          $("#name").val("");
          $("#birth").val("");
          $("#addr").val("");
          $("#mail").val("");
          $("#phone").val("");
          $("#rel").val("");
          toast.success(`あなたのリクエストは${data}で識別されました。
          申請が承認されるまでお待ちください。`, {autoClose: 20000});
        }
      }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
      // navigate('/reqviewdetail');
    }
  }

  return (
    <div className='login-container' style={{ height: 'auto' }}>
      <div className="container">
        <div className="row login-box" style={{ height: 'auto' }}>
          <div className="col-sm-12 col-md-12 col-lg-6 px-5 login-intro-box">
            <div className='d-flex justify-content-between flex-column'>
              <h2 className='fw-bold'>震災/津波/災害/戦争</h2>
              <p className='mb-0'>東日本大震災で・写真や手紙など</p>
              <p className='fw-bold mb-0'>本来・想いを残してきたツールは</p>
              <p className='fw-bold mb-0'>津波で跡形もなく消えてなくなる</p>
              <h1 className='fw-bold mt-4'><img src={logo} alt=''/></h1>
              <p className='fw-bold mb-0'>想いを「今」WEB上に残しておく</p>
            </div>
            <p className='mt-4'>マイページ入会/ご利用登録はこちら...</p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 login-form-box">
            <div className="card">
              <div className="card-body">
                <h2 className='text-center fw-bold mb-0'>動画・PDF登録確認申請</h2>
                <input type='text' className='form-control w-100' id='name' placeholder='氏名' onChange={(e) => setName(e.target.value)} />
                <input type="date" className='form-control w-100' id='birth' placeholder='生年月日' onChange={(e) => setBirth(e.target.value)} />
                <input type="text" className='form-control w-100' id='addr' placeholder='住所' onChange={(e) => setAddr(e.target.value)} />
                <input type="email" className='form-control w-100' id='mail' placeholder='メール' onChange={(e) => setMail(e.target.value)} />
                <input type="text" className='form-control w-100' id='phone' placeholder='電話' onChange={(e) => setPhone(e.target.value)} />
                <input type="text" className='form-control w-100' id='rel' placeholder='遺族との関係' onChange={(e) => setRel(e.target.value)} />
                <div className='w-100 text-center'>
                  <button type="button" className="btn btn-primary fw-bold" onClick={proposal}>応募</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
/**<div className={(content === false ? "col-sm-12 col-md-6 bg-primary text-center text-white h3" : "col-sm-12 col-md-6 text-center text-muted h3")} onClick={() => setContent(false)}>
          Will Content View
        </div> */
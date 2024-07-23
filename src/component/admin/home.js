import React from "react";
import './admin.css';
import UserHandle from "./userhandle";
import Notify from "./notify";
import AccountManagement from "./account";
import RequestFile from "./requestFile";

function AdminHome() {
    return (
        <div className="position-relative container-fluid admin-home">
            <ul className="nav nav-pills d-flex w-100">
                <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#user-control">ユーザー管理</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#notify">ニュース管理</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#read-pdf-request">閲覧申請</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#account-management">アカウント管理</a>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container-fluid active" id="user-control">
                    <UserHandle />
                </div>
                <div className="tab-pane container-fluid fade" id="notify">
                    <Notify />
                </div>
                <div className="tab-pane container-fluid fade" id="read-pdf-request">
                    <RequestFile />
                </div>
                <div className="tab-pane container-fluid fade" id="account-management">
                    <AccountManagement />
                </div>
            </div>
        </div>
    )
}

export default AdminHome;

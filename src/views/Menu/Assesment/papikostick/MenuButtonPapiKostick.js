import React from "react";
import { t } from 'react-switch-lang';
import { Link } from "react-router-dom";

export default function MenuButtonPapiKostick(params) {
    return (
        <Link to="/assessment/papikostick-tes">
            <div className="card menu-item">
                <div className="card-body">
                    <div className="menu-img mt-2 mb-3">
                        <img src={require("../../../../assets/img/asesmen/papikostick.png")} alt="" />
                    </div>
                    <div className="menu-title mb-2">
                        <p className="mb-0 title-menu-company">
                            <strong>{t('TesPapikostick')}</strong><br />
                            <small>{t('Test Papikostick desc')}</small>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
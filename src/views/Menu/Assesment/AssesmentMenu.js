import React from "react";
import { t, translate } from 'react-switch-lang';
// import { Link } from "react-router-dom";
import MenuButtonDISC from "./disc/MenuButtonDISC";
import MenuButtonPapiKostick from "./papikostick/MenuButtonPapiKostick";
import MenuButtonMBTI from "./mbti/MenuButtonMBTI";

function AssesmentMenu(props) {
    return <div className="animated fadeIn">
        <h4 className="content-title mb-4">{t('tesasesmenpsikologi')}</h4>
        <div className="row menu">
            <div className="col-md-3 col-6">
                <MenuButtonMBTI />
            </div>
            <div className="col-md-3 col-6">
                <MenuButtonPapiKostick />
            </div>
            <div className="col-md-3 col-6">
                <MenuButtonDISC />
            </div>
        </div>
    </div>
}

export default translate(AssesmentMenu)
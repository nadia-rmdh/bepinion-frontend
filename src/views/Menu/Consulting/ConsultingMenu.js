import React from "react";
import { translate, t } from 'react-switch-lang';

function RecruitmentFirst(props) {
    return (
        <div className="animated fadeIn">
        <h4 className="content-title mb-4">{t('daftarkonsultasi')}</h4>
        <div className="content-body">
            <div className="row">
                <div className="menu">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-lg-3">
                            {/* <Link to=""> */}
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <div className="menu-img mt-2 mb-3">
                                            <img src={require(`../../../assets/img/consulting/HR.png`)} alt="HR" />
                                        </div>
                                        <div className="menu-title mb-2">
                                            <p className="mb-0 title-menu-company">Human Resource</p>
                                            <i className="text-muted">Coming soon</i>
                                        </div>
                                    </div>
                                </div>
                            {/* </Link> */}
                        </div>
                        <div className="col-md-4 col-sm-6 col-lg-3">
                            {/* <Link to=""> */}
                            <div className="card menu-item">
                                <div className="card-container">
                                    <div className="card-body">
                                        <div className="menu-img mt-2 mb-3">
                                            <img src={require(`../../../assets/img/consulting/Legal.png`)} alt="Legal" />
                                        </div>
                                        <div className="menu-title mb-2">
                                            <p className="mb-0 title-menu-company">Legal</p>
                                            <i className="text-muted">Coming soon</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div className="col-md-4 col-sm-6 col-lg-3">
                            {/* <Link to=""> */}
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <div className="menu-img mt-2 mb-3">
                                            <img src={require(`../../../assets/img/consulting/Sales.png`)} alt="Sales" />
                                        </div>
                                        <div className="menu-title mb-2">
                                            <p className="mb-0 title-menu-company">Sales</p>
                                            <i className="text-muted">Coming soon</i>
                                        </div>
                                    </div>
                                </div>
                            {/* </Link> */}
                        </div>
                        <div className="col-md-4 col-sm-6 col-lg-3">
                            {/* <Link to=""> */}
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <div className="menu-img mt-2 mb-3">
                                            <img src={require(`../../../assets/img/consulting/Marketing.png`)} alt="Marketing" />
                                        </div>
                                        <div className="menu-title mb-2">
                                            <p className="mb-0 title-menu-company">Marketing</p>
                                            <i className="text-muted">Coming soon</i>
                                        </div>
                                    </div>
                                </div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default translate(RecruitmentFirst);

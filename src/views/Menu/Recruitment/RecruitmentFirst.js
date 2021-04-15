import React from "react";
import { Link } from "react-router-dom";
import { translate, t } from 'react-switch-lang';
import { useUserPrivileges } from "../../../store";

function RecruitmentFirst(props) {
    const { can } = useUserPrivileges();

    return (
        <div className="animated fadeIn">
            <h4 className="content-title mb-4">{t('informasiperusahaan')}</h4>
            <div className="content-body">
                <div className="row">
                    <div className="menu col-md-8">
                        <div className="row">
                            {can('canManagementJob') && <div className="col-12 col-sm-4 col-lg-4">
                                <Link to="/dashboard/vacancies">
                                    <div className="card menu-item">
                                        <div className="card-body">
                                            <div className="menu-img mt-2 mb-3">
                                                <img src={require(`../../../assets/img/job/jobpost.png`)} alt="Job Posting" />
                                            </div>
                                            <div className="menu-title mb-2">
                                                <p className="mb-0 title-menu-company">Job <br /> Posting</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>}
                            {can('canManagementJob') && <div className="col-12 col-sm-4 col-lg-4">
                                {/* <Link to={routes[0].path}> */}
                                <div className="card menu-item ribbons" data-label="Coming Soon">
                                    <div className="card-container">
                                        <div className="card-body">
                                            <div className="menu-img mt-2 mb-3">
                                                <img src={require(`../../../assets/img/job/talentsearch.png`)} alt="Talent Searching" />
                                            </div>
                                            <div className="menu-title mb-2">
                                                <p className="mb-0 title-menu-company">Talent <br /> Searching</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </Link> */}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default translate(RecruitmentFirst)

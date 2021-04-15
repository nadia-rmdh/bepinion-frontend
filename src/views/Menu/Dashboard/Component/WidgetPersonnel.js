import React from 'react';
import Loader from 'react-loader-spinner';

const WidgetPersonnel = (props) => {

    return (
        <div className="brand-card">
            <div className={`brand-card-header ${props.bg}`}>
                <i className={`fa ${props.icon}`}></i>
                {/* {"children"} */}
            </div>
            <div className="brand-card-body">
                <div>
                    <div className="text-value">
                        {props.loading ? <Loader type="ThreeDots" color="#305574" height={20} width={20}/> : props.value}
                    </div>
                    <div className="text-uppercase text-muted small">{props.title}</div>
                </div>
            </div>
        </div>
    );
}

export default WidgetPersonnel;

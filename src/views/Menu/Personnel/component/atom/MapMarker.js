import React from 'react';

const MapMarker = (props) => {
    return (
        <div className="d-flex" style={style.wrapper}>
            <img src={require('../../../../../assets/assets_ari/pin-map.png')} alt="" style={style.icon} />
            <h3 style={style.title}>{props.text}</h3>
        </div>
    );
}

const style = {
    wrapper: {
        width: '100%',
    },
    icon: {
        width: '24px',
        position: 'absolute',
        top: '-36px',
        left: '-11px',
    },
    title: {
        position: 'absolute',
        margin: '0',
        top: '-34px',
        left: '16px',
    }
};

export default MapMarker;
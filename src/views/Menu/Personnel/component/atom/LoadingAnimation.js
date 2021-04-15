import React from 'react';
import Loading from '../../../../../assets/assets_ari/loading.svg';

const LoadingAnimation = () => {
    return (
        <div className="loading">
            <img src={Loading} alt="loading" />
        </div>
    );
}

export default LoadingAnimation;
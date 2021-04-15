import React from 'react';
import Slide from 'react-reveal/Slide';

function TopButton(){
    return(
        <Slide bottom>
            <div className="floating-landing" onClick={() => window.scroll({top: 0, behavior: 'smooth' })}>
                <img
                    src={require('../../assets/img/landing-page/top-button.png')}
                    alt="Back to Top"
                    width="35"
                    />
            </div>
        </Slide>
    )
}

export default TopButton;
import React from 'react'; 

function Star({value, max=5}){
    const valCeil = Math.ceil(value);
    const valFloor = Math.floor(value);
    const stars = [];

    for(let i=0; i < max; i++){
        if (i < valFloor){
            stars.push(<i className="fa fa-star text-warning mr-1"></i>)
        }
        else if (i >= valFloor && i < valCeil){
            stars.push(<i className="fa fa-star-half-o text-warning mr-1"></i>)
        }
        else stars.push(<i className="fa fa-star-o text-warning mr-1"></i>)
    }

    return <span>{stars}</span>
}

export default Star;

import React, { useState, useEffect } from 'react';
import PersonnelProfileInfo from './Profile/PersonnelProfileInfo';
import PersonnelProfileContact from './Profile/PersonnelProfileContact';
import PersonnelProfileIdentity from './Profile/PersonnelProfileIdentity';
import PersonnelProfileAddress from './Profile/PersonnelProfileAddress';
import DataNotFound from '../../../components/DataNotFound';
import request from '../../../utils/request';

function PersonnelProfileNew({personnel}){

    const [country, setCountry] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        request.get('v1/location/countries')
            .then((res) =>{
                setCountry(res.data.data)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
    },[])

    if (notFound) {
        return <DataNotFound />
    }

    return(
        <div className="animated fadeIn">
            <div className="content-body my-2">
                <PersonnelProfileInfo info={personnel} />
            </div>
            <hr className="my-1" />
            <div className="content-body my-2">
                <PersonnelProfileContact contact={personnel} />
            </div>
            <hr className="my-1" />
            <div className="content-body my-2">
                <PersonnelProfileIdentity identity={personnel} country={country} />
            </div>
            <hr className="my-1" />
            <div className="content-body my-2">
                <PersonnelProfileAddress address={personnel} country={country} />
            </div>
        </div>
    )
}

export default PersonnelProfileNew;
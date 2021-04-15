import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ModalPrivilegeForbidden from "../../../../components/ModalPrivilegeForbidden";

function FloatingButtonJob({forbidden : data}){
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
    const [forbidden, setForbidden] = useState(false)
    
    return(
        <>
        {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementJob" isClose={() => setForbidden(false)} />}
        <div className={`floating-button ${isSmallSize ? `tour-createjob` : ``}`}>
            {data ?
                <div onClick={() => setForbidden(true)} className="plus-icon d-flex justify-content-center align-items-center">
                    <img
                        src={require("../../../../assets/img/job/createjob.png")}
                        alt="Buat Lowongan Baru"
                        />
                </div>
            :
                <Link to={"/dashboard/vacancies/create"}>
                    <div className="plus-icon d-flex justify-content-center align-items-center">
                        <img
                            src={require("../../../../assets/img/job/createjob.png")}
                            alt="Buat Lowongan Baru"
                            />
                    </div>
                </Link>
            }
        </div>
        </>
    )
}

export default FloatingButtonJob;
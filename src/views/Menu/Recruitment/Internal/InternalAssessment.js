import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DataNotFound from '../../../../components/DataNotFound';
import LoadingAnimation from '../../../../components/LoadingAnimation';
import ModalError from '../../../../components/ModalError';
import { useAuthUser } from '../../../../store';
import request from '../../../../utils/request';
import EmployeeList from './EmployeeList';
import disableScroll from 'disable-scroll';
import { getMe } from '../../../../actions/auth';
import Tour from 'reactour';
import { Button, Row } from 'reactstrap';

function InternalAssessment(){
    const [loading, setLoading] = useState(false);
    const [internal, setInternal] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [isTour, setIsTour] = useState(false);
    const user = useAuthUser();
    const disableBody = () => disableScroll.on();
    const enableBody = () => disableScroll.off();
    const accentColor = "#1d5a8e";
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.guidance.layout && user.guidance.header){
            window.scroll({top: 0, behavior: 'smooth' })
            if(!user.guidance.internalAssessmentBefore && (internal && !internal?.hasInternalAssessment)){
                setIsTour(true);
            }
        }
    }, [user, internal])

    const disableGuideBefore = () => {
        setIsTour(false);
        request.put('auth/guidance', {guidance: 'internalAssessmentBefore'})
            .then(() => {
                dispatch(getMe());
            })
    }

    useEffect(() => {
        setLoading(true)
        request.get('v1/recruitment/applicants/internal')
            .then((res) => {
                setInternal(res.data)
                setData(res.data.data)
            })
            .catch((err) => {
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const steps = [
        {
            selector: ".tour-internalBefore",
            content: ({ goTo, inDOM }) => (
                <div>
                    <h5
                        className="title-upgrade text-center"
                        style={{ color: "#93aad6" }}
                    >
                        Selamat datang di Halaman Internal Asesmen!
                    </h5>
                    <p>
                        Anda bisa mengirim permintaan kepada kami agar Anda dapat melakukan 
                        internal asesmen pada karyawan Anda dalam fitur asesment center pada aikrut.
                    </p>
                    <div className="col-12 text-center">
                        <Row>
                        <div className="col-12 text-center p-0">
                            <Button
                                className="mt-2"
                                type="submit"
                                color="netis-success"
                                onClick={() => {
                                    disableGuideBefore();
                                }}
                            >
                                Oke, Saya Paham
                            </Button>
                        </div>
                        </Row>
                    </div>
                </div>
            )
        }
    ]

    if (loading){
        return (
            <div style={{marginTop: '30vh'}}>
                <LoadingAnimation />
            </div>
        )
    }

    if (error){
        return <ModalError isOpen={true} />
    }

    return(
        <div>
            <Tour
                steps={steps}
                accentColor={accentColor}
                rounded={5}
                isOpen={isTour}
                closeWithMask={false}
                disableFocusLock={true}
                disableInteraction={true}
                disableDotsNavigation={true}
                showNumber={false}
                showNavigation={false}
                showButtons={false}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                onRequestClose={() => {
                    disableGuideBefore();
                }}
            />
            <h5>Daftar Karyawan</h5>
        {/* Kondisi awal ketika user belum membuat Internal Asesmen */}
            {internal && !internal?.hasInternalAssessment ?
                <div className="my-5 text-center no-asesmen">
                    {/* <DataNotFound /> */}
                    <div style={{marginTop:'10vh'}}>
                        <Link to={"/dashboard/internal/create"} className={`tour-internalBefore btn btn-sm button-netis-outline px-4 scale-div`} style={{ borderRadius: "8px" }}>
                            <i className="fa fa-plus mr-2"></i>
                            Buat Link Internal Assessment
                        </Link>
                    </div>
                </div>
                :
        // Kondisi ketika user telah membuat Internal Asesmen dan menunggu persetujuan Admin
                !internal?.published ?
                    <div className="text-center mx-auto" style={{width: '75%', marginTop: '20vh', marginBottom: '40vh'}}>
                        <h6 className="font-weight-bold">
                            Permintaan link Anda sedang diproses oleh Admin, silahkan tunggu Admin 
                            akan menghubungi Anda.
                        </h6>
                    </div>
                    :
        // Kondisi ketika link asesmen disetujui admin namun belum ada karyawan yang mengisi internal asesmen
                    data && data.length === 0 ?
                        <div className="my-5 text-center">
                            <div className="text-center mx-auto mb-3 bg-secondary rounded  pt-3 pb-2" style={{width: '75%', marginTop: '10vh'}}>
                                <h5>
                                    Belum ada Karyawan yang mengisi Internal Assessment
                                </h5>
                            </div>
                            <DataNotFound />
                        </div>
                        :
        // Kondisi ketika sudah ada karyawan yang mengsisi internal asesmen dan data ditampilkan
                        <EmployeeList data={data} />
            }

        </div>
    )
}

export default InternalAssessment;
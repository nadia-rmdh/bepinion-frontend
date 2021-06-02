import React, { useEffect, useState, useMemo } from 'react'
import { Card, CardBody, CardHeader, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Row, Spinner, Button, Input, ListGroup, ListGroupItem, Badge } from 'reactstrap'
import * as moment from 'moment'
import ReactMarkdown from "react-markdown";
import request from '../../../../utils/request';
import { useAuthUser } from '../../../../store';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useSolvingContext } from './SolvingContext';
import Select from 'react-select';
import { toast } from 'react-toastify';

function SolvingTeam() {
    const matchRoute = useRouteMatch();
    const history = useHistory()
    const authUser = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataUserListed, setDataUserListed] = useState([]);
    const [solving, setSolving] = useSolvingContext()
    const [submitLoad, setSubmitLoad] = useState(false)

    if (!solving.message) {
        history.push("/project/" + matchRoute.params.code + "/solving")
    }

    useEffect(() => {
        request.get('v1/projects/' + matchRoute.params.code).then(res => {
            setData(res.data.data);
        }).finally(() => setLoading(false))
    }, [matchRoute]);

    useEffect(() => {
        request.get('v1/projects/' + matchRoute.params.code + '/users').then(res => {
            const user = res.data.data.filter((u) => u.id !== authUser.id)
            setDataUserListed(user);
        }).finally(() => setLoading(false))

        request.get('v1/users/').then(res => {
            const user = res.data.data.filter((u) => u.id !== authUser.id)
            setDataUser(user);
        }).finally(() => setLoading(false))
    }, [authUser, matchRoute]);

    const handleChooseType = (type) => {
        setSolving(state => ({ ...state, type: type }))
    }

    const options = useMemo(() => {
        const opt = []
        dataUser.map((v) => {
            const dataOptions = dataUserListed.find(u => u.id === v.id);
            if (!dataOptions)
                opt.push({ value: v.id, label: v.detail.fullName })
        })

        return opt
    }, [dataUser, dataUserListed])

    const submitForm = (e) => {
        setSubmitLoad(true)
        request.post('v1/projects/' + matchRoute.params.code + '/solve', {
            message: solving.message,
            teamId: solving.teamId,
            type: solving.type,
            userId: solving.userId,
        })
            .then(() => {
                toast.success('Berhasil');
                history.push("/project/" + matchRoute.params.code)
            })
            .catch(err => {
                if (err.response?.status === 422) {
                    toast.error("Terjadi Kesalahan Pengisian, silahkan cek data yang anda isikan");
                    return;
                }
                else if (err.response?.status) {
                    toast.error("Terjadi Kesalahan Pengisian, silahkan cek data yang anda isikan");
                    return;
                }
                Promise.reject(err);
            })
            .finally(() => {
                setSubmitLoad(false);
            });
    }

    if (loading) {
        return (
            <div className="text-center" style={{ position: 'relative', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: "rgba(255,255,255, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spinner style={{ width: 48, height: 48 }} />
                </div>
            </div>
        )
    }

    return (
        <Card>
            <CardBody style={{ borderTop: '1px solid #c8ced3', width: '100vh', minHeight: '70vh' }} className="d-flex justify-content-center align-items-center">
                {!solving.type ?
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col sm="7">
                            <h3 className="mb-5">
                                Beritahu kami, kamu ingin membuat tim
                                atau bergabung dengan tim yang telah ada.
                            </h3>
                        </Col>
                        <Col sm="7">
                            <Button className="shadow-sm my-2" block color="netis-primary" style={{ height: 100 }} onClick={() => handleChooseType('new')}>
                                Buat Tim
                            </Button>
                        </Col>
                        <Col sm="7">
                            <Button className="shadow-sm my-2" block color="light" style={{ height: 100 }} onClick={() => handleChooseType('exist')}>
                                Gabung Team
                            </Button>
                        </Col>
                    </Row>
                    : (
                        solving.type == 'new' ?
                            <CreateTeam clearType={handleChooseType} options={options} onChangeMember={(e) => setSolving(state => ({ ...state, userId: e }))} solving={solving} onSubmit={submitForm} submitLoad={submitLoad} />
                            :
                            <ChooseTeam clearType={handleChooseType} dataProject={data} onChangeTeam={(e) => setSolving(state => ({ ...state, teamId: e }))} solving={solving} onSubmit={submitForm} submitLoad={submitLoad} />
                    )
                }
            </CardBody>
        </Card>
    )
}

const CreateTeam = ({ clearType, options, onChangeMember, solving, onSubmit, submitLoad }) => {
    const authUser = useAuthUser();

    const handleChangeMember = (e) => {
        const opt = [authUser.id]
        if (e) {
            e.map(v => {
                opt.push(v.value)
            })
        }
        onChangeMember(opt)
    }

    return (
        <Row className="d-flex justify-content-center align-items-center">
            <Col sm="7">
                <div className="mb-5">
                    <h3>
                        Buat Tim
                    </h3>
                    <p className="text-muted">
                        Tambahkanlah orang untuk menjadi anggota tim dalam proyek ini.
                    </p>
                </div>
            </Col>
            <Col sm="7">
                <ListGroup flush>
                    <ListGroupItem>
                        <Row>
                            <Col sm="9" className="p-0">
                                {authUser.detail.fullName}
                            </Col>
                            <Col sm="3" className="p-0 d-flex justify-content-center align-items-center">
                                <Badge color="warning" className="text-white">Ketua Proyek</Badge>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col sm="9" className="p-0">
                                <Select
                                    closeMenuOnSelect={false}
                                    options={options}
                                    isClearable
                                    isMulti
                                    onChange={(e) => handleChangeMember(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }} />
                            </Col>
                            <Col sm="3" className="p-0 d-flex justify-content-center align-items-center">
                                <Badge color="success" className="text-white">Anggota</Badge>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col sm="7" className="d-flex justify-content-center align-items-center mt-3">
                <Button color="white" onClick={() => clearType('')}>
                    Kembali
                </Button>
                <Button
                    type="submit"
                    color="netis-primary"
                    disabled={solving.userId.length < 3 ? true : submitLoad}
                    onClick={() => {
                        onSubmit(true)
                    }}
                >
                    {submitLoad ? <><Spinner color="light" size="sm" /> Loading...</> : 'Lanjutkan'}
                </Button>
            </Col>
        </Row>
    )
}

const ChooseTeam = ({ clearType, dataProject, onChangeTeam, solving, onSubmit, submitLoad }) => {
    const authUser = useAuthUser();

    const handleChangeTeam = (teamId) => {
        onChangeTeam(teamId)
    }
    console.log(dataProject)
    return (
        <Row className="d-flex justify-content-center align-items-center">
            <Col sm="7">
                <div className="mb-5">
                    <h3>
                        Gabung Tim
                    </h3>
                    <p className="text-muted">
                        Silahkan pilih dan bergabung dengan tim yang sudah ada.
                    </p>
                </div>
            </Col>
            <Col sm="7">
                <ListGroup flush className="join-team">
                    {
                        dataProject.teams.map(item => (
                            <ListGroupItem active={solving.teamId === item.id} tag="button" action onClick={() => handleChangeTeam(item.id)}>{item.leadName}</ListGroupItem>
                        ))
                    }
                </ListGroup>
            </Col>
            <Col sm="7" className="d-flex justify-content-center align-items-center mt-3">
                <Button color="white" onClick={() => clearType('')}>
                    Kembali
                </Button>
                <Button
                    type="submit"
                    color="netis-primary"
                    disabled={!solving.teamId ? true : submitLoad}
                    onClick={() => {
                        onSubmit(true)
                    }}
                >
                    {submitLoad ? <><Spinner color="light" size="sm" /> Loading...</> : 'Lanjutkan'}
                </Button>
            </Col>
        </Row>
    )
}

export default SolvingTeam
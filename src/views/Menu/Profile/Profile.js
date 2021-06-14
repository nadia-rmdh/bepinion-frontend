import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Collapse, Form, Input, Label, Row } from 'reactstrap'
import { useAuthUser } from '../../../store'
import { useMediaQuery } from 'react-responsive'
import request from '../../../utils/request';
import ModalError from '../../../components/ModalError';
import LoadingAnimation from '../../../components/LoadingAnimation';
import { Link } from 'react-router-dom';

function Profile(){
    const user = useAuthUser();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false);
    const [teamList, setTeamList] = useState(false);
    const [projectList, setProjectList] = useState(true);
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
    const myData = (data.length > 0 && data.filter(item => item.user.id === user.id)) ?? null

    useEffect(() => {
        setLoading(true)
        request.get('v1/projects')
            .then((res) => {
                setData(res.data.data)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const handleNumberOnly = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault()
        }
        return true;
    }
    const doEdit = () => {
        setEdit(true)
        setTeamList(false)
        setProjectList(false)
    }
    const seeProject = () => {
        setEdit(false)
        setTeamList(false)
        setProjectList(true)
    }
    const seeTeam = () => {
        setEdit(false)
        setTeamList(true)
        setProjectList(false)
    }

    if(loading){
        return <LoadingAnimation />
    }
    if(error){
        return <ModalError />
    }

    return(
        <Card className="border-0 shadow-sm" style={{borderRadius:'5px', position:'relative'}}>
            <div className="absolute-right">
                {!edit && 
                    <Button color="netis-color" className="px-2" onClick={doEdit}>
                        <i className="fa fa-pencil mr-2" />Edit
                    </Button>
                }
            </div>
            <div className="text-center py-4">
                <div style={{width:'200px', height:'200px'}} className="rounded-circle frame-profile-picture-empty mb-3 d-flex justify-content-center align-items-center">
                    <span className="my-auto mx-auto">Ini Foto Profil</span>
                </div>
                <h2>{user.detail.fullName}</h2>
                <div className="d-flex justify-content-around mx-auto mt-3 profile-list">
                    <div className="text-center">
                        <h5>9 Proyek</h5>
                    </div>
                    <div className="text-center">
                        <h5>4 Tim</h5>
                    </div>
                </div>
            </div>
            {!edit &&
                <div className="mx-auto text-center" style={{width:'80%'}}>
                    <hr />
                    <div className="d-flex justify-content-around mx-auto mt-3 profile-list">
                        <Button onClick={seeProject} style={{ border: 0 }} className="btn bg-transparent mr-1">
                            <i className="fa fa-square-o" /> Proyek
                        </Button>
                        <Button onClick={seeTeam} style={{ border: 0 }} className="btn bg-transparent ml-1">
                            <i className="fa fa-users" /> Tim
                        </Button>
                    </div>
                </div>
            }
            <CardBody>
                <Collapse isOpen={edit}>
                    <hr />
                    <Form>
                        <Row className="mt-2 input-form">
                            <Col sm="6" className="mb-3">
                                <Label htmlFor="fullName" className="input-label">Nama Lengkap</Label>
                                <Input
                                    className="form-control"
                                    type="input"
                                    value={user.detail.fullName}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    name="fullName"
                                    id="fullName"
                                    maxLength="255"
                                    placeholder="Nama Lengkap"
                                />
                            </Col>
                            <Col sm="6" className="mb-3">
                                <Label htmlFor="phoneNumber" className="input-label">No. HP</Label>
                                <Input
                                    onKeyPress={handleNumberOnly}
                                    value={user.detail.phoneNumber}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="No. HP*"
                                />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end ml-auto">
                            <Button className="mr-2" color="netis-secondary" onClick={seeProject}>Batal</Button>
                            <Button className="ml-2" color="netis-color">Submit</Button>
                        </div>
                    </Form>
                </Collapse>
                <Collapse isOpen={projectList}>
                    <Row>
                        {myData && myData.map((item, idx) => 
                            <Col xs="4" key={idx} className={`p-0 p-md-4 ${isSmallSize && `border`}`}>
                                <Link to={`/project/${item.code}`}>
                                    <div className={`frame-profile-picture-empty ${!isSmallSize && `scale-div-small`} box`}>
                                        <img src={item?.media[0]?.storage} alt="myProject" className="img img-responsive full-width" />
                                    </div>
                                </Link>
                            </Col>
                        )}
                    </Row>
                </Collapse>
                <Collapse isOpen={teamList}>
                    Ini list tim<br />
                    <Button onClick={seeProject}>Batal</Button>
                </Collapse>
            </CardBody>
        </Card>
    )
}

export default Profile
import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown';
import { Card, Row, Col, CardBody, CardHeader } from 'reactstrap';
import moment from '../../../../utils/moment';
import {t, translate} from "react-switch-lang";

function DiscResult({ result }){

    const resultType = result.type_description[0];
    const results = resultType[0];
    const [kekuatan, setKekuatan] = useState([])
    const [karakter, setKarakter] = useState([])
    const [perkembangan, setPerkembangan] = useState([])

    useEffect(() => {
        const arrKekuatan = results.kekuatan.split("\n")          
        if(arrKekuatan.length >= 10){
            const chunkLength = Math.max(arrKekuatan.length/2 ,1);
            let chunks = [];
            for (var i = 0; i < 2; i++) {
                if(chunkLength*(i+1)<=arrKekuatan.length)
                chunks.push(arrKekuatan.slice(chunkLength*i, chunkLength*(i+1)));
            }
        setKekuatan(chunks)        
        }
    }, [results.kekuatan]);

    useEffect(() => {
        const arrKarakter = results.karakteristik.split("\n")          
        if(arrKarakter.length >= 10){
            const chunkLength = Math.max(arrKarakter.length/2 ,1);
            let chunks = [];
            for (var i = 0; i < 2; i++) {
                if(chunkLength*(i+1)<=arrKarakter.length)
                chunks.push(arrKarakter.slice(chunkLength*i, chunkLength*(i+1)));
            }
        setKarakter(chunks)        
        }
    }, [results.karakteristik]);

    useEffect(() => {
        const arrPerkembangan = results.area_perkembangan.split("\n")          
        if(arrPerkembangan.length >= 10){
            const chunkLength = Math.max(arrPerkembangan.length/2 ,1);
            let chunks = [];
            for (var i = 0; i < 2; i++) {
                if(chunkLength*(i+1)<=arrPerkembangan.length)
                chunks.push(arrPerkembangan.slice(chunkLength*i, chunkLength*(i+1)));
            }
        setPerkembangan(chunks)        
        }
    }, [results.area_perkembangan]);

    return(
        <>
        <div className="row justify-content-center">
            <div className="col-sm-8 col-md-6">
                <div className="alert alert-success text-center">
                    <h5><b>Hasil Tes Kecenderungan Gaya Kerja</b></h5>
                    {result.expired_at && 
                        <div className="small text-muted">
                            {t('Anda dapat melakukan asesmen kembali setelah')}<br/>
                            <strong>{moment(result.expired_at).format('[Tanggal:] DD MMMM YYYY, [Pukul:] HH:mm')}</strong>
                        </div>
                    }
                </div>
            </div>
        </div>

        <div className="text-center">
                <img src={require("../../../../assets/img/disc/" + results.type + ".png")} alt="logo" style={{ height: 300 }} className="my-4" />
                <h2 className="mb-3 h4 title-menu-company text-uppercase">
                    <b><ReactMarkdown source={results.nama.split(' (')[0]} /></b>
                </h2>
                <Row className="justify-content-center">
                    <Col md="7">
                        <i className="blockquote" style={{ color: '#505a62' }}>&ldquo; {results.deskripsi} &rdquo;</i>
                    </Col>
                </Row>
                <Row>
                    <Col lg="7" md="7" sm="12" className="p-2 mx-auto">
                        <Card className="shadow border-0 mx-auto mt-4 mb-3" style={{borderRadius:"12px"}}>
                            <CardHeader style={{backgroundColor:"#305574", borderRadius:"12px 12px 0px 0px"}}>
                                <h4 style={{color:"#fff"}}>Karakteristik:</h4>
                            </CardHeader>
                            <CardBody className="text-left">
                            {results.karakteristik.split("\n").length > 10 ?
                                <>
                                <Row>
                                    <Col>
                                        <ul>                                        
                                            {karakter && karakter[0]?.map(karakterFirst =>{
                                                return <li>{karakterFirst.replace("-","")}</li>
                                            })}
                                        </ul>
                                    </Col>

                                    <Col>
                                        <ul>                                        
                                            {karakter && karakter[1]?.map(karakterSecond =>{
                                                return <li>{karakterSecond.replace("-","")}</li>
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                                </>
                                :
                                <ReactMarkdown source={results.karakteristik} />
                                }
                            </CardBody>        
                        </Card>
                    </Col>
                    <Col lg="7" md="7" sm="12" className="p-2 mx-auto">
                        <Card className="shadow border-0 mx-auto mt-4 mb-3" style={{borderRadius:"12px"}}>
                            <CardHeader style={{backgroundColor:"#305574", borderRadius:"12px 12px 0px 0px"}}>
                                <h4 style={{color:"#fff"}}>Kekuatan:</h4>
                            </CardHeader>
                            <CardBody className="text-left">
                                {results.kekuatan.split("\n").length > 10 ?
                                <>
                                <Row>
                                    <Col>
                                        <ul>                                        
                                            {kekuatan && kekuatan[0]?.map(kekuatanFirst =>{
                                                return <li>{kekuatanFirst.replace("-","")}</li>
                                            })}
                                        </ul>
                                    </Col>

                                    <Col>
                                        <ul>                                        
                                            {kekuatan && kekuatan[1]?.map(kekuatanSecond =>{
                                                return <li>{kekuatanSecond.replace("-","")}</li>
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                                </>
                                :
                                <ReactMarkdown source={results.kekuatan} />
                                }
                            </CardBody>        
                        </Card>
                    </Col>
                    <Col lg="7" md="7" sm="12" className="p-2 mx-auto">
                        <Card className="shadow border-0 mx-auto mt-4 mb-3" style={{borderRadius:"12px"}}>
                            <CardHeader style={{backgroundColor:"#305574", borderRadius:"12px 12px 0px 0px"}}>
                                <h4 style={{color:"#fff"}}>Area Perkembangan:</h4>
                            </CardHeader>
                            <CardBody className="text-left">
                            {results.area_perkembangan.split("\n").length > 10 ?
                                <>
                                <Row>
                                    <Col>
                                        <ul>                                        
                                            {perkembangan && perkembangan[0]?.map(perkembanganFirst =>{
                                                return <li>{perkembanganFirst.replace("-","")}</li>
                                            })}
                                        </ul>
                                    </Col>

                                    <Col>
                                        <ul>                                        
                                            {perkembangan && perkembangan[1]?.map(perkembanganSecond =>{
                                                return <li>{perkembanganSecond.replace("-","")}</li>
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                                </>
                                :
                                <ReactMarkdown source={results.area_perkembangan} />
                                }
                            </CardBody>        
                        </Card>
                    </Col>
                </Row>                
        </div>
        </>
    )
}

export default translate(DiscResult);

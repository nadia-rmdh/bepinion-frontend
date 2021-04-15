import React, { useMemo, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import { t, translate } from "react-switch-lang";

function shuffleArray(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function PersonnelFisiognomi({ result }) {
    const data = result?.answers?.data;
    const [modalFisiog, setModalFisiog] = useState(false);
    const toggleFisiog = () => setModalFisiog(!modalFisiog);

    const karakterList = useMemo(() => {
        const arrKarakter = Object.values(data.result);
        return shuffleArray(arrKarakter);
    }, [data.result]);

    return (
        <Card>
            <CardBody>
                <Row className="md-company-header mb-3 mt-2">
                    <Col>
                        <h5 className="text-uppercase content-sub-title mb-0">
                            {t("hasilfisiognomi")}
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" lg="6" className="mb-2">
                        <img
                            src={data?.processed ?? data?.raw}
                            width="100%"
                            alt="fisiognomi"
                        />
                    </Col>
                    <Col md="6" lg="6">
                        {data.result ? (
                            <>
                                <div className="mb-3">
                                    {t("Karakteristik")} : <br />
                                    <br />
                                    {karakterList.map((ciri) => (
                                        <ul>
                                            <li>{ciri}</li>
                                        </ul>
                                    ))}
                                </div>
                                <div className="d-flex flex-row-reverse">
                                    <Button
                                        className="btn btn-netis-color"
                                        onClick={toggleFisiog}
                                    >
                                        {t("lihatdetail")}
                                    </Button>
                                </div>
                            </>
                        ) : (
                                <div className="alert alert-dark">
                                    {t("Belum ada hasil fisiognomi yang tersedia")}
                                </div>
                            )}
                    </Col>
                </Row>
            </CardBody>

            <Modal isOpen={modalFisiog} toggle={toggleFisiog} className="modal-lg">
                <ModalHeader toggle={toggleFisiog}>{t("detailfisiognomi")}</ModalHeader>
                <ModalBody>
                    {t("Bentuk Wajah")} : <br />
                    <br />
                    {Object.keys(data?.result ?? {}).map((ciriWajah) => (
                        <ul>
                            <li>{ciriWajah}</li>
                        </ul>
                    ))}
                    {t("Karakteristik")} : <br />
                    <br />
                    {karakterList.map((ciriDetail) => (
                        <ul>
                            <li>{ciriDetail}</li>
                        </ul>
                    ))}
                </ModalBody>
            </Modal>
        </Card>
    );
};

export default translate(PersonnelFisiognomi);
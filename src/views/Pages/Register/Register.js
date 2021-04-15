import React from "react"
import { Container, Card, CardBody, CardGroup, Row, Col } from "reactstrap";
import { toast } from 'react-toastify';
// import Select from 'react-select';
import {
  translate,
} from 'react-switch-lang';
import RegisterComponent from "./RegisterComponent";

toast.configure()
function Register(props) {
  // useEffect(() => {
  //   request.get(`v1/master/company-types`)
  //     .then((res) => {
  //       setCompanyData(res.data.data)
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         toast.error('Load Data Error. Please Refresh !', { autoClose: 2000 });
  //       }
  //     })
  // }, []);

  // const companyOption = companyData?.map(option =>
  //   ({ value: option.id, label: option.name })
  // )

  // const changeCompanyType = function (value) {
  //   formik.setFieldValue('companyType', value)
  //   formik.setFieldTouched('companyType', true)
  // }

  return (
    <div className="app flex-row align-items-center background-login" style={{ height: 'auto', padding: 10 }}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={8} md={9}>
            <CardGroup style={{ height: 'auto' }}>
              <Card className="card-login-form" >
                <CardBody style={{ padding: 0 }}>
                  <RegisterComponent logo={true} login={true} register="Daftar" />
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default translate(Register);

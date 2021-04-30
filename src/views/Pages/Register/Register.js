import React from "react"
import { Card, CardBody, CardGroup, Row, Col } from "reactstrap";
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
    <div className="app align-items-center" style={{ height: 'auto', padding: 10, backgroundColor:"#F2F6FF" }}>
        <Row className="justify-content-center">
          <Col sm={8} md={9}>
            <div className="logo text-center">
                <img src={require("../../../assets/assets_ari/logo.png")} className="appolo-logo" alt="logo-appolo" />
            </div>
            <CardGroup style={{ height: 'auto' }}>
              <Card className="login-form-card" >
                <CardBody style={{ padding: 15 }}>
                  <RegisterComponent logo={true} login={true} register="Daftar" />
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
    </div>
  );
}

export default translate(Register);

import React, { Component } from 'react';
import { Table, Col, Row, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import axios from 'axios';
import ButtonSwitch from '../ButtonSwitch';
import { connect } from 'react-redux';
import {
    translate,
} from 'react-switch-lang';
class PengaturanDasarDokumen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            session: props.token,
            documents: [],
            checkedItems: new Map(),
            search: null
        };
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/document-types?all=true`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const documents = res.data.data;
                this.setState({ documents });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({
            search: keyword
        })
    }

    handleChange = (event) => {
        const item = event.target.name;
        const id = event.target.id;
        const isChecked = event.target.checked;
        if (event.target.checked === true) {
            axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/master/document-types/enable/' + id, null, { headers: { "Authorization": `Bearer ${this.state.session}` } })
                .then(res => {
                    this.setState(state => ({ checkedItems: state.checkedItems.set(item, isChecked) }));
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/master/document-types/disable/' + id, null, { headers: { "Authorization": `Bearer ${this.state.session}` } })
                .then(res => {
                    this.setState(state => ({ checkedItems: state.checkedItems.set(item, isChecked) }));

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    render() {
        let button;
        // eslint-disable-next-line
        const items = this.state.documents.filter((data) => {
            if (this.state.search === null)
                return data;
            else if (data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                return data;
            }
        }).map((data, idx) => {
            if (data.enabled === true) {
                button = <ButtonSwitch id={data.id} name={data.name} checked={this.state.checkedItems.set(data.enable)} onChange={this.handleChange} />;
            } else {
                button = <ButtonSwitch id={data.id} name={data.name} checked={this.state.checkedItems.get(data.name)} onChange={this.handleChange} />;
            }
            return (
                <tr key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td>{data.name}</td>
                    <td className="text-center">
                        {button}
                    </td>
                </tr>
            );
        });
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <Row className="justify-content-between align-items-center md-company-header mb-3">
                    <Col col="9" sm="9" md="9" xl >
                        <h5 className="content-sub-title mb-0">{t('daftar')} {t('tipedokumen')}</h5>
                    </Col>
                    <Col col="3" sm="3" md="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="input-group-transparent">
                                    <i className="fa fa-search"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="input1-group1" name="input1-group1" placeholder="Search" className="input-search" onChange={(e) => this.searchSpace(e)} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col col="12" sm="12" md="12" xl>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center w-10">No.</th>
                                    <th className="w-70">{t('nama')}</th>
                                    <th className="text-center w-20">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(translate(PengaturanDasarDokumen));

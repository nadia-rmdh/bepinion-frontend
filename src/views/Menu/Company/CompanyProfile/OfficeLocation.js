import React, { Component } from 'react';
import { Row, Button, Col, Table, Input, Label, FormGroup, Modal, ModalBody, Spinner } from 'reactstrap';
// import GoogleMapReact from 'google-map-react';
import { Map, Marker, GoogleApiWrapper, Circle } from 'google-maps-react'
import PlaceAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
    translate,t
} from 'react-switch-lang';
toast.configure()
class OfficeLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            session: props.token,
            loading: false,
            modalAddData: false,
            modalEditData: false,
            defaultCenter: {
                lat: -7.8011964,
                lng: 110.3722882
            },
            editCenter: {},
            zoom: 11,
            name: '',
            search: '',
            radius: 100,
            latLng: {},
            marker: {},
            officeLocation: [],
            idEditData: null,
            userPrivileges: this.props.user.privileges
        }
    }

    componentDidMount = () => {
        this.getDataFromAPI()
    }

    getDataFromAPI = () => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/company/office-location`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                const officeLocation = res.data.data;
                this.setState({ officeLocation })
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    mapClicked = (mapProps, map, coord) => {
        if (!this.state.userPrivileges.includes('edit-company-location')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const latLng = { ...this.state.latLng, lat: coord.latLng.lat(), lng: coord.latLng.lng() }
        const marker = { ...this.state.marker, latitude: coord.latLng.lat(), longitude: coord.latLng.lng() }
        this.setState({ latLng, marker })
    }

    // handleMapClick = ({ x, y, lat, lng, event }) => {
    //     const latLng = { ...this.state.marker, latitude: lat, longitude: lng }
    //     this.setState({
    //         latitude: lat,
    //         longitude: lng,
    //         marker: latLng
    //     })
    // }

    handleRadius = (e) => {
        if (Number(e.target.value) <= 2000) {
            this.setState({ radius: Number(e.target.value) })
            const marker = { ...this.state.marker, radius: e.target.value }
            this.setState({ marker })
        }
    }

    onChangeName = (e) => {
        const marker = { ...this.state.marker, name: e.target.value }
        this.setState({
            marker
        })
    }

    handleChange = (e) => {
        // const marker = { ...this.state.marker, name: e }
        this.setState({
            search: e,
            // marker
        })
    }

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                const marker = { ...this.state.marker, latitude: latLng.lat, longitude: latLng.lng }
                this.setState({
                    latLng,
                    editCenter: latLng,
                    marker
                })
            })
            .catch(error => console.error('Error', error));
    }

    modalAddData = () => {
        if (!this.state.userPrivileges.includes('add-company-location')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const marker = { ...this.state.marker, radius: this.state.radius }
        this.setState({
            modalAddData: !this.state.modalAddData,
            zoom: 13,
            search: '',
            latLng: {},
            marker
        })
    }

    modalEditData = (data) => {
        if (!this.state.userPrivileges.includes('edit-company-location')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const center = { ...this.state.center, lat: Number(data.latitude), lng: Number(data.longitude) }
        this.setState({
            modalEditData: !this.state.modalEditData,
            idEditData: data.id,
            name: data.name,
            zoom: 17,
            editCenter: center,
            latLng: center,
            radius: Number(data.radius),
            marker: {
                name: data.name,
                latitude: data.latitude,
                longitude: data.longitude,
                radius: data.radius
            },
            search: ''
        })
    }

    cancelModalEditData = () => {
        this.setState({
            modalEditData: !this.state.modalEditData,
            // idEditData: data.id,
            // name: data.name,
            // zoom: 17,
            // editCenter: center,
            latLng: {},
            radius: 100,
            marker: {},
            search: ''
        })
    }

    addDataToAPI = () => {
        if (!this.state.userPrivileges.includes('add-company-location')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/company/office-location', this.state.marker, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newPost = res.data.data;
                let newData = [...this.state.officeLocation, newPost];
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        officeLocation: newData,
                        marker: {}
                    }, () => { this.setState({ modalAddData: !this.state.modalAddData }) })
                    toast.success(t('Berhasil Menambahkan Lokasi Kerja'), { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                toast.error(t('Gagal Menambahkan Lokasi Kerja'), { autoClose: 3000 })
                console.log(error.response.data.errors)
            });
    }

    editData = (id) => {
        if (!this.state.userPrivileges.includes('edit-company-location')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/company/office-location/' + id, this.state.marker, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newData = [...this.state.officeLocation];
                const item = newData.find(item => item.id === id);
                item.name = this.state.marker.name;
                item.latitude = this.state.marker.latitude;
                item.longitude = this.state.marker.longitude;
                item.radius = this.state.marker.radius;
                const itemIndex = newData.findIndex(item => item.id === id);
                newData.splice(itemIndex, 1);
                newData.splice(itemIndex, 0, item);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        officeLocation: newData,
                        marker: {}
                    }, () => { this.setState({ modalEditData: !this.state.modalEditData }) })
                    toast.success(t('Berhasil Mengubah Lokasi Kerja'), { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                toast.error(t('Gagal Mengubah Lokasi Kerja'), { autoClose: 3000 })
                console.log(error.response)
            });
    }

    deleteData = (id) => {
        if (!this.state.userPrivileges.includes('delete-company-location')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        Axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/company/office-location/' + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newData = [...this.state.officeLocation];
                const itemIndex = newData.findIndex(item => item.id === id);
                newData.splice(itemIndex, 1);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        officeLocation: newData,
                        marker: {}
                    }, () => { this.setState({ modalEditData: !this.state.modalEditData }) })
                    toast.success(t('Berhasil Menghapus Lokasi Kerja'), { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                toast.error(t('Berhasil Menghapus Lokasi Kerja'), { autoClose: 3000 })
                console.log(error.response)
            });
    }

    render() {
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <Row className="md-company-header mb-3">
                    <Col className="d-flex justify-content-end align-items-center">
                        <Button color="netis-color" className={`${this.state.userPrivileges.includes('add-company-location') ? '' : ' d-none'}`} onClick={this.modalAddData}>
                            <i className="fa fa-plus mr-2"></i>{t('tambah')} Data
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="12">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center w-10">No.</th>
                                    <th className="w-30">{t('nama')}</th>
                                    <th className="text-center">Latitude</th>
                                    <th className="text-center">Longitude</th>
                                    <th className="text-center w-20">{t('aksi')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.officeLocation.map((data, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td className="text-center">{idx + 1}</td>
                                            <td>{data.name}</td>
                                            <td className="text-center">{data.latitude}</td>
                                            <td className="text-center">{data.longitude}</td>
                                            <td className="text-center">
                                                <Button className={`${this.state.userPrivileges.includes('edit-company-location') ? '' : ' d-none'}`} color="primary" onClick={() => this.modalEditData(data)}>
                                                    <i className="fa fa-pencil mr-2"></i>&nbsp;Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Modal Box Add Data */}
                <Modal isOpen={this.state.modalAddData} toggle={this.modalAddData} className={this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">{t('tambah')} {t('lokasikerja')}</h5>
                        <Row className="">
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="name" className="input-label">{t('namalokasi')}</Label>
                                    <Input type="text" name="name" id="name" placeholder={t('namalokasi')} className='location-search-input'
                                        onChange={this.onChangeName}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row className="mb-2">
                            <div className="col-12">
                                <div style={{ height: '350px', width: '100%' }}>
                                    <Map
                                        google={this.props.google}
                                        containerStyle={{ width: '100%', height: '100%', position: 'relative' }}
                                        mapTypeControl={false}
                                        initialCenter={this.state.defaultCenter}
                                        center={this.state.editCenter}
                                        zoom={this.state.zoom}
                                        onClick={this.mapClicked}
                                    >
                                        <PlaceAutoComplete
                                            value={this.state.search}
                                            onChange={this.handleChange}
                                            onSelect={this.handleSelect}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <>
                                                    <Input type="text" name="search-location" id="search-location"
                                                        {...getInputProps({
                                                            placeholder: t('carilokasi'),
                                                            className: 'search-location',
                                                        })} />
                                                    <div className="autocomplete-dropdown-container">
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className
                                                                    })}
                                                                >
                                                                    <i className="fa fa-map-marker mr-2"></i>
                                                                    <span className="suggestion-description">{suggestion.description}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            )}
                                        </PlaceAutoComplete>

                                        <Marker
                                            title={this.state.name}
                                            name={this.state.name}
                                            position={this.state.latLng} />

                                        <Circle
                                            radius={this.state.radius}
                                            center={this.state.latLng}
                                            strokeColor='transparent'
                                            strokeOpacity={0}
                                            strokeWeight={5}
                                            fillColor='#FF0000'
                                            fillOpacity={0.2}
                                        />

                                    </Map>
                                </div>
                            </div>
                        </Row>
                        <Row className="">
                            <div className="col-9 slider-wrapper">
                                <FormGroup>
                                    <Label htmlFor="radius" className="input-label">{t('radiuslokasi')} (Meter)</Label>
                                    <Input type="range" name="name" id="name" min="0" max="2000"
                                        value={this.state.radius}
                                        onChange={this.handleRadius} />
                                </FormGroup>
                            </div>
                            <div className="col-3">
                                <FormGroup>
                                    <Input type="text" id="radius-number" name="radius-number" className="text-center radius-number"
                                        value={this.state.radius}
                                        onChange={this.handleRadius} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                <Button className="mr-2" color="white" onClick={this.modalAddData}>{t('batal')}</Button>
                                <Button type="submit" color="netis-color" style={{ width: '70px' }} onClick={this.addDataToAPI}>
                                    {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                </Button>
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>

                {/* Modal Box Edit Data */}
                <Modal isOpen={this.state.modalEditData} toggle={this.cancelModalEditData} className={this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Edit {t('lokasikerja')}</h5>
                        <Row className="">
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="name" className="input-label">{t('namalokasi')}</Label>
                                    <Input type="text" name="name" id="name" placeholder={t('namalokasi')} className='location-search-input'
                                        value={this.state.marker.name}
                                        onChange={this.onChangeName}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row className="mb-2">
                            <div className="col-12">
                                <div style={{ height: '350px', width: '100%' }}>
                                    <Map
                                        google={this.props.google}
                                        containerStyle={{ width: '100%', height: '100%', position: 'relative' }}
                                        mapTypeControl={false}
                                        initialCenter={this.state.editCenter}
                                        center={this.state.editCenter}
                                        zoom={this.state.zoom}
                                        onClick={this.mapClicked}
                                    >
                                        <PlaceAutoComplete
                                            value={this.state.search}
                                            onChange={this.handleChange}
                                            onSelect={this.handleSelect}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <>
                                                    <Input type="text" name="search-location" id="search-location"
                                                        {...getInputProps({
                                                            placeholder: t('carilokasi'),
                                                            className: 'search-location',
                                                        })} />
                                                    <div className="autocomplete-dropdown-container">
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className
                                                                    })}
                                                                >
                                                                    <i className="fa fa-map-marker mr-2"></i>
                                                                    <span className="suggestion-description">{suggestion.description}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            )}
                                        </PlaceAutoComplete>

                                        <Marker
                                            title={this.state.name}
                                            name={this.state.name}
                                            position={this.state.latLng} />

                                        <Circle
                                            radius={this.state.radius}
                                            center={this.state.latLng}
                                            strokeColor='transparent'
                                            strokeOpacity={0}
                                            strokeWeight={5}
                                            fillColor='#FF0000'
                                            fillOpacity={0.2}
                                        />

                                    </Map>
                                </div>
                            </div>
                        </Row>
                        <Row className="">
                            <div className="col-9 slider-wrapper">
                                <FormGroup>
                                    <Label htmlFor="radius" className="input-label">{t('radiuslokasi')} (Meter)</Label>
                                    <Input type="range" name="name" id="name" min="0" max="2000"
                                        value={this.state.radius}
                                        onChange={this.handleRadius} />
                                </FormGroup>
                            </div>
                            <div className="col-3">
                                <FormGroup>
                                    <Input type="text" id="radius-number" name="radius-number" className="text-center radius-number"
                                        value={this.state.radius}
                                        onChange={this.handleRadius} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-between">
                                <div>
                                    <Button className={`${this.state.userPrivileges.includes('delete-company-location') ? '' : ' d-none'}`} color="red-custom" onClick={() => this.deleteData(this.state.idEditData)}>{t('hapus')} Data</Button>
                                </div>
                                <div>
                                    <Button className="mr-2" color="white" onClick={this.modalEditData}>{t('batal')} </Button>
                                    <Button className={`${this.state.userPrivileges.includes('edit-company-location') ? '' : ' d-none'}`} color="netis-color" style={{ width: '70px' }} onClick={() => this.editData(this.state.idEditData)}>
                                        {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = ({ isAdminPanel, user, token }) => ({ isAdminPanel, user, token });

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDQsNCd2Trmf4MLwcB7k1oqpWZPpTeCkc0',
    libraries: ["places"]
})(translate(OfficeLocation)));

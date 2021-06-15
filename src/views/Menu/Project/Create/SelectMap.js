import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Button, Spinner, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useProjectContext } from '../ProjectContext';
import foto from '../../../../assets/img/projects_dummy/1.jpeg'
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import PlaceAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
    translate, t
} from 'react-switch-lang';
import Geocode from "react-geocode";

Geocode.setLanguage("id");
Geocode.setRegion("id");
Geocode.setApiKey("AIzaSyDQsNCd2Trmf4MLwcB7k1oqpWZPpTeCkc0");

function SelectMap({ google, isOpen, toggle, location, loadingLocation, setLoadingLocation }) {
    // const history = useHistory()
    // const [loadingMap, setLoadingMap] = useState(loadingLocation);
    const [centerMap, setCenterMap] = useState({ lat: -6.2088, lng: 106.8456 });
    const [latLong, setLatLong] = useState({});
    const [marker, setMarker] = useState({});
    const [markerActive, setMarkerActive] = useState({});
    const [search, setSearch] = useState('');
    const [selectedPlace, setSelectedPlace] = useState({});
    const toggleModal = () => toggle(!isOpen);

    useEffect(() => {
        currentLocation()
    }, [currentLocation])

    const currentLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCenterMap({ lat: position.coords.latitude, lng: position.coords.longitude })
            setLatLong({ lat: position.coords.latitude, lng: position.coords.longitude })
            geoCode(position.coords.latitude, position.coords.longitude)
        },
            () => setLoadingLocation(false));
    }, [geoCode])

    const handleSelect = (address) => {
        setSearch(address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setCenterMap(latLng)
                setLatLong(latLng)
                setMarker({ ...marker, latitude: latLng.lat, longitude: latLng.lng })
            })
            .catch(error => console.error('Error', error));
    }

    const geoCode = useCallback((lat, long) => {
        // setLoadingMap(true);
        setLoadingLocation(true);
        // console.log(Geocode.setLanguage("en"))
        Geocode.fromLatLng(lat, long).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let city, state, country;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "administrative_area_level_2":
                                city = response.results[0].address_components[i].long_name;
                                break;
                            case "administrative_area_level_1":
                                state = response.results[0].address_components[i].long_name;
                                break;
                            case "country":
                                country = response.results[0].address_components[i].long_name;
                                break;
                            default:
                                break;
                        }
                    }
                }
                setSearch(address)
                location({ address, city, province: state, latitude: lat, longitude: long })
                // setLoadingMap(false)
                setLoadingLocation(false);
            },
            (error) => {
                setLoadingLocation(false);
                console.error(error);
            }
        );
    }, [location, setLoadingLocation])

    const mapClicked = (mapProps, map, coord) => {
        geoCode(coord.latLng.lat(), coord.latLng.lng())
        setLatLong({ ...latLong, lat: coord.latLng.lat(), lng: coord.latLng.lng() })
        setMarker({ ...marker, latitude: coord.latLng.lat(), longitude: coord.latLng.lng() })
        // setShowingInfoWindow(false)
    }

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props)
        // setShowingInfoWindow(true)
        setMarkerActive(marker)
    }

    const moveMarker = (mapProps, map) => {
        geoCode(map.position.lat(), map.position.lng())
        setLatLong({ ...latLong, lat: map.position.lat(), lng: map.position.lng() })
        setMarker({ ...marker, latitude: map.position.lat(), longitude: map.position.lng() })
    }

    const resetLocation = () => {
        // setLoadingMap(true);
        currentLocation()
    }

    return (
        <Modal isOpen={isOpen} toggle={toggleModal} className={`shadow bottom`}>
            <ModalHeader toggle={toggleModal} className="border-bottom-0">
                Pilih lokasi anda
            </ModalHeader>
            <ModalBody>
                <div className="mt-3" style={{ height: '100%', width: '100%', position: 'relative' }}>
                    {loadingLocation &&
                        <div className="text-center" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
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
                    }
                    <Map
                        google={google}
                        containerStyle={{ width: '100%', height: '100%', position: 'absolute' }}
                        mapTypeControl={false}
                        initialCenter={centerMap}
                        center={centerMap}
                        zoom={14}
                        onClick={mapClicked}
                        disableDefaultUI
                    >
                        <PlaceAutoComplete
                            value={search}
                            onChange={(e) => setSearch(e)}
                            onSelect={handleSelect}
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

                        {latLong &&
                            <Marker
                                title={search}
                                name={search}
                                position={latLong}
                                onClick={onMarkerClick}
                                draggable={true}
                                onDragend={moveMarker}
                            />
                        }

                        <InfoWindow
                            marker={markerActive}
                            visible
                        >
                            <div>
                                <p>{selectedPlace.name}</p>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => resetLocation()}>Reset</Button>
                <Button onClick={toggleModal}>Selesai</Button>
            </ModalFooter>
        </Modal>
    )
}
const LoadingContainer = (props) => (
    <div></div>
)
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDQsNCd2Trmf4MLwcB7k1oqpWZPpTeCkc0',
    libraries: ["places"],
    LoadingContainer: LoadingContainer
})(translate(SelectMap));
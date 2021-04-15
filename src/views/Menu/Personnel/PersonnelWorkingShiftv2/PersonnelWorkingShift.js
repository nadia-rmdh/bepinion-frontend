import React, { memo, useMemo } from "react";
import { useEffect, useState } from "react";
import { Table, Button, Spinner, Label, Modal, ModalBody, FormGroup, Row, Col, Tooltip, Input } from "reactstrap";
import Select from 'react-select';
import request from "../../../../utils/request";
import { t } from "react-switch-lang";
import { toast } from "react-toastify";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import { useUserPrivileges } from "../../../../store";
import { useCallback } from "react";
import "../PersonnelWorkingShiftv2/custom.css";
// import "./master/custom.scss";

function PersonnelWorkingShift() {
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterUnit, setFilterUnit] = useState(null);
    const [unit, setUnit] = useState([]);
    const [shift, setShift] = useState([]);
    const [location, setLocation] = useState([]);
    const [employeeShift, setEmployeeShift] = useState([]);
    const { can } = useUserPrivileges();

    const shiftButton = !can('write-employee-workingShift')

    useEffect(() => {
        const employeeRequest = request.get('v1/personnels/all/aktif')
        const unitRequest = request.get('v1/master/units')
        const shiftRequest = request.get('v2/master/working-shifts')
        const locationRequest = request.get('v1/company/office-location')
        const employeeShiftRequest = request.get('v2/working-shifts-v2')
        Promise.all([employeeRequest, unitRequest, shiftRequest, locationRequest, employeeShiftRequest])
            .then(([empResp, unitRes, shiftRes, locRes, empShiftRes]) => {
                if (empResp.data) {
                    setEmployee(() => empResp.data.data)
                }
                if (unitRes.data) {
                    setUnit(() => unitRes.data.data)
                }
                if (shiftRes.data) {
                    setShift(() => shiftRes.data.data)
                }
                if (locRes.data) {
                    setLocation(() => locRes.data.data)
                }
                if (empShiftRes.data) {
                    setEmployeeShift(() => empShiftRes.data.data);
                }
            })
            .finally(() => setLoading(false))
    }, [])

    const days = [
        { value: 1, label: t('senin') },
        { value: 2, label: t('selasa') },
        { value: 3, label: t('rabu') },
        { value: 4, label: t('kamis') },
        { value: 5, label: t('jumat') },
        { value: 6, label: t('sabtu') },
        { value: 0, label: t('minggu') }
    ];

    const unitOptions = useMemo(() => unit.map(s =>
        ({ value: parseInt(s.id), label: s.name })
    ), [unit]);

    const workshift = useMemo(() => shift.map(s =>
        ({ value: parseInt(s.id), label: s.shiftName })
    ), [shift]);

    const locCompany = useMemo(() => location.map(l =>
        ({ value: l.id, label: l.name })
    ), [location])

    const filterByNamaKaryawan = (keyword) => {
        setFilterName(keyword)
    }

    const filterByUnit = (keyword) => {
        setFilterUnit(keyword)
    }

    const filteredEmployee = useMemo(() => {
        let employeeFilter = employee
        if (filterUnit) {
            employeeFilter = employeeFilter.filter(item => item.unit?.id === filterUnit.value)
        }
        if (filterName) {
            employeeFilter = employeeFilter.filter(item => item.fullName?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0);
        }
        return employeeFilter
    }, [employee, filterUnit, filterName])

    const onShiftChanged = useCallback((changes) => {
        setEmployeeShift(employeeShift => {
            const newItem = {
                personnelId: changes.personnelId,
                shiftId: changes.shiftId,
                day: changes.day,
                locationId: changes.locationId
            }

            return [...employeeShift.filter(we => !(we.personnelId === changes.personnelId && we.day === changes.day)), newItem]
        })
    }, [])

    const onShiftDeleted = useCallback((deleted) => {
        setEmployeeShift(employeeShift => {
            const newItem = {
                personnelId: deleted.personnelId,
                shiftId: deleted.shiftId,
                day: deleted.day,
                locationId: deleted.locationId
            }

            return [...employeeShift.filter(we => !(we.personnelId === deleted.personnelId && we.day === deleted.day)), newItem]
        })
    }, [])

    const updateList = (values) => {
        setEmployeeShift(employeeShift => {

            const newItems = []
            values.forEach(v => {
                newItems.push({
                    personnelId: v.personnelId,
                    shiftId: v.shiftId,
                    day: v.day,
                    locationId: v.locationId
                })
            });

            return [...employeeShift.filter(we => !(newItems.find(n => n.personnelId === we.personnelId && we.day === n.day))), ...newItems]
        })
    }

    if (loading) {
        return <LoadingAnimation />;
    }
    console.log(employeeShift)
    return (
        <div className="animated fadeIn">
            <Row className="mb-2">
                <Col sm="4">
                    <Label htmlFor="nama-karyawan" className="input-label">Nama Karyawan</Label>
                    <Input type="text" id="nama-karyawan" onKeyUp={(e) => filterByNamaKaryawan(e.target.value)} placeholder="Cari Nama..." />
                </Col>
                <Col sm="4">
                    <Label htmlFor="unit-karyawan" className="input-label">Unit Karyawan</Label>
                    <Select
                        id="unit-karyawan"
                        options={unitOptions}
                        onChange={(e) => filterByUnit(e)}
                        isClearable
                        placeholder="Cari Unit..."
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                </Col>
            </Row>
            <Table size="sm" className="table-responsive">
                <thead className="text-center">
                    <tr>
                        <th className="column-header" rowSpan="2">Nama</th>
                        <th className="column-header" colSpan="7">Hari</th>
                    </tr>
                    <tr>
                        {days.map((day) => (
                            <th key={day.value} style={{ width: "13%" }}>{day.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredEmployee.length > 0 && filteredEmployee.map((emp) => (
                            <tr key={emp.id}>
                                <td title={emp.fullName}>
                                    {emp.fullName}<br /><br />
                                    {can("write-employee-workingShift") && (
                                        <ModalShiftByPersonnel
                                            days={days}
                                            optionsShift={workshift}
                                            optionsLocation={locCompany}
                                            onChanged={updateList}
                                            personnelId={emp.id}
                                            personnelName={emp.fullName}
                                        />
                                    )}
                                </td>
                                {days.map((day) => (
                                    <td key={emp.id + day.value} className="text-center">
                                        {(() => {
                                            const selectedShiftId = employeeShift.find(we => we.personnelId === emp.id && day.value === we.day)?.shiftId;
                                            const valueShift = workshift.find(w => w.value === selectedShiftId);
                                            const selectedLocationId = employeeShift.find(we => we.personnelId === emp.id && day.value === we.day)?.locationId;
                                            const valueLocation = locCompany.find(w => w.value === selectedLocationId);
                                            const newData = employeeShift.find(we => we.personnelId === emp.id && day.value === we.day)?.isNew;

                                            return (
                                                <ShiftSelectModal
                                                    optionsShift={workshift}
                                                    valueShift={valueShift}
                                                    optionsLocation={locCompany}
                                                    valueLocation={valueLocation}
                                                    onChanged={onShiftChanged}
                                                    personnelId={emp.id}
                                                    personnelName={emp.fullName}
                                                    day={day}
                                                    isNew={newData}
                                                    onDeleted={onShiftDeleted}
                                                    disabled={shiftButton}
                                                />
                                            )
                                        })()}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

const ShiftSelectModal = memo(({ optionsShift, valueShift, optionsLocation, valueLocation, onChanged, personnelId, personnelName, day, isNew, onDeleted, disabled }) => {
    const [modal, setModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [shift, setShift] = useState(valueShift)
    const [location, setLocation] = useState(valueLocation)
    const [tooltipOpen, setTooltipOpen] = useState(false);

    function showModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const changeLocation = function (pilihan) {
        setLocation(pilihan)
    };

    const changeShift = (pilihan) => {
        setShift(pilihan)
    }

    const onDelete = () => {
        setModalLoading(true)
        const _workingEmployee = {
            personnelId: personnelId,
            shiftId: null,
            day: day.value,
            locationId: null
        }
        request.post('v2/working-shifts-v2', {
            workingEmployee: [_workingEmployee]
        })
            .then(res => {
                toast.success(t('Berhasil Menghapus Jadwal Kerja'));
                onChanged(_workingEmployee)
            })
            .catch(err => {
                setModalLoading(false)
                if (err.response?.status === 422) {
                    toast.error(t('Gagal menghapus Jadwal Kerja'));
                }
            })
            .finally(() => {
                setModalLoading(false)
            });
    }

    const onSubmit = () => {
        closeModal()
        setModalLoading(true)
        const _workingEmployee = {
            personnelId: personnelId,
            shiftId: shift?.value ?? null,
            day: day.value,
            locationId: location?.value ?? null
        }
        request.post('v2/working-shifts-v2', {
            workingEmployee: [_workingEmployee]
        })
            .then(res => {
                toast.success(t('Berhasil Mengatur Jadwal Kerja'));
                onChanged(_workingEmployee)
            })
            .catch(err => {
                setModalLoading(false)
                if (err.response?.status === 422) {
                    toast.error(t('Gagal Mengatur Jadwal Kerja'));
                }
            })
            .finally(() => {
                setModalLoading(false)
            });
    }

    return (
        <>
            <Button
                type="button"
                color='light'
                className={`d-inline mr-1 border`}
                style={{
                    width: 150,
                    height: 150,
                    zIndex: -1
                }}
                disabled={modalLoading || disabled}
            >
                {modalLoading ? (
                    <React.Fragment>
                        <Spinner size="lg" color="netis-secondary" />
                    </React.Fragment>
                ) : (
                        valueLocation && valueShift
                            ?
                            <>
                                <div style={{ position: "relative", zIndex: 0 }}>
                                    <i
                                        onClick={() => onDelete()}
                                        className="fa fa-times text-danger float-right"
                                        style={{ position: "absolute", top: 0, right: 0, zIndex: 5 }}
                                    >
                                    </i>
                                    <br />
                                    <div style={{ marginBottom: 20 }}
                                        id={"Tooltip-" + personnelId + day.value}
                                        onClick={() => showModal()}>
                                        <small>Lokasi</small><br />
                                        <b>{valueLocation?.label ?? '-'}</b> <br />
                                        <small>Jadwal</small><br />
                                        <b>{valueShift?.label ?? '-'}</b> <br />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="d-flex justify-content-center align-items-center" style={{ position: "relative", width: '100%', height: '100%', verticalAlign: "middle" }}
                                    onClick={() => showModal()}>
                                    <small className="text-muted"
                                        id={"Tooltip-" + personnelId + day.value}
                                    >Belum diatur</small>
                                </div>
                            </>
                    )
                }
            </Button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-" + personnelId + day.value}
                toggle={toggleTooltip}
            >
                Tekan untuk mengatur
            </Tooltip>
            <Modal
                className="right"
                isOpen={modal}
                toggle={() => {
                    setModal(false);
                }}
            >
                <ModalBody>
                    <Row className="mb-5">
                        <Col col="12" sm="12" md="12">
                            <h5>Atur Jadwal Harian</h5>
                            <hr />
                            <FormGroup>
                                <Label htmlFor="fullName" className="input-label">Nama</Label>
                                <p>{personnelName}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="day" className="input-label">Hari</Label>
                                <p>{day.label}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="shift-name" className="input-label">Lokasi Kerja</Label>
                                <Select
                                    key={optionsLocation[0]}
                                    options={optionsLocation}
                                    onChange={changeLocation}
                                    value={location}
                                    isClearable
                                    isSearchable={false}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="shift-name" className="input-label">Jadwal Kerja</Label>
                                <Select
                                    key={optionsShift[0]}
                                    options={optionsShift}
                                    value={shift}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            top: 0
                                        })
                                    }}
                                    isClearable
                                    isSearchable={false}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    onChange={changeShift}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        className="mr-2"
                        color="light"
                        onClick={() => closeModal()}
                    >
                        {t("batal")}
                    </Button>
                    <Button
                        color="netis-primary"
                        onClick={() => onSubmit()}
                    >
                        {t("simpan")}
                    </Button>
                </ModalBody>
            </Modal>
        </>
    )
});

const ModalShiftByPersonnel = ({ days, optionsShift, optionsLocation, onChanged, personnelId, personnelName }) => {

    const daysDefault = days.filter(day => (day['value'] !== 0 && day['value'] !== 6)).map(function (day) {
        return { 'value': day['value'], 'label': day['label'] }
    })

    const [filterDays, setFilterDays] = useState(daysDefault)
    const [modal, setModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [shift, setShift] = useState(optionsShift[0])
    const [location, setLocation] = useState(optionsLocation[0])

    function showModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    const changeDays = (value) => {
        setFilterDays(value)
    }

    const changeLocation = function (pilihan) {
        setLocation(pilihan)
    };

    const changeShift = (value) => {
        setShift(value)
    }

    const onSubmit = () => {
        setModalLoading(true)
        const _workingEmployee = []

        filterDays.forEach(day => {
            if (day) {
                _workingEmployee.push({
                    personnelId: personnelId,
                    shiftId: shift?.value ?? null,
                    day: day.value,
                    locationId: location?.value ?? null
                })
            }
        });
        request.post('v2/working-shifts-v2', {
            workingEmployee: _workingEmployee
        })
            .then(res => {
                toast.success(t('Berhasil Mengatur Jadwal Kerja'));
                setModalLoading(false)
                closeModal()
                onChanged(_workingEmployee)
            })
            .catch(err => {
                setModalLoading(false)
                if (err.response?.status === 422) {
                    toast.error(t('Gagal Mengatur Jadwal Kerja'));
                }
                closeModal()
            })
            .finally(() => {
                setModalLoading(false)
                closeModal()
            });
    }

    return (
        <>
            <Button color="light"
                style={{ width: 150 }}
                className="d-inline mr-1"
                onClick={() => showModal()}>
                Atur Jadwal
            </Button>
            <Modal
                className="right"
                isOpen={modal}
                toggle={() => {
                    setModal(false);
                }}
            >
                <ModalBody>
                    <Row className="mb-5">
                        <Col col="12" sm="12" md="12">
                            <h5>Atur Jadwal Mingguan</h5>
                            <hr />
                            <FormGroup>
                                <Label htmlFor="fullName" className="input-label">Nama</Label>
                                <p>{personnelName}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="day" className="input-label">Hari</Label>
                                <Select
                                    options={days}
                                    isMulti
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            top: 0
                                        })
                                    }}
                                    isClearable={true}
                                    defaultValue={daysDefault}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    onChange={changeDays}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="location" className="input-label">Lokasi Kerja</Label>
                                <Select
                                    key={optionsLocation[0]}
                                    options={optionsLocation}
                                    onChange={changeLocation}
                                    defaultValue={optionsLocation[0]}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="shift-name" className="input-label">Nama Shift</Label>
                                <Select
                                    options={optionsShift}
                                    defaultValue={optionsShift[0]}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            top: 0
                                        })
                                    }}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    onChange={changeShift}
                                // className={className}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        className="mr-2"
                        color="light"
                        onClick={() => closeModal()}
                    >
                        {t("batal")}
                    </Button>
                    <Button
                        color="netis-primary"
                        disabled={modalLoading || filterDays?.length <= 0 || !filterDays || !location || !shift}
                        onClick={() => onSubmit()}
                    >
                        {modalLoading ? (
                            <React.Fragment>
                                <Spinner size="sm" color="light" /> Merubah...
                            </React.Fragment>
                        )
                            :
                            (
                                t("simpan")
                            )
                        }
                    </Button>
                </ModalBody>
            </Modal>
        </>
    )
}
export default PersonnelWorkingShift;

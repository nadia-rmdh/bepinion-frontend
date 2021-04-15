import React, { memo, useCallback } from "react";
import { Table, Button, Modal, ModalBody, Spinner } from "reactstrap";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../../components/LoadingAnimation";
import * as moment from 'moment';
import { toast } from 'react-toastify';
import { t, translate } from 'react-switch-lang';
import { useUserPrivileges } from "../../../store";

const testNames = {
    'mbti': 'MBTI',
    'papikostick': 'PAPI Kostick',
    'disc': 'DISC',
    'fisiognomi': 'Fisiognomi',
    // 'palmistry': 'Palmistry' // TODO: Coming Soon
}

const testNamesArray = Object.keys(testNames);

function ManageAssessmentResult(props) {
    const [loading, setLoading] = useState(true);
    const [personnelResults, setPersonnelResults] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { can } = useUserPrivileges()
    const [filters, setFilters] = useState({ name: '', testNames: testNamesArray });

    useEffect(() => {
        setLoading(true);
        request.get('v1/assessment/results').then(res => {
            setPersonnelResults(res.data.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, [])

    if (loading) {
        return <div className="animated fadeIn">
            <LoadingAnimation />
        </div>
    }

    function doDelete() {
        if (deleteLoading) return;
        setDeleteLoading(true);
        request.delete('v1/assessment/results/' + deletingId).then(() => {
            setPersonnelResults(personnelResults.filter(r => r.id !== deletingId));
            setDeletingId(null);
            toast.success('Berhasil dihapus.');
        })
            .catch(err => {
                toast.error('Terjadi kesalahan');
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    const personnelFilter = personnelResults
        .filter((result) => filters.name ? result.userFullName.toUpperCase().includes(filters.name.toUpperCase()) : true)
        .filter((result) => filters.testNames.includes(result.testName));

    return <div className="animated fadeIn">
        <AssesmentFilter onChange={handleFilterChange} defaultFilter={filters} />
        <Table responsive>
            <thead>
                <tr>
                    <th className="text-center w-5">No.</th>
                    <th className="text-center">{t('nama')}</th>
                    <th className="text-center">{t('jenistes')}</th>
                    <th className="text-center">{t('hasil')}</th>
                    <th className="text-left">{t('tanggaltes')}</th>
                    <th className="text-center"></th>
                    </tr>
            </thead>
            <tbody>
                {personnelFilter.map((r, idx) => <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                        <Link to={"/personnels/" + r.personnelId} className={`personnel-name${can('read-employee') ? '' : ' disabled'}`}>
                            {r.userFullName}
                        </Link>
                    </td>
                    <td className="text-center">{testNames[r.testName] ?? r.testName}</td>
                    {/* <td className="text-center">{r.result?.toUpperCase()}</td> */}
                    {  r.testName === 'disc' ?
                        (() => {
                            const parse = JSON.parse(r.result)
                            const arrResult = Object.values(parse).flat()
                            const setResult = Array.from(new Set(arrResult)).join(", ")
                            return(
                                <td>
                                    {setResult}
                                </td>
                            )
                        })()
                        :
                        r.testName === 'fisiognomi' ?
                        <td>-</td>
                        :
                        <td>{r.result?.toUpperCase()}</td>
                    }
                    <td className="text-leftr text-nowrap">
                        {moment(r.created_at).format('DD MMM YYYY')}<br />
                        ({moment(r.created_at).format('HH:mm')})
                    </td>
                    <td className="text-nowrap">
                        <Link to={'/assessment/results/' + r.id}>
                            <Button color="netis-color" className={`${can('read-assessment-result') ? '' : ' d-none'}`}>{t('detail')}</Button>
                        </Link>
                        <Button className={`${can('delete-assessment-result') ? '' : ' d-none'}`} color="netis-danger ml-2" onClick={() => setDeletingId(r.id)}><i className="fa fa-trash-o"></i></Button>
                    </td>
                </tr>)}
            </tbody>
        </Table>
        <Modal isOpen={!!deletingId} toggle={() => {
            if (!deleteLoading) {
                setDeletingId(null)
            }
        }}>
            <ModalBody>
                <h6>{t('yakinmenghapus')}</h6>
                <div className="d-flex justify-content-end">
                    {!deleteLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>{t('batal')}</Button>}
                    <Button color="netis-primary" onClick={doDelete} disabled={deleteLoading}>
                        {deleteLoading ? <React.Fragment><Spinner size="sm" color="light" /> menghapus...</React.Fragment> : t('hapus')}
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    </div>
}


const AssesmentFilter = memo(({ onChange, defaultFilter })  => {
    const [searchName, setSearchName] = useState(defaultFilter?.name ?? '');
    const [filterTestName, setFilterTestName] = useState(defaultFilter?.testNames ?? []);

    useEffect(() => {
        onChange({ name: searchName, testNames: filterTestName})
    }, [onChange, searchName, filterTestName])

    const handleSearchNameChange = useCallback((event) => {
        setSearchName(event.target.value);
    }, [])

    const handleTestNameChange = useCallback((event) => {
        if (event.target.checked) {
            setFilterTestName((values) => [...values, event.target.value]);
        } else {
            setFilterTestName((values) => values.filter(name => name !== event.target.value));
        }
    }, [])

    return <div className="form-row">
        <div className="form-group col-sm-4">
            <label htmlFor="searchName" className="input-label mb-1">{ t('Cari nama') }</label>
            <input className="form-control" id="searchName" value={searchName} onChange={handleSearchNameChange} placeholder={ t('Cari nama') } />
        </div>
        <div className="form-group col-sm-8">
            <label htmlFor="filterJenisTest" className="input-label mb-1">{ t('Jenis tes') }</label>
            <div>
                {testNamesArray.map(testName => (
                    <div className="custom-control custom-checkbox custom-control-inline mt-2" key={testName}>
                        <input type="checkbox" className="custom-control-input" name="filterTestName" id={'filterTest-' + testName} value={testName} onChange={handleTestNameChange} checked={filterTestName.includes(testName)}/>
                        <label htmlFor={'filterTest-' + testName} className="custom-control-label">{ testNames[testName] }</label>
                    </div>
                ))}
            </div>
        </div>
    </div>
});


export default translate(ManageAssessmentResult);

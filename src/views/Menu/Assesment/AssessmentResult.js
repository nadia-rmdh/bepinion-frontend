import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../../components/LoadingAnimation";
import MbtiResult from "./mbti/MbtiResult";
import PapikostickResult from "./papikostick/PapikostickResult";
import PersonnelFisiognomi from "../Personnel/PersonnelFisiognomi";
import DiscResultAdmin from "./disc/DiscResultAdmin";
import { Button } from "reactstrap";
import request from "../../../utils/request";
import * as moment from 'moment';


function AssessmentResult(props) {
    const { id: resultId } = props.match.params
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        request.get('v1/assessment/results/' + resultId).then(res => {
            setResult(res.data.data);
        }).finally(() => setLoading(false))
    }, [resultId]);

    if (loading) {
        return <LoadingAnimation />
    }
    if (result.testName === 'mbti') {
        return <div>
            <div className="mb-3 d-flex align-items-center">
                <Button size="sm" onClick={props.history.goBack} color="outline-netis-primary"><i className="fa fa-chevron-left mr-1"></i></Button>
                <h3 className="h4 mb-0 ml-2">{result.userFullName}</h3>
                <span class="text-muted ml-auto">{moment(result.created_at).format('DD MMMM YYYY HH:mm')}</span>
            </div>
            <hr className="mb-3" />
            <MbtiResult result={result} />
        </div>
    }

    else if (result.testName === 'papikostick') {
        return <div>
            <div className="mb-3 d-flex align-items-center">
                <Button size="sm" onClick={props.history.goBack} color="outline-netis-primary"><i className="fa fa-chevron-left mr-1"></i></Button>
                <h3 className="h4 mb-0 ml-2">{result.userFullName}</h3>
                <span class="text-muted ml-auto">{moment(result.created_at).format('DD MMMM YYYY HH:mm')}</span>
            </div>
            <hr className="mb-3" />
            <PapikostickResult result={result} isAdmin={true} />
        </div>
    }

    else if (result.testName === 'disc') {
        return <div>
            <div className="mb-3 d-flex align-items-center">
                <Button size="sm" onClick={props.history.goBack} color="outline-netis-primary"><i className="fa fa-chevron-left mr-1"></i></Button>
                <h3 className="h4 mb-0 ml-2">{result.userFullName}</h3>
                <span class="text-muted ml-auto">{moment(result.created_at).format('DD MMMM YYYY HH:mm')}</span>
            </div>
            <hr className="mb-3" />
            <DiscResultAdmin result={result} isAdmin={true} />
        </div>
    }

    else if (result.testName === 'fisiognomi') {
        return <div>
            <div className="mb-3 d-flex align-items-center">
                <Button size="sm" onClick={props.history.goBack} color="outline-netis-primary"><i className="fa fa-chevron-left mr-1"></i></Button>
                <h3 className="h4 mb-0 ml-2">{result.userFullName}</h3>
                <span class="text-muted ml-auto">{moment(result.created_at).format('DD MMMM YYYY HH:mm')}</span>
            </div>
            <hr className="mb-3" />
            <PersonnelFisiognomi result={result} isAdmin={true} />
        </div>
    }

    return <div className="text-center">
        <h2>Page Not Found</h2>
        <Button onClick={props.history.goBack} color="netis-primary"><i className="fa fa-backward mr-2"></i> Kembali</Button>
    </div>
}

export default AssessmentResult;

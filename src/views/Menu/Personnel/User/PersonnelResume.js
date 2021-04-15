import React from "react";
import { translate} from 'react-switch-lang';
import { useAuthUser } from "../../../../store";
import DataFormal from "./PersonnelResume/PersonnelResumeDataFormal";
import DataNonFormal from "./PersonnelResume/PersonnelResumeDataNonFormal";
import DataWorkingHistory from "./PersonnelResume/PersonnelResumeDataWorkingHistory";
import DataSkill from "./PersonnelResume/PersonnelResumeDataSkill";

function PersonnelResume() {
    const user = useAuthUser();

    return (
        <div className="animated fadeIn">
            {/* <h4 className="content-title mb-4">{t('informasiperusahaan')}</h4> */}
            <DataFormal user={user} />
            <DataNonFormal user={user} />
            <DataWorkingHistory user={user} />
            <DataSkill user={user} />
        </div>
    )
}

export default translate(PersonnelResume)

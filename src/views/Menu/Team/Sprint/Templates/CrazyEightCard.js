import React from "react";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import AttachmentsFixed, { AttachmentsFixedPreview } from "./Components/AttachmentsFixed";

export const CrazyEightCard = ({ data, mutate }) => {
    return (
        <div>
            {data.values.description}
            <AttachmentsFixedPreview data={data?.attachments} cardId={data?.id} mutate={() => mutate()} />
        </div>
    )
}

export const CrazyEightCardDetail = ({ data, mutate, members }) => {

    return (
        <div className="card-detail">
            <TitleDescription data={data} mutate={() => mutate()}>
                <Assignments data={data?.assignments} cardId={data?.id} mutate={() => mutate()} members={members} />
            </TitleDescription>
            <AttachmentsFixed data={data?.attachments} cardId={data?.id} mutate={() => mutate()} />
            <Activity data={data?.activity} cardId={data?.id} mutate={() => mutate()} />
        </div>
    )
}
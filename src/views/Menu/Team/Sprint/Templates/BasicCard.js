import React from "react";
import Attachments from "./Components/Attachments";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";

export const BasicCardDetail = ({ data, mutate, members }) => {

    return (
        <div className="card-detail">
            <TitleDescription data={data} mutate={() => mutate()}>
                <Assignments data={data?.assignments} cardId={data?.id} mutate={() => mutate()} members={members} />
            </TitleDescription>
            <Attachments data={data?.attachments} cardId={data?.id} mutate={() => mutate()} />
            <Activity data={data?.activity} cardId={data?.id} mutate={() => mutate()} />
        </div>
    )
}
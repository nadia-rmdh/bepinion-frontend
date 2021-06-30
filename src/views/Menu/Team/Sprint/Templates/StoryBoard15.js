import React from "react";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import AttachmentsFixed from "./Components/AttachmentsFixed";

export const StoryBoard15Detail = ({ data, mutate, members }) => {

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
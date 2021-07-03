import React from "react";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import AttachmentsFixed from "./Components/AttachmentsFixed";
import { AttachmentsFixedPreview } from "./Components/AttachmentsFixed";

export const StoryBoard15 = ({ data }) => {
    return (
        <div>
            {data.values.description}
            <AttachmentsFixedPreview data={data?.attachments} cardId={data?.id} />
        </div>
    )
}

export const StoryBoard15Detail = ({ data, members }) => {

    return (
        <div className="card-detail">
            <TitleDescription data={data}>
                <Assignments data={data?.assignments} cardId={data?.id} members={members} />
            </TitleDescription>
            <AttachmentsFixed data={data?.attachments} cardId={data?.id} />
            <Activity data={data?.activity} cardId={data?.id} />
        </div>
    )
}
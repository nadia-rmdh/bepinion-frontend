import React from "react";
import Attachments from "./Components/Attachments";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import Comment from "./Components/Comment";
import Rating from "./Components/Rating";

export const BasicCard = ({ data, mutate }) => {
    return (
        <div>
            {data.values.description}
        </div>
    )
}
export const BasicCardDetail = ({ data, mutate, members }) => {

    return (
        <div className="card-detail">
            <TitleDescription data={data} mutate={() => mutate()}>
                <Assignments data={data?.assignments} cardId={data?.id} mutate={() => mutate()} members={members} />
                <Rating />
            </TitleDescription>
            <Attachments data={data?.attachments} cardId={data?.id} mutate={() => mutate()} />
            <Activity data={data?.activity} cardId={data?.id} mutate={() => mutate()}>
                <Comment data={data} cardId={data?.id} mutate={() => mutate()} />
            </Activity>
        </div>
    )
}
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
export const BasicCardDetail = ({ socket, data, mutate, members }) => {

    return (
        <div className="card-detail">
            <TitleDescription socket={socket} data={data} mutate={() => mutate()}>
                <Assignments socket={socket} data={data?.assignments} cardId={data?.id} mutate={() => mutate()} members={members} />
            </TitleDescription>
            <Attachments socket={socket} data={data?.attachments} cardId={data?.id} mutate={() => mutate()} />
            <Activity socket={socket} data={data?.activity} cardId={data?.id} mutate={() => mutate()}>
                <Comment socket={socket} data={data} cardId={data?.id} mutate={() => mutate()}>
                    <Rating socket={socket} data={data} cardId={data?.id} mutate={() => mutate()} />
                </Comment>
            </Activity>
        </div>
    )
}
import React from "react";
import Attachments from "./Components/Attachments";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import Comment from "./Components/Comment";
import Rating from "./Components/Rating";

export const BasicCard = ({ data }) => {
    return (
        <div>
            {data.values.description}
        </div>
    )
}
export const BasicCardDetail = ({ socket, data, members }) => {

    return (
        <div className="card-detail">
            <TitleDescription socket={socket} data={data}>
                <Assignments socket={socket} data={data?.assignments} cardId={data?.id} members={members} />
            </TitleDescription>
            <Attachments socket={socket} data={data?.attachments} cardId={data?.id} />
            <Activity socket={socket} data={data?.activity} cardId={data?.id}>
                <Comment socket={socket} data={data} cardId={data?.id}>
                    <Rating socket={socket} data={data} cardId={data?.id} />
                </Comment>
            </Activity>
        </div>
    )
}
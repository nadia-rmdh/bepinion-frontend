import React from "react";
import Attachments from "./Components/Attachments";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import Comment from "./Components/Comment";
import Rating from "./Components/Rating";
import { useRouteMatch } from "react-router-dom";
import { memo } from "react";

export const BasicCard = ({ data }) => {
    return (
        <div>
            {data.values.description}
        </div>
    )
}

export const BasicCardDetail = memo(({ socket, data, members }) => {
    const matchRoute = useRouteMatch();

    return (
        <div className="card-detail">
            <TitleDescription matchRoute={matchRoute} socket={socket} data={data}>
                <Assignments matchRoute={matchRoute} socket={socket} data={data?.assignments} cardId={data?.id} members={members} />
            </TitleDescription>
            <Attachments matchRoute={matchRoute} socket={socket} data={data?.attachments} cardId={data?.id} />
            <Activity matchRoute={matchRoute} socket={socket} data={data?.activity} cardId={data?.id}>
                <Comment matchRoute={matchRoute} socket={socket} data={data} cardId={data?.id}>
                    <Rating matchRoute={matchRoute} socket={socket} data={data} cardId={data?.id} />
                </Comment>
            </Activity>
        </div>
    )
})
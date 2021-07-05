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

export const BasicCardDetail = memo(({ socket, members, cardId, container }) => {
    const matchRoute = useRouteMatch();
    return (
        <div className="card-detail">
            <TitleDescription matchRoute={matchRoute} socket={socket} cardId={cardId}>
                {container === 'prototyping' && <Assignments matchRoute={matchRoute} socket={socket} cardId={cardId} members={members} />}
            </TitleDescription>
            <Attachments matchRoute={matchRoute} socket={socket} cardId={cardId} />
            <Activity matchRoute={matchRoute} socket={socket} cardId={cardId}>
                <Comment matchRoute={matchRoute} socket={socket} cardId={cardId}>
                    <Rating matchRoute={matchRoute} socket={socket} cardId={cardId} />
                </Comment>
            </Activity>
        </div>
    )
})
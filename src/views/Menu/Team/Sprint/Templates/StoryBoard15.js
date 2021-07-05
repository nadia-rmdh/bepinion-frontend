import React, { memo } from "react";
import Activity from "./Components/Activity";
import Assignments from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import AttachmentsFixed from "./Components/AttachmentsFixed";
import { AttachmentsFixedPreview } from "./Components/AttachmentsFixed";
import { useRouteMatch } from "react-router-dom";
import Comment from "./Components/Comment";
import Rating from "./Components/Rating";

export const StoryBoard15 = ({ data }) => {
    return (
        <div>
            {data.values.description}
            <AttachmentsFixedPreview data={data?.attachments} cardId={data?.id} />
        </div>
    )
}

export const StoryBoard15Detail = memo(({ socket, cardId, members, write }) => {
    const matchRoute = useRouteMatch();
    return (
        <div className="card-detail">
            <TitleDescription matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                <Assignments matchRoute={matchRoute} socket={socket} cardId={cardId} write={write} members={members} />
            </TitleDescription>
            <AttachmentsFixed matchRoute={matchRoute} socket={socket} cardId={cardId} write={write} />
            <Activity matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                <Comment matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                    <Rating matchRoute={matchRoute} socket={socket} cardId={cardId} write={write} />
                </Comment>
            </Activity>
        </div>
    )
})
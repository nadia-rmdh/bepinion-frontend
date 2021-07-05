import React, { memo } from "react";
import Activity from "./Components/Activity";
import TitleDescription from "./Components/TitleDescription";
import AttachmentsFixed from "./Components/AttachmentsFixed";
import { AttachmentsFixedPreview } from "./Components/AttachmentsFixed";
import { useRouteMatch } from "react-router-dom";
import Comment from "./Components/Comment";
import Rating from "./Components/Rating";

export const StoryBoard9 = ({ data }) => {
    return (
        <div>
            {data.values.description}
            <AttachmentsFixedPreview data={data?.attachments} cardId={data?.id} />
        </div>
    )
}

export const StoryBoard9Detail = memo(({ socket, cardId, members }) => {
    const matchRoute = useRouteMatch();
    return (
        <div className="card-detail">
            <TitleDescription matchRoute={matchRoute} socket={socket} cardId={cardId}>
            </TitleDescription>
            <AttachmentsFixed matchRoute={matchRoute} socket={socket} cardId={cardId} />
            <Activity matchRoute={matchRoute} socket={socket} cardId={cardId}>
                <Comment matchRoute={matchRoute} socket={socket} cardId={cardId}>
                    <Rating matchRoute={matchRoute} socket={socket} cardId={cardId} />
                </Comment>
            </Activity>
        </div>
    )
})
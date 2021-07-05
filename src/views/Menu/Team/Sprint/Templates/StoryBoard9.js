import React, { memo } from "react";
import Activity from "./Components/Activity";
import TitleDescription from "./Components/TitleDescription";
import AttachmentsFixed from "./Components/AttachmentsFixed";
import { AttachmentsFixedPreview } from "./Components/AttachmentsFixed";
import { useRouteMatch } from "react-router-dom";
import Comment from "./Components/Comment";
import Rating, { RatingPreview } from "./Components/Rating";

export const StoryBoard9 = ({ data }) => {
    return (
        <>
            <div className="sprint-desc">
                {data.values.description}
            </div>
            <div className="mt-3">
                <AttachmentsFixedPreview data={data?.attachments} cardId={data?.id} />
            </div>
            <div className="d-flex justify-content-center mt-3 w-100">
                <RatingPreview data={data?.rating} />
            </div>
        </>
    )
}

export const StoryBoard9Detail = memo(({ socket, cardId, write }) => {
    const matchRoute = useRouteMatch();
    return (
        <div className="card-detail">
            <TitleDescription matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
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
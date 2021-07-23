import React from "react";
import Attachments from "./Components/Attachments";
import Activity from "./Components/Activity";
import Comment from "./Components/Comment";
import Rating, { RatingPreview } from "./Components/Rating";
import { useRouteMatch } from "react-router-dom";
import { memo } from "react";
import DescriptionResult from "./Components/DescriptionResult";
import { useAuthUser } from "../../../../../store";

export const ResultCard = memo(({ data }) => {
    return (
        <>
            <div className="sprint-desc">
                {data.values.description}
            </div>
            <div className={`${data.container !== 'prototyping' ? 'd-flex' : 'd-none'} justify-content-center mt-3 w-100`}>
                <RatingPreview data={data?.rating} />
            </div>
        </>
    )
})

export const ResultCardDetail = memo(({ socket, members, cardId, container, write, leadId }) => {
    const user = useAuthUser();
    const matchRoute = useRouteMatch();
    console.log(leadId)
    return (
        <div className="card-detail">
            <DescriptionResult matchRoute={matchRoute} socket={socket} cardId={cardId} write={write && leadId === user.id} container={container}>
                {/* <Assignments matchRoute={matchRoute} socket={socket} cardId={cardId} members={members} write={write && leadId === user.id} /> */}
                <Attachments matchRoute={matchRoute} socket={socket} cardId={cardId} write={write && leadId === user.id} container={container} />
            </DescriptionResult>
            <Activity matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                <Comment matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                    <Rating matchRoute={matchRoute} socket={socket} cardId={cardId} write={write} />
                </Comment>
            </Activity>
        </div>
    )
})
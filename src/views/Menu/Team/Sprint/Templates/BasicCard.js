import React from "react";
import Attachments from "./Components/Attachments";
import Activity from "./Components/Activity";
import Assignments, { AssignmentPriview } from "./Components/Assignments";
import TitleDescription from "./Components/TitleDescription";
import Comment from "./Components/Comment";
import Rating, { RatingPreview } from "./Components/Rating";
import { useRouteMatch } from "react-router-dom";
import { memo } from "react";

export const BasicCard = ({ data }) => {
    return (
        <>
            <div className="sprint-desc">
                {data.values.description}
            </div>
            <div className={`${data?.assignments.length > 0 && data.container === 'prototyping' ? 'd-flex' : 'd-none'} float-right my-3`}>
                {data?.assignments.map((ass, i) => (
                    <AssignmentPriview data={ass} key={i} />
                ))}
            </div>
            <div className={`${data.container !== 'prototyping' ? 'd-flex' : 'd-none'} justify-content-center mt-3 w-100`}>
                <RatingPreview data={data?.rating} />
            </div>
        </>
    )
}

export const BasicCardDetail = memo(({ socket, members, cardId, container, write }) => {
    const matchRoute = useRouteMatch();
    return (
        <div className="card-detail">
            <TitleDescription matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                {container === 'prototyping' && <Assignments matchRoute={matchRoute} socket={socket} cardId={cardId} members={members} write={write} />}
            </TitleDescription>
            <Attachments matchRoute={matchRoute} socket={socket} cardId={cardId} write={write} />
            <Activity matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                <Comment matchRoute={matchRoute} socket={socket} cardId={cardId} write={write}>
                    {container === 'analysis' && <Rating matchRoute={matchRoute} socket={socket} cardId={cardId} write={write} />}
                </Comment>
            </Activity>
        </div>
    )
})
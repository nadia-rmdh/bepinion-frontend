import React, { useEffect, useState, useCallback } from "react";
import { memo } from "react";
import { Modal, ModalBody } from "reactstrap";
import { BasicCardDetail } from "./Templates/BasicCard";
import { CrazyEightCardDetail } from "./Templates/CrazyEightCard";
import { FishBoneDetail } from "./Templates/FishBone";
import { SprintMapDetail } from "./Templates/SprintMap";
import { StoryBoard15Detail } from "./Templates/StoryBoard15";
import { StoryBoard9Detail } from "./Templates/StoryBoard9";

export default memo(({ socket, isOpen, toggle, data, members }) => {
    const [dataDetail, setDataDetail] = useState(null);
    const handleToggle = useCallback(() => {
        toggle(false)
    }, [toggle])

    useEffect(() => {
        socket.emit("joinDetailCard", { cardId: data.content.id }, (res) => {
            if (!res.success) {
                // setFlag(1);
                console.log('error')
            } else {
                // setLoading(false)
            }
            // console.log('socket join')
        });
        socket.on('getDetailCard', (res) => {
            setDataDetail(res.data)
        })
    }, [data, socket])

    console.log(dataDetail)
    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()} size="lg">
            <ModalBody className="py-4 px-3" style={{ minHeight: '90vh' }}>
                <div type="button" className="close p-3" aria-label="Close" onClick={() => handleToggle()} style={{ border: 0, position: 'absolute', top: '0px', right: '0px' }}><span aria-hidden="true">×</span></div>
                {data?.content.template === 'basic' && <BasicCardDetail socket={socket} data={dataDetail} members={members} />}
                {data?.content.template === 'c8' && <CrazyEightCardDetail socket={socket} data={dataDetail} members={members} />}
                {data?.content.template === 'fishbone' && <FishBoneDetail socket={socket} data={dataDetail} members={members} />}
                {data?.content.template === 'sprintmap' && <SprintMapDetail socket={socket} data={dataDetail} members={members} />}
                {data?.content.template === 'storyboard9' && <StoryBoard9Detail socket={socket} data={dataDetail} members={members} />}
                {data?.content.template === 'storyboard15' && <StoryBoard15Detail socket={socket} data={dataDetail} members={members} />}
            </ModalBody>
        </Modal>
    )
})
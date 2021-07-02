import React, { useMemo } from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import useSWR from "swr";
import { BasicCardDetail } from "./Templates/BasicCard";
import { CrazyEightCardDetail } from "./Templates/CrazyEightCard";
import { FishBoneDetail } from "./Templates/FishBone";
import { SprintMapDetail } from "./Templates/SprintMap";
import { StoryBoard15Detail } from "./Templates/StoryBoard15";
import { StoryBoard9Detail } from "./Templates/StoryBoard9";

export default ({ socket, isOpen, toggle, data, members }) => {
    const { data: dataDetailSWR, error: dataError, mutate: mutateDetail } = useSWR('v1/cards/' + data.content.id);

    const dataDetail = useMemo(() => dataDetailSWR?.data?.data, [dataDetailSWR])
    const handleToggle = () => {
        toggle(false)
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()} size="lg">
            <ModalBody className="py-4 px-3" style={{ minHeight: '90vh' }}>
                {!dataDetail && dataError ?
                    <div
                        style={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: "rgba(255,255,255, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "75vh",
                        }}
                    >
                        <Spinner style={{ width: 48, height: 48 }} />
                    </div>
                    :
                    <>
                        <div type="button" className="close p-3" aria-label="Close" onClick={() => handleToggle()} style={{ border: 0, position: 'absolute', top: '0px', right: '0px' }}><span aria-hidden="true">×</span></div>
                        {data?.content.template === 'basic' && <BasicCardDetail socket={socket} data={dataDetail} mutate={() => mutateDetail()} members={members} />}
                        {data?.content.template === 'c8' && <CrazyEightCardDetail socket={socket} data={dataDetail} mutate={() => mutateDetail()} members={members} />}
                        {data?.content.template === 'fishbone' && <FishBoneDetail socket={socket} data={dataDetail} mutate={() => mutateDetail()} members={members} />}
                        {data?.content.template === 'sprintmap' && <SprintMapDetail socket={socket} data={dataDetail} mutate={() => mutateDetail()} members={members} />}
                        {data?.content.template === 'storyboard9' && <StoryBoard9Detail socket={socket} data={dataDetail} mutate={() => mutateDetail()} members={members} />}
                        {data?.content.template === 'storyboard15' && <StoryBoard15Detail socket={socket} data={dataDetail} mutate={() => mutateDetail()} members={members} />}
                    </>
                }
            </ModalBody>
        </Modal>
    )
}
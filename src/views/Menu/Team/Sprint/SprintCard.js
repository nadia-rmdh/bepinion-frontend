import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import useSWR from "swr";
import request from "../../../../utils/request";
import { BasicCardDetail } from "./Templates/BasicCard";
import { CrazyEightCardDetail } from "./Templates/CrazyEightCard";

function SprintCard({ title, column, cards, getData }) {
    const matchRoute = useRouteMatch();
    const sprint = useMemo(() => {
        return {
            'analysis': [getItems(cards.filter(card => card.category === 'idealist')[0]?.cards ?? []), getItems(cards.filter(card => card.category === 'analysis')[0]?.cards ?? [])],
            'prototyping': [getItems(cards.filter(card => card.category === 'todo')[0]?.cards ?? []), getItems(cards.filter(card => card.category === 'inprogress')[0]?.cards ?? []), getItems(cards.filter(card => card.category === 'done')[0]?.cards ?? [])],
            'result': [getItems(cards.filter(card => card.category === 'result')[0]?.cards ?? [])],
        }
    }, [cards])
    const getCategory = {
        'analysis': ['idealist', 'analysis'],
        'prototyping': ['todo', 'inprogress', 'done'],
        'result': ['result'],
    }

    const [state, setState] = useState([]);
    const [create, setCreate] = useState(null);
    const [modalTemplate, setModalTemplate] = useState(false)
    const [modalEditCard, setModalEditCard] = useState(false)
    const [modalEditCardData, setModalEditCardData] = useState(null)
    const category = getCategory[column];

    const toggleModalTemplate = (e) => {
        setModalTemplate(false)
    }

    const toggleModalEditCard = (e) => {
        setModalEditCard(false)
        setModalEditCardData(null)
    }

    useEffect(() => setState(sprint[column]), [sprint, column])

    const onDragEnd = useCallback((result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
        const newState = [...state];

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState);
        }
        newState.map((s, idx) => {
            let position = []
            s.map((st, k) => {
                return position.push(st.content.id)
            })

            return request.put('v1/cards/' + matchRoute.params.teamId + '/' + category[idx], { sort: position })
                .then(() => getData(true))
                .catch(() => alert('Error'))
        })
    }, [category, getData, matchRoute, state])

    const handleCreateTemplate = (container, category, teamId) => {
        request.post('v1/cards', {
            teamId: teamId,
            title: 'Basic card',
            description: '...',
            container: container,
            category: category,
            template: 'basic'
        })
            .then(() => {
                // toast.success('Berhasil menambahkan Card')
                getData()
            })
            .catch(() => {
                toast.error('Gagal menambahkan Card')
                return;
            })
    }

    return (
        <>
            <Card className="mt-3 border-0 rounded">
                <CardHeader className="text-center border-bottom-0 rounded-top" style={{ backgroundColor: '#EFEEEE' }}>
                    <div className="text-uppercase font-weight-bold font-lg">{title}</div>
                </CardHeader>
                <CardBody className="d-flex justify-content-around rounded-bottom" style={{ backgroundColor: '#EFEEEE', minHeight: '65vh' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {state?.map((el, ind) => (
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                        className={`sprint-box ${title === 'Hasil' ? 'overflow-hidden' : 'overflow-auto'}`}
                                    >
                                        <div className="sticky-header text-center text-uppercase">
                                            {category[ind]}
                                        </div>
                                        {el?.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        onClick={() => {
                                                            setModalEditCard(true)
                                                            setModalEditCardData(item)
                                                        }}
                                                    >
                                                        <Card className="px-0 bg-transparent border-0" style={{ position: 'relative' }}>
                                                            <CardHeader className="border-bottom-0 bg-transparent text-left p-1 w-75">
                                                                <strong>{item.content.title}</strong>
                                                            </CardHeader>
                                                            <CardBody className="p-1 sprint-desc">
                                                                {item.content.desc}
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        <div className="text-center mt-5 mb-3">
                                            {title !== 'Hasil' && <Button
                                                className="mb-2 round-button text-center"
                                                color="netis-color"
                                                onClick={() => {
                                                    setCreate({
                                                        container: column,
                                                        category: category[ind],
                                                        teamId: matchRoute.params.teamId
                                                    })
                                                    if (column === 'analysis') {
                                                        setModalTemplate(true)
                                                    } else {
                                                        handleCreateTemplate(column, category[ind], matchRoute.params.teamId)
                                                    }
                                                }}
                                            >
                                                <i className="fa fa-plus" />
                                            </Button>}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </CardBody>
            </Card>
            <ModalTemplate isOpen={modalTemplate} toggle={toggleModalTemplate} mutate={() => getData(true)} teamId={create?.teamId} container={create?.container} category={create?.category}></ModalTemplate>
            {modalEditCardData &&
                <ModalEditCard isOpen={modalEditCard} toggle={toggleModalEditCard} mutate={() => getData(true)} data={modalEditCardData} />
            }
        </>
    );
}

const getItems = (cards) => {
    return cards.map((card, idx) => ({
        id: `item-${card.id}`,
        content: {
            id: card.id,
            title: card.values.title,
            desc: card.values.description,
            template: card.template
        }
    }));
}

const ModalTemplate = ({ isOpen, toggle, mutate, teamId, container, category }) => {
    const templates = {
        'analysis': [
            { value: 'basic', label: 'Basic' },
            { value: 'c8', label: 'Crazy Eight' },
            { value: 'fishbone', label: 'Fishbone' },
            { value: 'sprintmap', label: 'Sprint Map' },
            { value: 'storyboard9', label: 'Story Board 9' }
        ],
        'prototyping': [
            { value: 'basic', label: 'Basic' },
        ]
    }

    const [template, setTemplate] = useState('')
    const handleToggle = () => {
        toggle(false)
    }

    const handleCreateTemplate = () => {
        request.post('v1/cards', {
            teamId: teamId,
            title: template.label,
            description: '...',
            container: container,
            category: category,
            template: template.value
        })
            .then(() => {
                // toast.success('Berhasil menambahkan Card')
                mutate()
                toggle(false)
            })
            .catch(() => {
                toast.error('Gagal menambahkan Card')
                return;
            })
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()} size="lg">
            <ModalHeader>
                Pilih Card yang ingin anda buat!
            </ModalHeader>
            <ModalBody>
                <Row className="d-flex justify-content-center align-items-center">
                    {templates[container]?.map((t, i) => (
                        <Col xs="4" key={i} className="d-flex justify-content-center align-items-center px-0">
                            <Card className={`card-template ${template.value === t.value && 'card-template-active'}`} onClick={() => setTemplate(t)}>
                                <CardBody className="d-flex justify-content-center align-items-center">
                                    <b>{t.label}</b>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="mr-2" color="netis-secondary" onClick={() => handleToggle()}>
                    Batal
                </Button>
                <Button color="netis-primary" onClick={() => handleCreateTemplate()}>
                    Buat
                </Button>
            </ModalFooter>
        </Modal>
    )
}

const ModalEditCard = ({ isOpen, toggle, mutate, data }) => {
    const { data: dataDetailSWR, error: dataError, mutate: mutateDetail } = useSWR('v1/cards/' + data.content.id);

    const dataDetail = useMemo(() => dataDetailSWR?.data?.data, [dataDetailSWR])
    const handleToggle = () => {
        toggle(false)
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()} size="lg">
            <ModalBody className="py-4 px-3">
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
                        {/* <button type="button" className="close" aria-label="Close" onClick={() => handleToggle()}><span aria-hidden="true">×</span></button> */}
                        {data?.content.template === 'basic' && <BasicCardDetail data={dataDetail} mutate={() => mutateDetail()} />}
                        {data?.content.template === 'c8' && <CrazyEightCardDetail data={dataDetail} />}
                    </>
                }
            </ModalBody>
        </Modal>
    )
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid * 2}px 0`,
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',
    cursor: 'pointer',

    // change background colour if dragging
    background: isDragging ? "#fff" : "#fff",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({

    borderRadius: '10px',
    maxHeight: '60vh',
    overflowY: 'scroll',
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    background: "#F6F5F5",
    padding: grid,
    paddingTop: 0,
    // width: 210,
    marginLeft: '5px',
    marginRight: '5px'
});

export default SprintCard

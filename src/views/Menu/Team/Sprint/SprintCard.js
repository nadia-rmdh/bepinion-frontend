import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { useAuthUser } from "../../../../store";
import ModalDetailCard from "./ModalDetailCard";
import ModalTemplate from "./ModalTemplate";
import { BasicCard } from "./Templates/BasicCard";
import { CrazyEightCard } from "./Templates/CrazyEightCard";
import { FishBone } from "./Templates/FishBone";
import { SprintMap } from "./Templates/SprintMap";
import { StoryBoard15 } from "./Templates/StoryBoard15";
import { StoryBoard9 } from "./Templates/StoryBoard9";

function SprintCard({ title, socket, column, cards, members }) {
    const matchRoute = useRouteMatch();
    const user = useAuthUser();
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

    const toggleModalEditCard = useCallback((e) => {
        setModalEditCard(false)
        setModalEditCardData(null)
    }, [])

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
            return socket.emit('putPositionCards', { req: { teamId: matchRoute.params.teamId, category: category[idx], sort: position } }, () => { console.log('position updated') })
        })
    }, [category, matchRoute, state, socket])

    const handleCreateTemplate = (container, category, teamId) => {
        socket.emit('postCard',
            {
                teamId: teamId,
                title: 'Basic card',
                description: '...',
                container: container,
                category: category,
                template: 'basic',
                authId: user.id
            }
            , (res) => {
                // console.log(res)
                if (res.success) {
                    // toast.success('Berhasil menambahkan Card')
                } else {
                    toast.error('Gagal menambahkan Card')
                }
            })
        return;
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
                                                        <Card className="px-0 bg-transparent border-0 mb-0" style={{ position: 'relative' }}>
                                                            <CardHeader className="border-bottom-0 bg-transparent text-left p-1 w-75">
                                                                <strong>{item.content.values.title}</strong>
                                                                <Button
                                                                    onClick={() => {
                                                                        const newState = [...state];
                                                                        newState[ind].splice(index, 1);
                                                                        setState(
                                                                            newState.filter(group => group.length)
                                                                        );
                                                                    }}
                                                                    style={{ border: 0, position: 'absolute', top: '0px', right: '0px' }}
                                                                    className="btn bg-transparent mr-1"
                                                                >
                                                                    <i className="fa fa-trash text-secondary" />
                                                                </Button>
                                                            </CardHeader>
                                                            <CardBody className="p-1 sprint-desc">
                                                                {item.content.template === 'basic' && <BasicCard data={item.content} />}
                                                                {item.content.template === 'c8' && <CrazyEightCard data={item.content} />}
                                                                {item.content.template === 'fishbone' && <FishBone data={item.content} />}
                                                                {item.content.template === 'sprintmap' && <SprintMap data={item.content} />}
                                                                {item.content.template === 'storyboard9' && <StoryBoard9 data={item.content} />}
                                                                {item.content.template === 'storyboard15' && <StoryBoard15 data={item.content} />}
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
            <ModalTemplate socket={socket} isOpen={modalTemplate} toggle={toggleModalTemplate} teamId={create?.teamId} container={create?.container} category={create?.category}></ModalTemplate>
            {modalEditCardData &&
                <ModalDetailCard socket={socket} isOpen={modalEditCard} toggle={toggleModalEditCard} data={modalEditCardData} members={members} />
            }
        </>
    );
}

const getItems = (cards) => {
    return cards.map((card, idx) => ({
        id: `item-${card.id}`,
        content: card
    }));
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
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid * 2}px 0`,
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    background: isDragging ? "#fff" : "#fff",
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

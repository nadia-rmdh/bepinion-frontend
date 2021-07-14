import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouteMatch } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";
import ModalDetailCard from "../ModalDetailCard";
import { ResultCard } from "../Templates/ResultCard";

export default memo(({ title, socket, column, cards, members, status, leadId }) => {
    const matchRoute = useRouteMatch();

    const getItems = useCallback((cards) => {
        return cards.map((card, idx) => ({
            id: `item-${card.id}`,
            content: card
        }));
    }, [])

    const reorder = useCallback((list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }, []);

    const move = useCallback((source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    }, []);

    const sprint = useMemo(() => {
        return [getItems(cards.filter(card => card.category === 'result')[0]?.cards ?? [])]
    }, [cards, getItems])

    const [state, setState] = useState(sprint);
    const [modalEditCard, setModalEditCard] = useState(false)
    const [modalEditCardData, setModalEditCardData] = useState(null)
    const category = ['result']

    useEffect(() => setState(sprint), [sprint])

    const toggleModalEditCard = useCallback((e) => {
        setModalEditCard(false)
        setModalEditCardData(null)
    }, [])

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
        let positionCategory = []
        let categoryUpdated = []
        newState.map((s, idx) => {
            let position = []
            s.map((st, k) => {
                return position.push(st.content.id)
            })
            categoryUpdated[idx] = category[idx]
            return positionCategory.push(position)
        })

        return socket.emit('putPositionCards', { req: { teamId: matchRoute.params.teamId, category: categoryUpdated, sort: positionCategory } }, () => { console.log('position updated') })
    }, [category, matchRoute, state, socket, reorder, move])

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
                                                            <CardHeader className="border-bottom-0 bg-transparent text-left p-1 px-2 w-75">
                                                                <strong>{item.content.values.title}</strong>
                                                            </CardHeader>
                                                            <CardBody className="p-1 sprint-content px-2">
                                                                {item.content.template === 'result' && <ResultCard data={item.content} />}
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </CardBody>
            </Card>
            {modalEditCardData &&
                <ModalDetailCard socket={socket} isOpen={modalEditCard} toggle={toggleModalEditCard} data={modalEditCardData} members={members} status={status} leadId={leadId} />
            }
        </>
    );
})

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

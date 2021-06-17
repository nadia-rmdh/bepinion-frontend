import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Card, CardBody, CardHeader } from "reactstrap";

function SprintCard({title, column}) {
    const dummy = {
        1: [getItems(1)],
        2: [getItems(3), getItems(2,3)],
        3: [getItems(5), getItems(3,5), getItems(4,8)]
    }

    const [state, setState] = useState(dummy[column]);

    function onDragEnd(result) {
        console.log(result)
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    return (
        <Card className="mt-3">
            <CardHeader className="text-center border-bottom-0" style={{backgroundColor:'#EFEEEE'}}>
                <strong className="text-uppercase">{title}</strong>
            </CardHeader>
            <CardBody className="d-flex justify-content-around" style={{backgroundColor:'#EFEEEE'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                    className={`sprint-box ${title === 'Hasil' ? 'overflow-hidden' : 'overflow-auto'}`}
                                >
                                    <div className="sticky-header text-center">
                                        Judul {ind+1}
                                    </div>
                                    {el.map((item, index) => (
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
                                                >
                                                <Card className="pb-2 px-0 bg-transparent border-0" style={{position:'relative'}}>
                                                    <CardHeader className="border-bottom-0 bg-transparent text-left p-1">
                                                        <i className="fa fa-lg fa-circle text-secondary" />
                                                        <strong>User {item.content.id}</strong>
                                                    </CardHeader>
                                                    <CardBody className="p-1">
                                                        {item.content.desc}
                                                    </CardBody>
                                                    <Button
                                                            onClick={() => {
                                                                const newState = [...state];
                                                                newState[ind].splice(index, 1);
                                                                setState(
                                                                    newState.filter(group => group.length)
                                                                );
                                                                console.log(newState.filter(group => group.length))
                                                            }}
                                                            style={{ border: 0, position:'absolute', top:'0px', right:'0px' }}
                                                            className="btn bg-transparent mr-1"
                                                        >
                                                            <i className="fa fa-trash text-secondary" />
                                                        </Button>
                                                </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <div className="text-center mt-5 mb-3">
                                        {title !== 'Hasil' && <Button
                                            className="mb-2 round-button btn btn-netis-primary text-center"
                                            onClick={() => {
                                                setState([...state, getItems(1)]);
                                            }}
                                            // onClick={() => {
                                            //     setState([getItems(state[0].length + 1)]);
                                            // }}
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
    );
}

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: {
            id: k + offset,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
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
    margin: `0 0 ${grid*2}px 0`,
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',

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
    marginLeft:'5px',
    marginRight:'5px'
});

export default SprintCard

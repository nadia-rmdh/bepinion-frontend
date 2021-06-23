import { useFormik, } from "formik";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import request from "../../../../utils/request";

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
    const [modalCreate, setModalCreate] = useState(false)
    const category = getCategory[column];

    // if (title === 'Prototyping') {
    //     console.log(cards)
    //     console.log(sprint)
    //     console.log(state)
    // }

    useEffect(() => setState(sprint[column]), [sprint, column])

    const { values, isSubmitting, ...formik } = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            request.post('v1/cards', {
                teamId: create.teamId,
                title: values.title,
                description: values.description,
                container: create.container,
                category: create.category,
                template: 'basic'
            })
                .then(() => {
                    getData(true)
                    toast.success('Berhasil menambahkan Card')
                    cancelCreate()
                })
                .catch(() => {
                    toast.error('Gagal menambahkan Card')
                    return;
                })
                .finally(() => setSubmitting(false))
        }
    })

    const cancelCreate = () => {
        formik.handleReset()
        setCreate(null)
        setModalCreate(false)
    }

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


    return (
        <>
            <Card className="mt-3">
                <CardHeader className="text-center border-bottom-0" style={{ backgroundColor: '#EFEEEE' }}>
                    <strong className="text-uppercase">{title}</strong>
                </CardHeader>
                <CardBody className="d-flex justify-content-around" style={{ backgroundColor: '#EFEEEE' }}>
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
                                        <div className="sticky-header text-center">
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
                                                    >
                                                        <Card className="pb-2 px-0 bg-transparent border-0" style={{ position: 'relative' }}>
                                                            <CardHeader className="border-bottom-0 bg-transparent text-left p-1 w-75">
                                                                <i className="fa fa-lg fa-circle text-secondary" />
                                                                <strong>{item.content.title}</strong>
                                                            </CardHeader>
                                                            <CardBody className="p-1 sprint-desc">
                                                                {item.content.desc}
                                                            </CardBody>
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
                                                    setCreate({
                                                        container: column,
                                                        category: category[ind],
                                                        teamId: matchRoute.params.teamId
                                                    })
                                                    setModalCreate(true)
                                                    // setState([...state, getItems(1)]);
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
            <Modal isOpen={modalCreate} toggle={cancelCreate}>
                <Form onSubmit={formik.handleSubmit}>
                    <ModalHeader toggle={cancelCreate}>Pembuatan Card {title} Baru</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <Label htmlFor="title" className="input-label">Judul Card</Label>
                                <Input
                                    type="input"
                                    className="form-control"
                                    name="title"
                                    id="title"
                                    onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    value={values.title}
                                    maxLength="50"
                                    placeholder="Judul Card"
                                />
                            </Col>
                            <Col xs="12">
                                <Label htmlFor="description" className="input-label">Deskripsi</Label>
                                <Input
                                    type="textarea"
                                    rows={5}
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={values.description}
                                    placeholder="Deskripsi"
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="mr-2" color="netis-secondary" onClick={cancelCreate}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !values.title || !values.description} className="ml-2" color="netis-color">
                            {isSubmitting ? <><Spinner color="light" size="sm" /> loading...</> : 'Submit'}
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
}

// fake data generator
const getItems = (cards) => {
    return cards.map((card, idx) => ({
        id: `item-${card.id}`,
        content: {
            id: card.id,
            title: card.values.title,
            desc: card.values.description
        }
    }));
}


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
    margin: `0 0 ${grid * 2}px 0`,
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
    marginLeft: '5px',
    marginRight: '5px'
});

export default SprintCard

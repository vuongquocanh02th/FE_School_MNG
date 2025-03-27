import { Button, Form, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams} from "react-router";
import { addList, fetchLists } from "../../redux/list/listAction.js";
import { addCard, fetchCards } from "../../redux/card/cardAction.js";
import {CardInfo} from "./CardInfo.jsx";

export const List = () => {
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.list.lists) || [];
    const cardsByList = useSelector((state) => state.card.cardsByList) || {};
    const { boardId } = useParams();

    const [isAdding, setIsAdding] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [addingCardToList, setAddingCardToList] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState("");


    const [selectedCard, setSelectedCard] = useState(null);
    const [showCardInfo, setShowCardInfo] = useState(false);

    useEffect(() => {
        if (boardId) {
            dispatch(fetchLists(boardId));
        }
    }, [dispatch, boardId]);

    useEffect(() => {
        lists.forEach((list) => {
            if (!cardsByList[list.id]) {
                dispatch(fetchCards(list.id));
            }
        });
    }, [dispatch, lists, cardsByList]);

    const handleAddList = () => {
        if (!newListName.trim()) return;
        dispatch(addList({ name: newListName.trim(), priority: lists.length + 1, boardId: Number(boardId) }));
        setNewListName("");
        setIsAdding(false);
    };

    const handleAddCard = (listId) => {
        if (!newCardTitle.trim()) return;

        const newCard = {
            id: Date.now(),
            title: newCardTitle,
            description: "Mô tả thẻ",
            listId,
        };

        dispatch({
            type: "ADD_CARD_SUCCESS",
            payload: { listId, card: newCard },
        });
        dispatch(addCard(newCard));

        setNewCardTitle("");
        setAddingCardToList(null);
    };

    const handleCardClick = (card) =>{
        setSelectedCard(card);
        setShowCardInfo(true);
    }


    return (
        <Container fluid className="d-flex gap-4 overflow-auto py-3">
            {lists.map((list) => (
                <Card key={list.id} style={{ width: "300px" }} className="shadow border-0 rounded-3">
                    <Card.Body>
                        <Card.Title className="fw-bold text-primary">{list.name}</Card.Title>
                        <div className="overflow-auto" style={{ maxHeight: "250px" }}>
                            {cardsByList[list.id] && cardsByList[list.id].length > 0 ? (
                                cardsByList[list.id].map((card) => (
                                    <Card key={card.id} className="mb-2 p-2 shadow-sm border-0 rounded-2 bg-light"
                                          style={{ transition: "0.3s", cursor: "pointer" }}
                                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e3f2fd"}
                                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                                          onClick={() => handleCardClick(card)} >
                                        {card.title}
                                    </Card>
                                ))
                            ) : (
                                <p className="text-muted text-center">No cards</p>
                            )}
                        </div>

                        {addingCardToList === list.id ? (
                            <div>
                                <Form.Control
                                    type="text"
                                    value={newCardTitle}
                                    autoFocus
                                    placeholder="Nhập tên thẻ..."
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddCard(list.id)}
                                    className="mb-2"
                                />
                                <div className="d-flex justify-content-between">
                                    <Button variant="success" size="sm" onClick={() => handleAddCard(list.id)}>
                                        Add Card
                                    </Button>
                                    <Button variant="outline-secondary" size="sm" onClick={() => setAddingCardToList(null)}>
                                        ✖
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button variant="link" className="text-muted p-0" onClick={() => setAddingCardToList(list.id)}>
                                + Thêm thẻ
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            ))}

            <Card style={{ width: "300px" }} className="shadow-sm border-0 rounded-3">
                <Card.Body className="d-flex flex-column align-items-center">
                    {isAdding ? (
                        <div className="w-100">
                            <Form.Control
                                type="text"
                                value={newListName}
                                autoFocus
                                placeholder="Nhập tên danh sách..."
                                onChange={(e) => setNewListName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddList()}
                                className="mb-2"
                            />
                            <div className="d-flex justify-content-between">
                                <Button variant="primary" size="sm" onClick={handleAddList}>
                                    Add List
                                </Button>
                                <Button variant="outline-secondary" size="sm" onClick={() => setIsAdding(false)}>
                                    ✖
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button variant="link" className="text-muted" onClick={() => setIsAdding(true)}>
                            + Thêm danh sách
                        </Button>
                    )}
                </Card.Body>
            </Card>
            {/* Modal CardInfo */}
            {selectedCard && (
                <CardInfo
                    card={selectedCard}
                    show={showCardInfo}
                    handleClose={() => setShowCardInfo(false)}
                />
            )}
        </Container>
    );
};

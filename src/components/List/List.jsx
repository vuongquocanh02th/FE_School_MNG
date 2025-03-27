import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchLists, MOVE_LIST} from "../../redux/list/listAction.js";
import {useParams} from "react-router";
import {ADD_CARD_REQUEST, MOVE_CARD_REQUEST} from "../../redux/card/cardAction.js";
import {ListTitle} from "./ListTitle.jsx";
import {ListAddForm} from "./ListAddForm.jsx";

const listContainerStyle = {
    display: "flex",
    gap: "10px",
    width: "auto",
    maxWidth: "none",
    paddingBottom: "10px",
    alignItems: "flex-start",
    padding: "10px"
}

const listStyle = {
    width: "300px",
    minHeight: "100px",
    backgroundColor: "#ebecf0",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
}

const cardStyle = {
    padding: "5px",
    marginBottom: "5px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
}

export const List = () => {
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.list.lists);
    const {boardId} = useParams();

    const [addingCardToList, setAddingCardToList] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState("");
    let currentList = useState(null);
    let currentCard = useState(null);

    useEffect(() => {
        if (boardId) {
            dispatch(fetchLists(boardId));
        }
    }, [dispatch, boardId]);

    const closeAddCard = () => {
        setAddingCardToList(null);
        setNewCardTitle("");
    }

    const handleAddCard = (list) => {
        if (!newCardTitle.trim()) return;

        dispatch({
            type: ADD_CARD_REQUEST, payload: {
                board_id: list.board_id,
                card: {
                    title: newCardTitle,
                    list_id: list.id,
                    priority: list.cards.length,
                }
            }
        });

        setNewCardTitle("");
        setAddingCardToList(null);
    };

    const handleCardDragStart = (card) => (e) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = 'move';
        currentCard = card;
        currentList = null;
    };

    const handleCardDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleCardDrop = (card, list, index) => (e) => {
        if (currentCard === card || currentCard === null)
            return;
        e.preventDefault();
        e.stopPropagation();

        currentCard = {...currentCard, priority: index + 1};
        dispatch({
            type: MOVE_CARD_REQUEST, payload: {
                board_id: list.board_id,
                listId: list.id,
                card: currentCard
            }
        });
    };

    const handleListDragStart = (list) => (e) => {
        e.dataTransfer.effectAllowed = 'move';
        currentCard = null;
        currentList = list;
    };

    const handleListDragOver = (e) => {
        e.preventDefault();
    };

    const handleListDrop = (list, index) => (e) => {
        if (currentList === list)
            return;
        e.preventDefault();

        if (currentCard !== null) {
            currentCard = {...currentCard, priority: 0};
            dispatch({
                type: MOVE_CARD_REQUEST, payload: {
                    board_id: list.board_id,
                    listId: list.id,
                    card: currentCard
                }
            });
            return;
        }

        currentList = {...currentList, priority: index};
        dispatch({type: MOVE_LIST, payload: currentList});
    };


    return (
        <div style={listContainerStyle}>
            {lists.map((list, index) => (
                <div key={list.id} style={listStyle} draggable onDragStart={handleListDragStart(list)}
                     onDragOver={handleListDragOver} onDrop={handleListDrop(list, index)}>
                    <ListTitle list={list}/>

                    <div style={{overflowY: "auto", maxHeight: "550px", padding: "5px", borderRadius: "5px"}}>
                        {list.cards && list.cards.length > 0 ? (
                            list.cards.map((card, index) => (
                                <div key={card.id} className="card" style={cardStyle} draggable
                                     onDragStart={handleCardDragStart(card)}
                                     onDragOver={handleCardDragOver} onDrop={handleCardDrop(card, list, index)}>
                                    {card.title}
                                </div>
                            ))
                        ) : (
                            <p className="no-card" style={{textAlign: "center", color: "#5e6c84"}}>No cards</p>
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
                                onKeyDown={(e) => e.key === "Enter" && handleAddCard(list)}
                                onBlur={closeAddCard}
                                style={{fontSize: "14px", padding: "8px", borderRadius: "5px"}}
                            />
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "5px"}}>
                                <Button variant="success" size="sm" onClick={() => handleAddCard(list)}>
                                    Add Card
                                </Button>
                                <Button variant="danger" size="sm" onClick={closeAddCard}>
                                    ❌
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <button
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#5e6c84",
                                textAlign: "left",
                                cursor: "pointer",
                                padding: "5px",
                                fontSize: "14px"
                            }}
                            onClick={() => setAddingCardToList(list.id)}
                        >
                            + Thêm thẻ
                        </button>
                    )}
                </div>
            ))}

            <ListAddForm listLength={lists.length} boardId={boardId}/>
        </div>
    );
};

import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addList, fetchLists } from "../../redux/list/listAction.js";
import { useParams } from "react-router";
import { addCard, fetchCards } from "../../redux/card/cardAction.js";

export const List = () => {
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.list.lists) || [];
    const cardsByList = useSelector((state) => state.card.cardsByList) || {};
    const { boardId } = useParams();

    const [isAdding, setIsAdding] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [addingCardToList, setAddingCardToList] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState("");

    useEffect(() => {
        if (boardId) {
            dispatch(fetchLists(boardId));
        }
    }, [dispatch, boardId]);

    useEffect(() => {
        // Khi đã có danh sách (lists), gọi fetchCards cho mỗi danh sách
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
            id: Date.now(), // Tạo ID tạm thời
            title: newCardTitle,
            description: "Mô tả thẻ",
            listId,
        };

        // Cập nhật Redux store ngay lập tức
        dispatch({
            type: "ADD_CARD_SUCCESS",
            payload: { listId, card: newCard },
        });
        dispatch(addCard(newCard));

        setNewCardTitle("");
        setAddingCardToList(null);
    };

    return (
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px", alignItems: "flex-start", padding: "10px" }}>
            {lists.map((list) => (
                <div
                    key={list.id}
                    style={{
                        width: "300px",
                        minHeight: "100px",
                        backgroundColor: "#ebecf0",
                        borderRadius: "10px",
                        padding: "10px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <h5 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>{list.name}</h5>

                    <div style={{ overflowY: "auto", maxHeight: "250px", padding: "5px", borderRadius: "5px" }}>
                        {cardsByList[list.id] && cardsByList[list.id].length > 0 ? (
                            cardsByList[list.id].map((card) => ( // Hiển thị thẻ của danh sách
                                <div key={card.id} className="card" style={{ padding: "5px", marginBottom: "5px", backgroundColor: "#ffffff", borderRadius: "5px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}>
                                    {card.title}
                                </div>
                            ))
                        ) : (
                            <p className="no-card" style={{ textAlign: "center", color: "#5e6c84" }}>No cards</p>
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
                                style={{ fontSize: "14px", padding: "8px", borderRadius: "5px" }}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                                <Button variant="success" size="sm" onClick={() => handleAddCard(list.id)}>
                                    Add Card
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => setAddingCardToList(null)}>
                                    ❌
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <button
                            style={{ backgroundColor: "transparent", border: "none", color: "#5e6c84", textAlign: "left", cursor: "pointer", padding: "5px", fontSize: "14px" }}
                            onClick={() => setAddingCardToList(list.id)}
                        >
                            + Thêm thẻ
                        </button>
                    )}
                </div>
            ))}

            <div style={{ width: "300px", minHeight: "100px", backgroundColor: "#ebecf0", borderRadius: "10px", padding: "10px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {isAdding ? (
                    <div>
                        <Form.Control
                            type="text"
                            value={newListName}
                            autoFocus
                            placeholder="Nhập tên danh sách..."
                            onChange={(e) => setNewListName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddList()}
                            style={{ fontSize: "14px", padding: "8px", borderRadius: "5px" }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                            <Button variant="success" size="sm" onClick={handleAddList}>
                                Add List
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => setIsAdding(false)}>
                                ❌
                            </Button>
                        </div>
                    </div>
                ) : (
                    <button
                        style={{ backgroundColor: "transparent", border: "none", color: "#5e6c84", textAlign: "left", cursor: "pointer", padding: "5px", fontSize: "14px" }}
                        onClick={() => setIsAdding(true)}
                    >
                        + Thêm danh sách
                    </button>
                )}
            </div>
        </div>
    );
};

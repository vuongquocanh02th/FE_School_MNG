import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {ADD_LIST_REQUEST} from "../../redux/list/listAction.js";
import {useDispatch} from "react-redux";

const listAddFormStyle = {
    width: "300px",
    minHeight: "100px",
    backgroundColor: "#ebecf0",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const addFormButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "#5e6c84",
    textAlign: "left",
    cursor: "pointer",
    padding: "5px",
    fontSize: "14px"
}

export const ListAddForm = ({listLength, boardId}) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [newListName, setNewListName] = useState("");

    const handleAddList = () => {
        if (!newListName.trim()) return;
        dispatch({
            type: ADD_LIST_REQUEST, payload:
                {
                    name: newListName.trim(),
                    priority: listLength + 1,
                    board_id: Number(boardId)
                }
        });
        closeAddList();
    };

    const closeAddList = () => {
        setNewListName("");
        setIsAdding(false);
    }

    return (
        <div style={listAddFormStyle}>
            {isAdding ? (
                <div>
                    <Form.Control
                        type="text"
                        value={newListName}
                        autoFocus
                        placeholder="Nhập tên danh sách..."
                        onChange={(e) => setNewListName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddList()}
                        style={{fontSize: "14px", padding: "8px", borderRadius: "5px"}}
                    />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        overflowX: "hidden",
                        marginTop: "5px"
                    }}>
                        <Button variant="success" size="sm" onClick={handleAddList}>
                            Add List
                        </Button>
                        <Button variant="danger" size="sm" onClick={closeAddList}>
                            ❌
                        </Button>
                    </div>
                </div>
            ) : (
                <button style={addFormButtonStyle}
                        onClick={() => setIsAdding(true)}
                >
                    + Thêm danh sách
                </button>
            )}
        </div>
    )
}
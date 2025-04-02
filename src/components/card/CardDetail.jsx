import React, {useEffect, useState} from "react";
import {Modal, Button, ListGroup, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {GET_CARD_DETAIL, CLEAR_CARD_DETAIL, UPDATE_CARD_DETAIL} from "../../redux/card/cardAction.js";

export default function CardDetailModal({show, handleClose, cardId, boardId}) {
    const dispatch = useDispatch();
    const {detail} = useSelector((state) => state.card);

    const [formData, setFormData] = useState({});
    const [editField, setEditField] = useState(null);

    useEffect(() => {
        if (cardId) {
            dispatch({type: GET_CARD_DETAIL, payload: cardId});
        }
        return () => {
            dispatch({type: CLEAR_CARD_DETAIL});
        };
    }, [dispatch, cardId]);

    useEffect(() => {
        if (detail) {
            setFormData({
                title: detail.title || "",
                description: detail.description || "",
                due_date: detail.due_date || ""
            });
        }
    }, [detail]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSave = (field) => {
        dispatch({type: UPDATE_CARD_DETAIL, payload: {boardId, cardId, data: {...detail,[field]: formData[field]}}});
        setEditField(null);
    };

    const handleBlur = (field) => handleSave(field);

    const handleKeyPress = (e, field) => {
        if (e.key === "Enter") handleSave(field);
    };

    const renderField = (field, label, type = "text") => (
        <ListGroup.Item>
            <strong>{label}:</strong>{" "}
            {editField === field ? (
                <Form.Control
                    type={type}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={() => handleBlur(field)}
                    onKeyDown={(e) => handleKeyPress(e, field)}
                    autoFocus
                />
            ) : (
                <span
                    onClick={() => setEditField(field)}
                    style={{cursor: "pointer"}}
                >
          {formData[field] || "Chưa có"}
        </span>
            )}
        </ListGroup.Item>
    );

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Thông tin chi tiết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    {renderField("title", "Tiêu đề")}
                    {renderField("description", "Mô tả")}
                    {renderField("due_date", "Ngày hết hạn", "date")}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
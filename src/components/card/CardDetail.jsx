import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { GET_CARD_DETAIL, CLEAR_CARD_DETAIL, UPDATE_CARD_DETAIL } from "../../redux/card/cardAction.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

export default function CardDetail() {
    const dispatch = useDispatch();
    const { cardId = 1 } = useParams();
    const navigate = useNavigate();
    const detail = useSelector((state) => state.card.detail);
    const loading = useSelector((state) => state.card.loading);
    const error = useSelector((state) => state.card.error);

    // State lưu nội dung và mục đang chỉnh sửa
    const [formData, setFormData] = useState({});
    const [editField, setEditField] = useState(null); // Chỉ lưu mục đang chỉnh sửa

    useEffect(() => {
        if (cardId) {
            dispatch({ type: GET_CARD_DETAIL, payload: cardId });
        }
        return () => {
            dispatch({ type: CLEAR_CARD_DETAIL });
        };
    }, [dispatch, cardId]);

    useEffect(() => {
        if (detail) {
            setFormData({
                title: detail.title,
                description: detail.description,
                due_date: detail.due_date,
                priority: detail.priority,
            });
        }
    }, [detail]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (field) => {
        dispatch({ type: UPDATE_CARD_DETAIL, payload: { cardId, data: { [field]: formData[field] } } });
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
                <span onClick={() => setEditField(field)}>{formData[field] || "Chưa có"}</span>
            )}
        </ListGroup.Item>
    );

    if (loading) return <p className="text-center p-4">Đang tải...</p>;
    if (error) return <p className="text-red-500 p-4">Lỗi: {error}</p>;
    if (!detail) return <p className="text-center p-4">Không tìm thấy card</p>;

    return (
        <Container className="my-2">
            <ListGroup variant="flush">
                {renderField("title", "Tiêu đề")}
                {renderField("description", "Mô tả")}
                {renderField("due_date", "Ngày hết hạn", "date")}
                {renderField("priority", "Độ ưu tiên")}
            </ListGroup>

            <Row className="mt-4">
                <Col xs="auto">
                    <Button variant="secondary" onClick={() => navigate("/dashboard")}>Quay lại</Button>
                </Col>
            </Row>
        </Container>
    );
}

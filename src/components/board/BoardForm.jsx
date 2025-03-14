import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";

const BoardForm = ({ open, onClose, onBoardCreated, groupId }) => {
    const [boardTitle, setBoardTitle] = useState("");
    const [boardType, setBoardType] = useState("private");

    const handleCreateBoard = async () => {
        if (!boardTitle.trim()) {
            return;
        }

        if (!groupId) {
            return;
        }

        try {
            // Cấu trúc dữ liệu gửi lên API
            const payload = {
                name: boardTitle,
                type: boardType,
                group: { id: groupId }, // Gửi groupId dưới dạng đối tượng nhóm, không phải giá trị id
            };

            const response = await axios.post("http://localhost:8080/api/boards", payload, {
                headers: { "Content-Type": "application/json" },
            });

            if (onBoardCreated) {
                onBoardCreated(response.data);
                toast.success(`Bảng "${response.data.name}" đã được tạo!`);
            } else {
                console.warn("onBoardCreated không tồn tại!");
            }

            handleClose();
        } catch (error) {
            console.error("Lỗi khi tạo bảng:", error.response?.data || error.message);
        }
    };

    const handleClose = () => {
        setBoardTitle("");
        setBoardType("private");
        onClose();
    };

    return (
        <Modal show={open} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tạo Bảng Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tiêu đề..."
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại bảng</Form.Label>
                        <Form.Select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
                            <option value="private">Riêng tư</option>
                            <option value="group">Nhóm</option>
                            <option value="public">Công khai</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleCreateBoard} disabled={!groupId}>
                    Tạo Mới
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BoardForm;

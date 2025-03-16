import React, { useState } from "react";
import { Button, Modal, ListGroup, Container } from "react-bootstrap";
import { FaPlus, FaTachometerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GroupForm from "../group/GroupForm";
import GroupList from "../group/GroupList.jsx";

const Sidebar = ({ onGroupCreated, onBoardCreated }) => {
    const navigate = useNavigate();
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    return (
        <Container fluid className="sidebar bg-light p-3">
            {/* Nút chuyển đến danh sách bảng */}
            <ListGroup className="mb-3">
                <ListGroup.Item
                    action
                    onClick={() => navigate("/dashboard/boards")}
                    className="d-flex align-items-center"
                >
                    <FaTachometerAlt className="me-2" /> Bảng
                </ListGroup.Item>
            </ListGroup>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Nhóm người dùng</span>
                <Button variant="primary" size="sm" onClick={() => setIsGroupModalOpen(true)}>
                    <FaPlus />
                </Button>
            </div>

            <GroupList onBoardCreated={onBoardCreated} />

            <Modal show={isGroupModalOpen} onHide={() => setIsGroupModalOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhóm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupForm
                        closeForm={() => setIsGroupModalOpen(false)}
                        formType="add"
                        data={null}
                        onGroupCreated={onGroupCreated}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Sidebar;

import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Modal } from "react-bootstrap";
import { PlusCircle, Users } from "react-feather";
import BoardForm from "../board/BoardForm";
import { useOutletContext } from "react-router-dom";
import GroupMembers from "../groupMember/GroupMember.jsx";

const BoardsList = () => {
    const [openBoardForm, setOpenBoardForm] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const { boards, groupId, onBoardCreated, groupName, members } = useOutletContext();

    return (
        <Container className="py-3" style={{ maxWidth: "900px" }}>
            {groupName && <h5 className="fw-bold text-primary">Tên nhóm: {groupName}</h5>}
            <h5 className="mb-3 fw-bold text-dark d-flex align-items-center">
                Danh sách bảng
                <PlusCircle
                    size={24}
                    className="ms-2 text-primary"
                    onClick={() => {
                        if (!groupId) {
                            alert("Vui lòng chọn nhóm trước!");
                            return;
                        }
                        setOpenBoardForm(true);
                    }}
                    style={{ cursor: "pointer" }}
                />
                <Button variant="outline-primary" className="ms-3" onClick={() => setShowMembers(true)}>
                    <Users size={20} className="me-1" /> Danh sách thành viên
                </Button>
            </h5>

            <Row className="g-3">
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <Col xs={12} sm={6} md={3} key={board.id}>
                            <Card className="p-2 d-flex align-items-center shadow-sm"
                                  style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", cursor: "pointer" }}
                                  onClick={() => console.log("Clicked board", board.name)}
                            >
                                <p className="mb-0 fw-bold text-dark text-truncate" style={{ maxWidth: "120px" }}>
                                    {board.name}
                                </p>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-muted text-center w-100">Không có bảng nào.</p>
                )}
            </Row>

            <BoardForm open={openBoardForm} onClose={() => setOpenBoardForm(false)} onBoardCreated={onBoardCreated} groupId={groupId} />

            {/* Modal hiển thị danh sách thành viên */}
            <Modal size={"lg"} show={showMembers} onHide={() => setShowMembers(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách thành viên</Modal.Title>
                </Modal.Header>
                <GroupMembers groupId={groupId} showMembers={showMembers} />
            </Modal>
        </Container>
    );
};

export default BoardsList;
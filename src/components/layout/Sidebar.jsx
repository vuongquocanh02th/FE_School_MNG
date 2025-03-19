import React from "react";
import { Button, Modal, ListGroup, Container } from "react-bootstrap";
import { FaPlus, FaTachometerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GroupForm from "../group/GroupForm";
import GroupList from "../group/GroupList.jsx";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_GROUP_FORM, OPEN_ADD_GROUP_FORM} from "../../redux/group/groupAction.js";
import {GET_ALL_BOARDS} from "../../redux/board/boardAction.js";

const Sidebar = () => {
    const navigate = useNavigate();
    const form = useSelector(state => state.group.formType);
    const dispatch = useDispatch();

    const openAddGroupForm = () => {
        dispatch({type: OPEN_ADD_GROUP_FORM})
    }

    const closeForm = () => {
        dispatch({type: CLOSE_GROUP_FORM})
    }
    const handleShowAllBoards = () => {
        dispatch({ type: GET_ALL_BOARDS });
        navigate("/dashboard/boards");
    };

    return (
        <Container fluid className="sidebar bg-light p-3">
            <ListGroup className="mb-3">
                <ListGroup.Item
                    action
                    onClick={handleShowAllBoards}
                    className="d-flex align-items-center"
                >
                    <FaTachometerAlt className="me-2" /> Bảng
                </ListGroup.Item>
            </ListGroup>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Nhóm người dùng</span>
                <Button variant="primary" size="sm" onClick={openAddGroupForm}>
                    <FaPlus />
                </Button>
            </div>

            <GroupList/>

            <Modal show={form !== "none"} onHide={closeForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhóm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupForm/>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Sidebar;

import React from "react";
import {Button, Modal, ListGroup, Container} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import GroupForm from "../group/GroupForm";
import GroupList from "../group/GroupList.jsx";
import {useDispatch, useSelector} from "react-redux";
import {RESET_GROUP, OPEN_ADD_GROUP_FORM} from "../../redux/group/groupAction.js";
import {Home} from "react-feather";

const Sidebar = () => {
    const navigate = useNavigate();
    const form = useSelector(state => state.group.formType);
    const dispatch = useDispatch();

    const openAddGroupForm = () => {
        dispatch({type: OPEN_ADD_GROUP_FORM})
    }

    const closeForm = () => {
        dispatch({type: RESET_GROUP})
    }
    // const handleShowAllBoards = () => {
    //     dispatch({ type: GET_ALL_BOARDS });
    //     navigate("/dashboard/boards");
    // };

    const handleToHome = () => {
        navigate("/dashboard/home");
    }

    return (
        <Container fluid className="sidebar bg-light p-3 overflow-y-auto">
            <ListGroup className="mb-3">
                <ListGroup.Item
                    action
                    onClick={handleToHome}
                    className="d-flex align-items-center"
                >
                    <Home className="me-2"/> Trang chủ
                </ListGroup.Item>
            </ListGroup>

            <hr/>

            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Nhóm người dùng</span>
                <Button variant="primary" size="sm" onClick={openAddGroupForm}>
                    <FaPlus/>
                </Button>
            </div>

            <GroupList/>

            <Modal show={form !== "none"} onHide={closeForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{form === "add" ? "Thêm" : "Sửa"} nhóm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupForm/>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Sidebar;

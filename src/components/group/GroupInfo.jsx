import React, {useEffect, useState} from "react";
import {Container, Row, Col, ListGroup, Button, Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {DELETE_GROUP, GET_GROUP_INFO, OPEN_EDIT_GROUP_FORM} from "../../redux/group/groupAction.js";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

export default function GroupInfo() {
    const info = useSelector(state => state.group.info);
    const {groupId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deletePrompt,setDeletePrompt] = useState(false);

    useEffect(() => {
        dispatch({type: GET_GROUP_INFO, payload: groupId});
    }, [dispatch, groupId]);

    const reformatDate = (date) => {
        try {
            let str = "";
            let arr = date.split("-");
            str += `${arr[0]}-${arr[1]}-`;
            arr = arr[2].split("T");
            str += arr[0];
            arr = arr[1].split(":");
            str += ` ${arr[0]}:${arr[1]}:${arr[2].split(".")[0]}`;
            return str;
        } catch {
            return "";
        }
    }

    const handleReturn = () => {
        navigate("/dashboard/group/" + groupId);
    }

    const openEditForm = () => {
        dispatch({type: OPEN_EDIT_GROUP_FORM})
    }

    const handleDelete = () => {
        setDeletePrompt(true);
    }

    const cancelDelete = () => {
        setDeletePrompt(false);
    }

    const acceptDelete = () => {
        dispatch({type: DELETE_GROUP, payload: groupId});
        setDeletePrompt(false);
    }
    return (
        <Container className="my-2">
            <h2 className="mb-4">Thông tin chi tiết</h2>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <strong>Tên nhóm: </strong>
                    <span>{info.name}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Loại: </strong>
                    <span>{info.type}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Quyền truy cập: </strong>
                    <span>{info.access}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Thời điểm tạo: </strong>
                    <span>{reformatDate(info.createdAt)}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Người tạo: </strong>
                    <span>{info.createdBy}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Mô tả: </strong>
                    <span>{info.description}</span>
                </ListGroup.Item>
            </ListGroup>

            <Row className="mt-4">
                <Col xs="auto">
                    <Button variant="primary" onClick={openEditForm}>Sửa</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="danger" onClick={handleDelete}>Xóa</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary" onClick={handleReturn}>Quay lại</Button>
                </Col>
            </Row>


            <Modal show={deletePrompt} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa nhóm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa nhóm {info.name}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={acceptDelete}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
import React from "react";
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {OPEN_EDIT_GROUP_FORM} from "../../redux/group/groupAction.js";

export default function GroupInfo() {
    const info = useSelector(state => state.group.info);
    const dispatch = useDispatch();

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

    const openEditForm = () => {
        dispatch({type: OPEN_EDIT_GROUP_FORM})
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
                    <Button variant="danger">Xóa</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary">Quay lại</Button>
                </Col>
            </Row>
        </Container>
    )
}
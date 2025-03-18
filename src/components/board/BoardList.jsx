import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, Button, Modal} from "react-bootstrap";
import {Eye, PlusCircle, Users} from "react-feather";
import BoardForm from "../board/BoardForm";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {GET_BOARD_LIST} from "../../redux/board/boardAction.js";
import {GET_GROUP_INFO} from "../../redux/group/groupAction.js";
import * as PropTypes from "prop-types";
import MemberGroup from "../../pages/member/MemberGroup.jsx";
import GroupMembers from "../groupMember/GroupMember.jsx";
import GroupMemberList from "../groupMember/GroupMemberList.jsx";

function GroupMembersList() {
    return null;
}

GroupMembersList.propTypes = {
    groupId: PropTypes.string,
    showMembers: PropTypes.bool
};
const BoardsList = () => {
    const [openBoardForm, setOpenBoardForm] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const dispatch = useDispatch();
    const groupInfo = useSelector(state => state.group.info);
    const boardList = useSelector(state => state.board.list);
    const {groupId} = useParams();

    useEffect(() => {
        dispatch({type: GET_GROUP_INFO, payload: groupId});
        dispatch({type: GET_BOARD_LIST, payload: groupId});
    }, [dispatch, groupId]);

    useEffect(() => {
    }, [boardList, groupInfo]);

    return (
        <Container className="py-3">
            <h5 className="mb-3">Tên nhóm: {groupInfo && groupInfo.name}</h5>
            <Container className="py-3 px-0">
                <Button variant="outline-primary" className="me-3">
                    <Eye size={20} className="me-1"/> Thông tin nhóm
                </Button>
                <Button variant="outline-primary" className="me-3" onClick={() => setShowMembers(true)}>
                    <Users size={20} className="me-1"/> Thành viên
                </Button>
            </Container>
            <h5 className="mb-3 fw-bold text-dark d-flex align-items-center">
                Danh sách bảng
                <PlusCircle
                    size={24}
                    className="ms-2 text-primary"
                    onClick={() => {
                        if (!groupInfo.id) {
                            alert("Vui lòng chọn nhóm trước!");
                            return;
                        }
                        setOpenBoardForm(true);
                    }}
                    style={{cursor: "pointer"}}
                />
            </h5>

            <Row className="g-3">
                {boardList.length > 0 ? (
                    boardList.map((board) => (
                        <Col xs={12} sm={6} md={2} key={board.id}>
                            <Card className="p-2 d-flex align-items-center shadow-sm"
                                  style={{borderRadius: "10px", backgroundColor: "#f5f5f5", cursor: "pointer"}}
                                  onClick={() => console.log("Clicked board", board.name)}
                            >
                                <p className="mb-0 fw-bold text-dark text-truncate" style={{maxWidth: "120px"}}>
                                    {board.name}
                                </p>
                            </Card>
                        </Col>
                    ))
                ) : (<p className="text-muted text-center w-100">Không có bảng nào.</p>)}
            </Row>

            <BoardForm open={openBoardForm} onClose={() => setOpenBoardForm(false)} groupId={groupId}/>

            <Modal size={"lg"} show={showMembers} onHide={() => setShowMembers(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách thành viên {groupInfo && groupInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupMemberList/>
                </Modal.Body>
            </Modal>

        </Container>
    );
};

export default BoardsList;
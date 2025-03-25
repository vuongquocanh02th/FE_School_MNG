import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, Modal} from "react-bootstrap";
import {PlusCircle} from "react-feather";
import BoardForm from "../board/BoardForm";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {GET_ALL_BOARDS, GET_BOARD_LIST} from "../../redux/board/boardAction.js";
import {GET_GROUP_INFO} from "../../redux/group/groupAction.js";
import * as PropTypes from "prop-types";
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
    const allBoards = useSelector(state => state.board.allBoards);
    const {groupId} = useParams();

    useEffect(() => {
        dispatch({type: GET_GROUP_INFO, payload: groupId});
        dispatch({type: GET_BOARD_LIST, payload: groupId});
        if (!groupId) {
            dispatch({ type: GET_ALL_BOARDS });
        }
    }, [dispatch, groupId]);

    let boardsToDisplay = groupId ? boardList : allBoards;
    boardsToDisplay = [...boardsToDisplay].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Container fluid className="py-3">
            <h5 className="mb-3 fw-bold text-dark d-flex align-items-center">
                Danh sách bảng
                <PlusCircle size={24} className="ms-2 text-primary" style={{cursor: "pointer"}}
                    onClick={() => {setOpenBoardForm(true);}}/>
            </h5>

            <Row className="g-3">
                {boardsToDisplay.length > 0 ? (
                    boardsToDisplay.map((board) => (
                        <Col xs={12} sm={6} md={2} key={board.id}>
                            <Card className="p-2 d-flex align-items-center shadow-sm"
                                  style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", cursor: "pointer" }}
                                  onClick={() => navigate(`/dashboard/board/${board.id}`)}
                            >
                                <p className="mb-0 fw-bold text-dark text-truncate" style={{ maxWidth: "120px" }}>
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
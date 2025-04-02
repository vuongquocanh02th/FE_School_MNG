import {Button, Overlay, Popover} from "react-bootstrap";
import {MoreVertical} from "react-feather";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {
    LEAVE_GROUP,
    REMOVE_GROUP_MEMBER,
    TRANSFER_GROUP_OWNERSHIP,
    UPDATE_GROUP_MEMBER_ROLE
} from "../../redux/member/memberAction.js";
import {DELETE_LIST} from "../../redux/list/listAction.js";
import {useParams} from "react-router";

export const ListMenu = ({listId}) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const dispatch = useDispatch()
    const {boardId} = useParams();

    const toggleMenu = () => setShow(!show);
    const handleHide = () => setShow(false);

    const handleDeleteList = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh sách?")) {
            dispatch({type: DELETE_LIST, payload: {list_id: listId, board_id: boardId}});
        }
    }

    return (
        <>
            <Button variant="link" style={{padding: 0}}
                    onClick={toggleMenu} ref={target}
            >
                <MoreVertical size={24}/>
            </Button>

            <Overlay target={target.current} show={show}
                     placement="left" rootClose onHide={handleHide}
            >
                {(props) => (
                    <Popover {...props}>
                        <Popover.Body style={{padding: "10px"}}>
                                <div className="member-option" onClick={handleDeleteList}>
                                    Xóa danh sách
                                </div>
                        </Popover.Body>
                    </Popover>
                )}
            </Overlay>
        </>
    );
}
import React, {useState, useRef, useEffect} from 'react';
import {MoreVertical} from 'react-feather';
import {Button, Overlay, Popover} from 'react-bootstrap';
import "./GroupMemberMenu.css"
import {useDispatch} from "react-redux";
import {
    LEAVE_GROUP,
    REMOVE_GROUP_MEMBER,
    TRANSFER_GROUP_OWNERSHIP,
    UPDATE_GROUP_MEMBER_ROLE
} from "../../redux/member/memberAction.js";

function GroupMemberMenu({type, member, groupId}) {
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState([]);
    const target = useRef(null);
    const dispatch = useDispatch();

    const toggleMenu = () => setShow(!show);
    const handleHide = () => setShow(false);

    const removeMember = () => {
        if (window.confirm("Bạn có chắc muốn xóa thành viên này không?")) {
            dispatch({
                type: REMOVE_GROUP_MEMBER,
                payload: {
                    groupId: groupId,
                    userId: member.id
                }
            });
        }
    };

    const updateMemberType = (type) => {
        dispatch({
            type: UPDATE_GROUP_MEMBER_ROLE,
            payload: {
                groupId: groupId,
                userId: member.id,
                type: type
            }
        });
    }

    const leaveGroup = () => {
        if (window.confirm("Bạn có chắc muốn rời khỏi nhóm không?")) {
            dispatch({
                type: LEAVE_GROUP,
                payload: {
                    groupId: groupId,
                }
            });
        }
    }

    const ownerLeaveGroup = () => {
        alert("Vui lòng chuyển quyền sở hữu nhóm trước khi rời nhóm");
    }

    const transferOwnership = () => {
        if (window.confirm(`Bạn có chắc muốn chuyển quyền sở hữu nhóm cho "${member.username}"`)) {
            dispatch({
                type: TRANSFER_GROUP_OWNERSHIP,
                payload: {
                    groupId: groupId,
                    userId: member.id,
                }
            });
        }
    }

    useEffect(() => {
        let newOptions = [];
        switch (type) {
            case "OWNER-THIS":
                newOptions.push({name: "Rời nhóm", action: ownerLeaveGroup, hover: false});
                break;
            case "ADMIN-THIS":
                newOptions.push({name: "Rời nhóm", action: leaveGroup, hover: false});
                newOptions.push({name: "Từ bỏ quyền quản trị", action: () => updateMemberType("MEMBER"), hover: false});
                break;
            case "MEMBER-THIS":
                newOptions.push({name: "Rời nhóm", action: leaveGroup, hover: false});
                break;
            case "OWNER-ADMIN":
                newOptions.push({name: "Loại khỏi nhóm", action: removeMember, hover: false});
                newOptions.push({name: "Bỏ quyền quản trị", action: () => updateMemberType("MEMBER"), hover: false});
                newOptions.push({name: "Chuyển quyền sở hữu nhóm", action: transferOwnership, hover: false});
                break;
            case "OWNER-MEMBER":
                newOptions.push({name: "Loại khỏi nhóm", action: removeMember, hover: false});
                newOptions.push({name: "Cấp quyền quản trị", action: () => updateMemberType("ADMIN"), hover: false});
                newOptions.push({name: "Chuyển quyền sở hữu nhóm", action: transferOwnership, hover: false});
                break;
            case "ADMIN-MEMBER":
                newOptions.push({name: "Loại khỏi nhóm", action: removeMember, hover: false});
                break;
        }
        setOptions(newOptions);
    }, [type]);

    return (
        <>
            {options.length > 0 &&
                <Button variant="link" style={{padding: 0}}
                        onClick={toggleMenu} ref={target}
                >
                    <MoreVertical size={20}/>
                </Button>
            }

            <Overlay target={target.current} show={show}
                     placement="left" rootClose onHide={handleHide}
            >
                {(props) => (
                    <Popover {...props}>
                        <Popover.Body style={{padding: "10px"}}>
                            {options.map((item) => (
                                <div className="member-option" key={item.name}
                                     onClick={item.action}>
                                    {item.name}
                                </div>
                            ))}
                        </Popover.Body>
                    </Popover>
                )}
            </Overlay>
        </>
    );
}

export default GroupMemberMenu;
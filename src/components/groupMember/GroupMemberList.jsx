import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import {
    GET_GROUP_MEMBER_LIST,
    ADD_GROUP_MEMBER,
    RESET_GROUP_MEMBER
} from "../../redux/member/memberAction.js";
import {GET_GROUP_INFO, GET_GROUP_LIST} from "../../redux/group/groupAction.js";
import {Container, Button, Form, Card, Table, Image, Alert, Row, Col} from "react-bootstrap";
import {Users} from "react-feather";
import anonymous from "../../assets/anonymous.png";
import GroupMemberMenu from "./GroupMemberMenu.jsx";
import {reformatMemberType} from "../../util/ReformatData.js";

function GroupMemberList() {
    const {groupId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const members = useSelector((state) => state.membersGroup.members);
    const addMemberSuccess = useSelector((state) => state.membersGroup.addMemberSuccess);
    const leaveGroupSuccess = useSelector((state) => state.membersGroup.leaveGroupSuccess);
    const user = useSelector((state) => state.auth.user);

    const [sortedMembers, setSortedMembers] = useState([]);
    const [userMember, setUserMember] = useState();
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [localMessage, setLocalMessage] = useState("");

    useEffect(() => {
        dispatch({type: GET_GROUP_INFO, payload: groupId});
        dispatch({type: GET_GROUP_MEMBER_LIST, payload: groupId});
    }, [dispatch, groupId]);

    useEffect(() => {
        if (user && members) {
            let theUserMember;
            let userMemberIndex;
            members.map((member, index) => {
                if (member.id === user.id) {
                    theUserMember = {...member, isUser: true};
                    userMemberIndex = index;
                }
                return member;
            });
            let newMembers = members.toSpliced(userMemberIndex, 1);
            newMembers.splice(0, 0, theUserMember);
            setUserMember(theUserMember);
            setSortedMembers(newMembers);
        }
    }, [user, members]);

    useEffect(() => {
        if (leaveGroupSuccess) {
            dispatch({type: RESET_GROUP_MEMBER});
            dispatch({type: GET_GROUP_LIST, payload: groupId});
            toast.success("Rời nhóm thành công");
            navigate("/dashboard/home");
        }

        if (addMemberSuccess) {
            setEmail("");
            setShowForm(false);
            toast.success("Thêm thành viên thành công!");
        }
    }, [addMemberSuccess, leaveGroupSuccess]);

    const handleAddMember = () => {
        if (!email.trim()) {
            setLocalMessage("Vui lòng nhập email");
            return;
        }
        dispatch({
            type: ADD_GROUP_MEMBER,
            payload: {groupId, email}
        });
    };

    const optionsType = (member) => {
        if (member.id === userMember.id) {
            return userMember.memberType.concat("-", "THIS");
        } else {
            return userMember.memberType.concat("-", member.memberType);
        }
    }

    return (
        <Container className="mt-4">
            <div className="mb-4" style={{width: "500px"}}>
                {!showForm ? (
                    <Button
                        variant="outline-primary"
                        className="d-flex align-items-center gap-2 px-3 py-2 shadow-sm rounded-3"
                        onClick={() => {
                            setShowForm(true);
                            setLocalMessage("");
                        }}
                    >
                        <Users size={20}/> Thêm thành viên
                    </Button>
                ) : (
                    <Card className="p-4 mt-3 shadow rounded-4">
                        <Form.Group className="mb-3 position-relative">
                            <Form.Control
                                type="email"
                                placeholder="Nhập email thành viên..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="ps-5 py-2 rounded-3 shadow-sm border-secondary-subtle"
                            />
                            <Users
                                size={18}
                                className="position-absolute top-50 start-0 ms-3 translate-middle-y text-secondary"
                            />
                        </Form.Group>
                        {localMessage && (
                            <Alert variant="danger" className="py-2 px-3 rounded-3">
                                {localMessage}
                            </Alert>
                        )}
                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                variant="primary"
                                onClick={handleAddMember}
                                className="px-4 rounded-3"
                            >
                                Thêm
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setShowForm(false);
                                    setEmail("");
                                    setLocalMessage("");
                                }}
                                className="px-4 rounded-3"
                            >
                                Hủy
                            </Button>
                        </div>
                    </Card>
                )}
            </div>

            <Table style={{width: "500px"}}>
                <tbody>
                {sortedMembers[0] && sortedMembers.map((member) => (
                    <React.Fragment key={member.id}>
                        <tr>
                            <td rowSpan={2} style={{width: "80px", height: "80px"}}>
                                <div className="d-flex align-items-center justify-content-center"
                                     style={{width: "100%", height: "100%"}}>
                                    <Image
                                        src={
                                            member?.imagePath
                                                ? `http://localhost:8080/images/${member.imagePath}`
                                                : anonymous
                                        }
                                        roundedCircle
                                        width="40"
                                        height="40"
                                    />
                                </div>
                            </td>
                            <td style={{fontSize: "16px"}}>
                                {member.username}
                                <span style={{color: "darkgray", fontSize: "12px"}}>
                                        {member.isUser && " (You)"}
                                    </span>
                            </td>
                            <td rowSpan={2} className="p-4" style={{width: "70px"}}>
                                <GroupMemberMenu type={optionsType(member)} member={member} groupId={groupId}/>
                            </td>
                        </tr>
                        <tr>

                            <td style={{color: "darkgray", fontSize: "14px"}}>
                                {reformatMemberType(member.memberType)}
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default GroupMemberList;

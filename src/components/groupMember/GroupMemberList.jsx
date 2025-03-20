import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import {
    GET_MEMBERGROUP_LIST,
    ADD_MEMBERGROUP,
    REMOVE_MEMBERGROUP,
    UPDATE_MEMBERGROUP_ROLE
} from "../../redux/member/memberAction.js";
import { GET_GROUP_INFO } from "../../redux/group/groupAction.js";
import {
    Container,
    Button,
    Form,
    Card,
    Table,
    Image,
    Alert,
    Row,
    Col
} from "react-bootstrap";
import { Users } from "react-feather";

function GroupMemberList() {
    const { groupId } = useParams();
    const dispatch = useDispatch();

    const members = useSelector((state) => state.membersGroup.members) || [];
    const addMemberSuccess = useSelector((state) => state.membersGroup.addMemberSuccess);

    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [memberType, setMemberType] = useState("MEMBER");
    const [localMessage, setLocalMessage] = useState("");

    useEffect(() => {
        dispatch({ type: GET_GROUP_INFO, payload: groupId });
        dispatch({ type: GET_MEMBERGROUP_LIST, payload: groupId });
    }, [dispatch, groupId]);

    // Khi thêm thành viên thành công -> reset form và đóng
    useEffect(() => {
        if (addMemberSuccess) {
            setEmail("");
            setMemberType("MEMBER");
            setShowForm(false);
            toast.success("Thêm thành viên thành công!");
        }
    }, [addMemberSuccess]);

    const handleAddMember = () => {
        if (!email.trim()) {
            setLocalMessage("Vui lòng nhập email");
            return;
        }
        dispatch({
            type: ADD_MEMBERGROUP,
            payload: { groupId, email, newRole: memberType }
        });
    };

    const handleRemoveMember = (memberId) => {
        if (window.confirm("Bạn có chắc muốn xóa thành viên này không?")) {
            dispatch({
                type: REMOVE_MEMBERGROUP,
                payload: {
                    groupId: groupId,
                    userId: memberId
                }
            });
            toast.success("Thành viên đã bị xóa!");
        }
    };

    const handleUpdateRole = (memberId, newRole) => {
        dispatch({
            type: UPDATE_MEMBERGROUP_ROLE,
            payload: {
                groupId: groupId,
                userId: memberId,
                newRole: newRole
            }
        });
        toast.success(`Đã cập nhật vai trò thành "${newRole === 'MODERATOR' ? 'Quản trị viên' : 'Thành viên'}"!`);
    };

    return (
        <Container className="mt-4">
            <div className="mb-3">
                {!showForm ? (
                    <Button variant="outline-primary" className="me-3" onClick={() => setShowForm(true)}>
                        <Users size={20} className="me-1" /> Thêm thành viên
                    </Button>
                ) : (
                    <Card className="p-3 mt-3">
                        <Form.Group className="mb-2">
                            <Form.Control
                                type="email"
                                placeholder="Nhập email thành viên..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select
                                value={memberType}
                                onChange={(e) => setMemberType(e.target.value)}
                            >
                                <option value="MEMBER">Thành viên</option>
                                <option value="MODERATOR">Quản trị viên</option>
                            </Form.Select>
                        </Form.Group>
                        {localMessage && (
                            <Alert variant="danger">{localMessage}</Alert>
                        )}
                        <Row>
                            <Col>
                                <Button
                                    variant="success"
                                    onClick={handleAddMember}
                                    className="me-2"
                                >
                                    Thêm
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowForm(false)}
                                >
                                    Hủy
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                )}
            </div>

            {members.length === 0 ? (
                <p>Không có thành viên nào trong nhóm.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>
                                <Image
                                    src={
                                        member.imagePath ||
                                        "https://tintuc.dienthoaigiakho.vn/wp-content/uploads/2024/01/c39af4399a87bc3d7701101b728cddc9.jpg?_gl=1*fqu1a6*_gcl_au*MTMzMDY5MTcyMS4xNzM1NDc4ODU1"
                                    }
                                    roundedCircle
                                    width="40"
                                    height="40"
                                />
                            </td>
                            <td>{member.username}</td>
                            <td>{member.email}</td>
                            <td>
                                <Form.Select
                                    value={member.memberType}
                                    onChange={(e) =>
                                        handleUpdateRole(
                                            member.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="MEMBER">Thành viên</option>
                                    <option value="MODERATOR">Quản trị viên</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                        handleRemoveMember(member.id)
                                    }
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default GroupMemberList;

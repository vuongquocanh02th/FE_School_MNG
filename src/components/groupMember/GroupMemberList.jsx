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
    Col,
    Modal
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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const addMemberError = useSelector((state) => state.membersGroup.addMemberError);

    useEffect(() => {
        dispatch({ type: GET_GROUP_INFO, payload: groupId });
        dispatch({ type: GET_MEMBERGROUP_LIST, payload: groupId });
    }, [dispatch, groupId]);

    useEffect(() => {
        if (addMemberError) {
            setLocalMessage(addMemberError);
        }
    }, [addMemberError]);

    const isValidEmail = (email) => {
        // Regex kiểm tra định dạng email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


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
        if (!isValidEmail(email.trim())) {
            setLocalMessage("Email không đúng định dạng");
            return;
        }
        setLocalMessage(""); // reset lỗi cục bộ nếu có
        dispatch({
            type: ADD_MEMBERGROUP,
            payload: { groupId, email, memberType: memberType }
        });
    };

    const handleConfirmRemoveMember = () => {
        if (selectedMember) {
            dispatch({
                type: REMOVE_MEMBERGROUP,
                payload: {
                    groupId: groupId,
                    userId: selectedMember.id
                }
            });
            toast.success(`Đã xóa thành viên ${selectedMember.username}`);
            setShowDeleteModal(false);
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

    const handleRemoveClick = (member) => {
        setSelectedMember(member);
        setShowDeleteModal(true);
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
                                        member?.imagePath
                                            ? `http://localhost:8080${member.imagePath}`
                                            : "https://tintuc.dienthoaigiakho.vn/wp-content/uploads/2024/01/c39af4399a87bc3d7701101b728cddc9.jpg"
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
                                    onClick={() => handleRemoveClick(member)}
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            {/* Modal confirm xóa */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa thành viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMember && (
                        <>Bạn có chắc chắn muốn xóa thành viên <strong>{selectedMember.username}</strong> không?</>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={handleConfirmRemoveMember}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default GroupMemberList;

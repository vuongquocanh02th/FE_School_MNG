import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    GET_MEMBERGROUP_LIST,
    ADD_MEMBERGROUP,
    REMOVE_MEMBERGROUP,
    UPDATE_MEMBERGROUP_ROLE
} from "../../redux/member/memberAction.js";
import {GET_GROUP_INFO} from "../../redux/group/groupAction.js";

function GroupMemberList() {
    const { groupId  } = useParams();
    const dispatch = useDispatch();

    const members = useSelector(state => state.membersGroup.members) || [];
    const loading = useSelector(state => state.membersGroup.loading);

    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [memberType, setMemberType] = useState("MEMBER");
    const [adding, setAdding] = useState(false);
    const [localMessage, setLocalMessage] = useState("");

    useEffect(() => {
        dispatch({type: GET_GROUP_INFO, payload: groupId});
        dispatch({type: GET_MEMBERGROUP_LIST, payload: groupId });
        console.log(members);
    }, [dispatch, groupId]);

    const handleAddMember = () => {
        if (!email.trim()) {
            setLocalMessage("Vui lòng nhập email");
            return;
        }

        setAdding(true);
        dispatch({
            type: ADD_MEMBERGROUP,
            payload: { groupId, email, newRole: memberType }
        });
        setLocalMessage("Đã gửi yêu cầu thêm thành viên");
        setEmail("");
        setAdding(false);
        setTimeout(() => setLocalMessage(""), 3000);
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
        }
    };

    const handleUpdateRole = (memberId, newRole) => {
        dispatch({
            type: UPDATE_MEMBERGROUP_ROLE,
            payload: {
                groupId: groupId, // lấy đúng groupId
                userId: memberId,        // memberId chính là userId
                newRole: newRole
            }
        });
    };



    return (
        <div className="container mt-4">
            <div className="mb-3">
                {!showForm ? (
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Thêm thành viên
                    </button>
                ) : (
                    <div className="card p-3 mt-2">
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Nhập email thành viên..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={adding}
                        />
                        <select
                            className="form-select mb-2"
                            value={memberType}
                            onChange={(e) => setMemberType(e.target.value)}
                            disabled={adding}
                        >
                            <option value="MEMBER">Thành viên</option>
                            <option value="MODERATOR">Quản trị viên</option>
                        </select>
                        {localMessage && <p className="text-success">{localMessage}</p>}
                        <div className="d-flex">
                            <button
                                className="btn btn-success me-2"
                                onClick={() => handleAddMember(memberType)}
                                disabled={adding}
                            >
                                {adding ? "Đang thêm..." : "Thêm"}
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowForm(false)}
                                disabled={adding}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {loading ? (
                <p>Đang tải danh sách thành viên...</p>
            ) : members.length === 0 ? (
                <p>Không có thành viên nào trong nhóm.</p>
            ) : (
                <table className="table table-bordered">
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
                                <img
                                    src={member.imagePath || "https://via.placeholder.com/40"}
                                    alt="Avatar"
                                    width="40"
                                    height="40"
                                    className="rounded-circle"
                                />
                            </td>
                            <td>{member.username}</td>
                            <td>{member.email}</td>
                            <td>
                                <select
                                    className="form-select"
                                    value={member.memberType}
                                    onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                >
                                    <option value="MEMBER">Thành viên</option>
                                    <option value="MODERATOR">Quản trị viên</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveMember(member.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default GroupMemberList;

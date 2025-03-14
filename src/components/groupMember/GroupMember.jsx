import React, {useEffect, useState} from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

const GroupMembers = ({
                          groupId = 2, onMemberAdded = () => {
    }
                      }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [message1, setMessage1] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [groupRole, setGroupRole] = useState("MEMBER");

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleAddMember = async () => {
        if (!email) {
            setMessage1("Vui lòng nhập email!");
            return;
        }
        if (!isValidEmail(email)) {
            setMessage1("Email không hợp lệ!");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const payload = {
                email,
                groupRole: groupRole.toUpperCase(),
            };

            const response = await axios.post(
                `http://localhost:8080/members/${groupId}/add`,
                payload,
                {headers: {"Content-Type": "application/json"}}
            );

            alert("Thêm thành viên thành công!");
            fetchMembers(groupId);
            setEmail("");
            setGroupRole("MEMBER");
            onMemberAdded(response.data);
            setTimeout(() => setShowForm(false), 1500);
        } catch (error) {
            setMessage1(error.response?.data || "Lỗi khi thêm thành viên!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [groupId]);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/members/${groupId}`);
            setMembers(response.data || []);
            setLoading(false);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) return;
        try {
            await axios.delete(`http://localhost:8080/members/${groupId}/remove/${userId}`);
            alert("Xóa thành viên thành công!");
            fetchMembers(groupId);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("Lỗi khi xóa thành viên!");
        }
    };
    const handleUpdateRole = async (userId, newRole) => {
        if (!window.confirm(`Bạn có chắc muốn đổi quyền thành ${newRole}?`)) return;

        try {
            console.log("Gửi yêu cầu cập nhật:", {role: newRole}); // Debug

            await axios.put(`http://localhost:8080/members/${groupId}/update-role/${userId}`,
                {role: newRole},
                {headers: {"Content-Type": "application/json"}}
            );

            alert("Cập nhật quyền thành viên thành công!");
            window.location.reload();
        } catch (error) {
            console.error("Lỗi khi cập nhật quyền!", error.response);
            setMessage("Lỗi khi cập nhật quyền!");
        }
    };

    // if (loading) return <p className="text-center">Đang tải...</p>;

    return (
        <div className="container mt-4">
            <div className="mb-3">
                {!showForm ? (
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Thêm thành viên
                    </button>
                ) : (
                    <div className="card p-3">
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Nhập email thành viên..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <select className="form-select mb-2" value={groupRole}
                                onChange={(e) => setGroupRole(e.target.value)} disabled={loading}>
                            <option value="MEMBER">Thành viên</option>
                            <option value="ADMIN">Quản trị viên</option>
                        </select>
                        {message1 && <p className="text-success">{message1}</p>}
                        <div className="d-flex align-items-center">
                            <button className="btn btn-success btn-sm me-2" onClick={handleAddMember}
                                    disabled={loading}>
                                {loading ? "Đang thêm..." : "Thêm"}
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}
                                    disabled={loading}>
                                Hủy
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {message && <p className="text-success">{message}</p>}
            <table className="table table-bordered table-striped">
                <thead className="table-light">
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
                                src={member.avatarUrl}
                                alt="Avatar"
                                className="rounded-circle"
                                width="40"
                                height="40"
                            />
                        </td>
                        <td>{member.displayName}</td>
                        <td>{member.email}</td>
                        <td>
                            <select className="form-select" value={member.GroupRole}
                                    onChange={(e) => handleUpdateRole(member.id, e.target.value)}>
                                <option value="MEMBER">Thành viên</option>
                                <option value="ADMIN">Quản trị viên</option>
                            </select>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleRemoveMember(member.id)}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GroupMembers;

import React, {useEffect, useState} from "react";
import axios from "axios";

const GroupMembers = ({ groupId = 2, onMemberAdded = () => {} }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [groupRole, setGroupRole] = useState("MEMBER");

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleAddMember = async () => {
        if (!email) {
            setMessage("Vui lòng nhập email!");
            return;
        }
        if (!isValidEmail(email)) {
            setMessage("Email không hợp lệ!");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const payload = {
                email,
                groupRole: groupRole.toUpperCase(), // Đảm bảo giá trị role viết hoa
            };

            console.log("📤 Gửi request:", payload);

            const response = await axios.post(
                `http://localhost:8080/members/${groupId}/add`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            alert("Thêm thành viên thành công!");
            window.location.reload();
            setEmail("");
            setGroupRole("MEMBER");

            if (typeof onMemberAdded === "function") {
                onMemberAdded(response.data);
            }

            setTimeout(() => setShowForm(false), 1500);
        } catch (error) {
            console.error("❌ Lỗi API:", error.response?.data);
            setMessage(error.response?.data || "Lỗi khi thêm thành viên!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [groupId]); // Thêm dependency để đảm bảo fetch khi groupId thay đổi

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/members/${groupId}`);
            console.log(response.data); // Debug API response

            // Kiểm tra dữ liệu trả về từ API
            const fetchedMembers = response.data || [];
            setMembers(fetchedMembers);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách thành viên:", error);
            setLoading(false);
        }
    };


    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) return;

        try {
            await axios.delete(`http://localhost:8080/members/${groupId}/remove/${userId}`);
            setMembers((prev) => prev.filter((member) => member.user?.id !== userId));
            alert("Xóa thành viên thành công!");
            window.location.reload(); // Reload trang
        } catch (error) {
            alert("Lỗi khi xóa thành viên!");
            console.error(error);
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
            window.location.reload(); // Reload trang
        } catch (error) {
            console.error("Lỗi khi cập nhật quyền!", error.response);
            setMessage("Lỗi khi cập nhật quyền!");
        }
    };


    if (loading) return <p>Đang tải...</p>;

    return (
        <div>
            <div>
                {!showForm ? (
                    <button onClick={() => setShowForm(true)}>Thêm thành viên</button>
                ) : (
                    <div>
                        <input
                            type="email"
                            placeholder="Nhập email thành viên..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <select value={groupRole} onChange={(e) => setGroupRole(e.target.value)} disabled={loading}>
                            <option value="MEMBER">Thành viên</option>
                            <option value="ADMIN">Quản trị viên</option>
                        </select>
                        <button onClick={handleAddMember} disabled={loading}>
                            {loading ? "Đang thêm..." : "Thêm"}
                        </button>
                        <button onClick={() => setShowForm(false)} disabled={loading}>Hủy</button>
                        {/*{message && <p>{message}</p>}*/}
                    </div>
                )}
            </div>
            <div>
                {message && <p style={{color: "green"}}>{message}</p>}
                <table border="1" cellPadding="10" cellSpacing="0" style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr style={{background: "#f4f4f4"}}>
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
                            <td className="p-3">
                                <img
                                    src={member.avatarUrl}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full border"
                                />
                            </td>
                            <td>{member.displayName}</td>
                            <td>{member.email}</td>
                            <td>
                                <select
                                    value={member.GroupRole}
                                    onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                    style={{padding: "5px"}}
                                >
                                    <option value="MEMBER">Thành viên</option>
                                    <option value="ADMIN">Quản trị viên</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleRemoveMember(member.id)}
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
        ;
};

export default GroupMembers;

import React, { useState } from "react";
import axios from "axios";

const AddMemberForm = ({ groupId, onMemberAdded = () => {} }) => {
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [groupRole, setGroupRole] = useState("MEMBER");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

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

            setMessage("Thêm thành viên thành công!");
            setEmail("");
            setGroupRole("MEMBER");

            if (typeof onMemberAdded === "function") {
                onMemberAdded(response.data);
            }

            setTimeout(() => setShowForm(false), 1500);
        } catch (error) {
            console.error("Lỗi API:", error.response?.data);
            setMessage(error.response?.data || "Lỗi khi thêm thành viên!");
        } finally {
            setLoading(false);
        }
    };


    return (
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
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default AddMemberForm;

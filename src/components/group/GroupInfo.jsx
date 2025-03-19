import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function GroupInfo() {
    const { id } = useParams();  // Lấy id từ URL
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/group/${id}`)
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu nhóm:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    const deleteGroup = () => {
        if (window.confirm(`Bạn chắc chắn muốn xóa nhóm "${data?.name}"?`)) {
            axios.delete(`http://localhost:8080/api/group/${id}`)
                .then(() => {
                    alert("Xóa nhóm thành công");
                    navigate("/groups"); // Điều hướng về danh sách nhóm
                })
                .catch((err) => {
                    alert("Bị lỗi khi xóa nhóm, vui lòng thử lại");
                    console.error(err);
                });
        }
    };

    const reformatDate = (date) => {
        if (!date) return "";
        let arr = date.split("-");
        let formattedDate = `${arr[0]}-${arr[1]}-`;
        let timeArr = arr[2].split("T");
        formattedDate += timeArr[0];
        let hourArr = timeArr[1].split(":");
        return `${formattedDate} ${hourArr[0]}:${hourArr[1]}:${hourArr[2].split(".")[0]}`;
    };

    if (loading) return <p>Đang tải thông tin nhóm...</p>;
    if (!data) return <p>Không tìm thấy nhóm.</p>;

    return (
        <div className="my-2">
            <h2 className="mb-4">Thông tin chi tiết</h2>
            <div className="mb-3">
                <strong>Tên nhóm:</strong>
                <p className="mb-0">{data.name}</p>
            </div>
            <div className="mb-3">
                <strong>Loại:</strong>
                <p className="mb-0">{data.type}</p>
            </div>
            <div className="mb-3">
                <strong>Quyền truy cập:</strong>
                <p className="mb-0">{data.access}</p>
            </div>
            <div className="mb-3">
                <strong>Thời điểm tạo:</strong>
                <p className="mb-0">{reformatDate(data.created_at)}</p>
            </div>
            <div className="mb-3">
                <strong>Người tạo:</strong>
                <p className="mb-0">{data.created_by}</p>
            </div>
            <div className="mb-3">
                <strong>Mô tả:</strong>
                <p className="mb-0">{data.description}</p>
            </div>
            <div className="d-flex justify-content-start mt-4">
                <button className="btn btn-primary me-2" onClick={() => navigate(`/groups/edit/${id}`)}>
                    Sửa
                </button>
                <button className="btn btn-danger me-2" onClick={deleteGroup}>
                    Xóa
                </button>
                <button className="btn btn-secondary me-2" onClick={() => navigate("/groups")}>
                    Quay lại
                </button>
            </div>
        </div>
    );
}

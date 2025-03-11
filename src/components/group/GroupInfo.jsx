import React from "react";
import axios from "axios";

export default function GroupInfo({data, closeInfo, openForm}) {
    const sendHttpRequestDeleteGroup = (id) => {
        axios.delete("http://localhost:8080/api/group/" + id)
            .then(() => {
                alert("Xóa nhóm thành công");
                closeInfo();
            })
            .catch((err) => {
                alert("Bị lỗi khi xóa nhóm, vui lòng thử lại")
                console.log(err);
            })
    }

    const onDeleteClick = () => {
        if (confirm(`Bạn chắc chắn muốn xóa nhóm ${data.name}`)) {
            sendHttpRequestDeleteGroup(data.id);
        }
    }

    const reformatDate = (date) => {
        try {
            let str = "";
            let arr = date.split("-");
            str += `${arr[0]}-${arr[1]}-`;
            arr = arr[2].split("T");
            str += arr[0];
            arr = arr[1].split(":");
            str += ` ${arr[0]}:${arr[1]}:${arr[2].split(".")[0]}`;
            return str;
        } catch {
            return "";
        }
    }

    return (
        <>
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
                    <button className="btn btn-primary me-2" onClick={openForm}>
                        Sửa
                    </button>
                    <button className="btn btn-danger me-2" onClick={onDeleteClick}>
                        Xóa
                    </button>
                    <button className="btn btn-secondary me-2" onClick={closeInfo}>
                        Quay lại
                    </button>
                </div>
            </div>
        </>
    )
}
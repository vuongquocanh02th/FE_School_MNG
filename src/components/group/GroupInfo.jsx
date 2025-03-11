import React from "react";
import axios from "axios";

export default function GroupInfo({data, closeInfo, openForm}) {
    const sendHttpRequestDeleteGroup = (id) => {
        axios.delete("http://localhost:8080/api/group/" + id)
            .then(() => {
                alert("Xóa nhóm thành công")
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
        let str = "";
        let arr = date.split("-");
        str += `${arr[0]}-${arr[1]}-`;
        arr = arr[2].split("T");
        str += arr[0];
        arr = arr[1].split(":");
        str += ` ${arr[0]}:${arr[1]}:${arr[2].split(".")[0]}`;
        return str;
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Chi tiết thông tin nhóm</h5>
                            <button type="button" className="btn-close" onClick={closeInfo}
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3"><strong>Tên nhóm:</strong> {data.name}</div>
                            <div className="mb-3"><strong>Loại:</strong> {data.type}</div>
                            <div className="mb-3"><strong>Quyền truy cập:</strong> {data.access}</div>
                            <div className="mb-3"><strong>Thời điểm tạo:</strong> {reformatDate(data.created_at)}</div>
                            <div className="mb-3"><strong>Người tạo:</strong> {data.created_by}</div>
                            <div className="mb-3"><strong>Mô tả:</strong> {data.description}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={openForm}>
                                Sửa
                            </button>
                            <button type="button" className="btn btn-danger" onClick={onDeleteClick}>
                                Xóa
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={closeInfo}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
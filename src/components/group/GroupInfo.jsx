import React from "react";

export default function GroupInfo({data,closeInfo,openForm}) {
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
                            <div className="mb-3"><strong>Thời điểm tạo:</strong> {data.created_at}</div>
                            <div className="mb-3"><strong>Người tạo:</strong> {data.created_by}</div>
                            <div className="mb-3"><strong>Mô tả:</strong> {data.description}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={openForm}>
                                Sửa
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
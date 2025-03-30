import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_BOARD_DETAIL, GET_BOARD_DETAIL_SUCCESS } from '../../redux/board/boardAction';
import { useNavigate, useParams } from 'react-router-dom';

const BoardDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const boardInfo = useSelector((state) => state.board.info);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch({ type: GET_BOARD_DETAIL, payload: id });
        }
        return () => {
            dispatch({ type: GET_BOARD_DETAIL_SUCCESS });
        };
    }, [dispatch]);

    if (!boardInfo || !boardInfo.id) {
        return <div className="text-center mt-5">Đang tải thông tin bảng...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3 className="card-title mb-0">Chi tiết Bảng: {boardInfo.name}</h3>
                </div>
                <div className="card-body">
                    <p><strong>Ngày tạo:</strong> {new Date(boardInfo.created_at).toLocaleString()}</p>
                    <p><strong>Mô tả:</strong> {boardInfo.description || 'Không có mô tả'}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i> Quay lại
                    </button>
                    <button className="btn btn-success" onClick={() => navigate(`/board/edit/${boardInfo.id}`)}>
                        <i className="bi bi-pencil"></i> Sửa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;

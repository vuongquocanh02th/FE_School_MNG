import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_BOARD } from '../../redux/board/boardAction';
import { Button, Form } from 'react-bootstrap';


const BoardEditForm = ({ board, onClose }) => {
    const [name, setName] = useState(board.name);
    const [visibility, setVisibility] = useState(board.visibility || 'PRIVATE');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: UPDATE_BOARD,
            payload: {
                id: board.id,
                name: name,
                visibility: visibility,
                group_id: board.group_id,
                created_by: board.created_by,
            }
        });
        if (onClose) onClose(); // đóng form nếu có callback
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
            <h5>Chỉnh sửa bảng</h5>
            <Form.Group controlId="boardName" className="mb-3">
                <Form.Label>Tên bảng</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tên bảng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="boardVisibility" className="mb-3">
                <Form.Label>Quyền hiển thị</Form.Label>
                <Form.Select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                >
                    <option value="PRIVATE">Riêng tư</option>
                    <option value="PUBLIC">Công khai</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onClose}>Hủy</Button>
                <Button type="submit" variant="primary">Lưu thay đổi</Button>
            </div>
        </Form>
    );
};

export default BoardEditForm;

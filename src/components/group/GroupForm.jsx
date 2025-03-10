import React, {useState} from 'react';
import axios from "axios";

export default function GroupForm({closeForm,formType,data}) {
    const groupDataTemplate = {
        id: '',
        name: '',
        type: '',
        access: 'PUBLIC',
        description: ''
    }
    const [formData, setFormData] = useState(formType === 'add' ? groupDataTemplate : data);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        if (formType === 'add') {
            if (sendHttpRequestAddGroup())
                closeForm();
        } else {
            if (sendHttpRequestEditGroup())
                closeForm();
        }
    };

    const sendHttpRequestAddGroup = () => {
        axios.post("http://localhost:8080/api/group", formData)
            .then(() => {
                alert("Thêm nhóm thành công");
            })
            .catch(() => {
                alert("Bị lỗi khi thêm nhóm, vui lòng thử lại");
                return false;
            })
        return true;
    }

    const sendHttpRequestEditGroup = () => {
        axios.put("http://localhost:8080/api/group/" + formData.id, formData)
            .then(() => {
                alert("Sửa thông tin nhóm thành công");
            })
            .catch(() => {
                alert("Bị lỗi khi sửa thông tin nhóm, vui lòng thử lại");
                return false;
            })
        return true;
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">{formType === 'add' ? 'Thêm nhóm' : 'Sửa thông tin nhóm'}</h5>
                                <button type="button" className="btn-close" onClick={closeForm}
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control" id="idInput" type="hidden" name="id"
                                       value={formData.id}/>
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Tên nhóm</label>
                                    <input className="form-control" id="nameInput" type="text" name="name"
                                           value={formData.name} onChange={handleChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="typeInput" className="form-label">Loại</label>
                                    <input className="form-control" id="typeInput" type="text" name="type"
                                           value={formData.type} onChange={handleChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="accessInput" className="form-label">Quyền truy cập</label>
                                    <select className="form-control" id="accessInput" name="access"
                                            value={formData.access} onChange={handleChange} required>
                                        <option value={"PUBLIC"}>Công khai</option>
                                        <option value={"PRIVATE"}>Riêng tư</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descriptionInput" className="form-label">Mô tả</label>
                                    <textarea className="form-control" id="descriptionInput" name="description"
                                              value={formData.description} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                    Gửi
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={closeForm}>
                                    Đóng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupForm from "../group/GroupForm";
import GroupList from "../group/GroupList.jsx";
import { FaPlus, FaTachometerAlt } from "react-icons/fa";

const Sidebar = ({ onGroupCreated, onGroupSelected, onBoardCreated, onShowAllBoards }) => {
    const groups = useSelector((state) => state.groups.list);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column p-3 bg-light" style={{ width: "250px", top: "64px", left: "0" }}>
            <ul className="nav nav-pills flex-column mb-3">
                <li className="nav-item">
                    <button className="nav-link d-flex align-items-center" onClick={onShowAllBoards}>
                        <FaTachometerAlt className="me-2" /> Bảng
                    </button>
                </li>
            </ul>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Nhóm người dùng</span>
                <button className="btn btn-primary btn-sm" onClick={() => setIsGroupModalOpen(true)}>
                    <FaPlus />
                </button>
            </div>

            {/* Modal thêm nhóm */}
            {isGroupModalOpen && (
                <GroupForm closeForm={() => setIsGroupModalOpen(false)} formType="add" data={null} onGroupCreated={onGroupCreated} />
            )}

            {/* Danh sách nhóm */}
            <GroupList onItemClick={onGroupSelected} onBoardCreated={onBoardCreated} />
        </div>
    );
};

export default Sidebar;
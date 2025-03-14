import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col, Toast, ToastContainer } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";
import TopMenu from "../../components/topmenu/TopMenu.jsx"; // Import TopMenu

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [boards, setBoards] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [selectedGroupName, setSelectedGroupName] = useState("");

    useEffect(() => {
        fetchBoards(selectedGroup);
    }, [selectedGroup]);

    const fetchBoards = async (group) => {
        try {
            let url = "http://localhost:8080/api/boards";
            if (group) url += `?groupId=${group.id}`;

            const response = await axios.get(url);
            setBoards(response.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bảng:", error);
        }
    };

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setSelectedGroupName(group.name);
    };

    const handleShowAllBoards = () => {
        setSelectedGroup(null);
    };

    const handleBoardCreated = (newBoard) => {
        setBoards((prevBoards) => [...prevBoards, newBoard]);
        addNotification(`Đã tạo bảng: ${newBoard.name}`);
        showToastMessage(`Bảng "${newBoard.name}" đã được tạo thành công!`);
    };

    const handleGroupCreated = (newGroup) => {
        addNotification(`Đã tạo nhóm: ${newGroup.name}`);
        showToastMessage(`Nhóm "${newGroup.name}" đã được tạo thành công!`);
    };

    const addNotification = (message) => {
        setNotifications((prev) => [message, ...prev]);
        setNotificationCount((prev) => prev + 1);
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    return (
        <div className="vh-100 d-flex flex-column">
            <TopMenu
                toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                notificationCount={notificationCount}
                setNotificationCount={setNotificationCount}
                notifications={notifications}
            />

            <Row className="flex-grow-1 g-0">
                <Col xs={12} md={3} lg={2} className={`bg-light ${drawerOpen ? "d-block" : "d-none d-md-block"}`} style={{ height: "100vh", overflowY: "auto" }}>
                    <Sidebar
                        open={drawerOpen}
                        toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                        onGroupCreated={handleGroupCreated}
                        onGroupSelected={handleGroupClick}
                        onShowAllBoards={handleShowAllBoards}
                        onBoardCreated={handleBoardCreated}
                    />
                </Col>

                <Col xs={12} md={9} lg={10} className="p-3 d-flex flex-column">
                    {selectedGroupName && <h5 className="mb-3">Tên nhóm: {selectedGroupName}</h5>}
                    <Outlet context={{ boards, groupId: selectedGroup ? selectedGroup.id : null, onBoardCreated: handleBoardCreated }} />
                </Col>
            </Row>

            <ToastContainer position="bottom-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Thông báo</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Dashboard;

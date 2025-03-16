import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {Row, Col, Toast, ToastContainer} from "react-bootstrap";
import Sidebar from "../../components/layout/Sidebar.jsx";
import TopMenu from "../../components/layout/TopMenu.jsx"; // Import TopMenu

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleShowAllBoards = () => {
    };

    const handleBoardCreated = (newBoard) => {
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
                <Col xs={12} md={3} lg={2} className={`bg-light ${drawerOpen ? "d-block" : "d-none"}`}
                     style={{height: "100vh", overflowY: "auto"}}>
                    <Sidebar
                        open={drawerOpen}
                        toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                        onGroupCreated={handleGroupCreated}
                        onShowAllBoards={handleShowAllBoards}
                        onBoardCreated={handleBoardCreated}
                    />
                </Col>

                <Col xs={12} md={9} lg={10} className="p-3 d-flex flex-column">
                    <Outlet/>
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

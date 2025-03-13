import React, {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {Container, Row, Col, Navbar, Nav, Button, Badge, Dropdown, Toast, ToastContainer} from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";
import {FaBars, FaBell, FaUser} from "react-icons/fa";

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
        setBoards((prevBoards) => [...prevBoards, newBoard]); // ✅ Cập nhật ngay lập tức
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
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
                <Container fluid>
                    <Button variant="outline-light" onClick={() => setDrawerOpen(!drawerOpen)}>
                        <FaBars/>
                    </Button>
                    <Navbar.Brand className="ms-2">WorkMG</Navbar.Brand>
                    <Nav className="ms-auto d-flex align-items-center">
                        <Dropdown align="end" onToggle={(isOpen) => isOpen && setNotificationCount(0)}>
                            <Dropdown.Toggle variant="outline-light">
                                {notificationCount > 0 && <Badge bg="danger">{notificationCount}</Badge>}
                                <FaBell className="ms-2" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <Dropdown.Item key={index}>{notification}</Dropdown.Item>
                                    ))
                                ) : (
                                    <Dropdown.Item disabled>Không có thông báo</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>


                        <Button variant="outline-light" className="ms-3">
                            <FaUser/>
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Row className="flex-grow-1 g-0">
                <Col xs={12} md={3} lg={2} className={`bg-light ${drawerOpen ? "d-block" : "d-none d-md-block"}`}
                     style={{height: "100vh", overflowY: "auto"}}>
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
                    <Outlet context={{
                        boards,
                        groupId: selectedGroup ? selectedGroup.id : null,
                        onBoardCreated: handleBoardCreated
                    }}/>
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

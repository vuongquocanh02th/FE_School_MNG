import React from "react";
import { Container, Navbar, Nav, Button, Badge, Dropdown } from "react-bootstrap";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopMenu = ({ toggleDrawer, notificationCount, setNotificationCount, notifications }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Guest";

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Xóa token khỏi localStorage
        navigate("/login"); // Chuyển về trang đăng nhập
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Container fluid>
                <Button variant="outline-light" onClick={toggleDrawer}>
                    <FaBars />
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

                    {/* Menu Người Dùng */}
                    <Dropdown align="end" className="ms-3">
                        <Dropdown.Toggle variant="outline-light">
                            <FaUser />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item disabled>{username}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TopMenu;

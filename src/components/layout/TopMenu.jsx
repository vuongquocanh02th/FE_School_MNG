import React from "react";
import { Container, Navbar, Button, Badge, Dropdown, Image } from "react-bootstrap";
import { FaBars, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopMenu = ({ toggleDrawer, notificationCount, setNotificationCount, notifications }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Guest";
    const avatarUrl = localStorage.getItem("avatar");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("avatar");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const toHome = () => {
        navigate("/dashboard/home");
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Container fluid>
                <Button variant="outline-light" onClick={toggleDrawer}>
                    <FaBars />
                </Button>
                <Navbar.Brand className="ms-2" onClick={toHome} style={{ cursor: "pointer" }}>WorkMG</Navbar.Brand>
                <Navbar className="ms-auto d-flex align-items-center">
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

                    <Dropdown align="end" className="ms-3">
                        <Dropdown.Toggle variant="outline-light" className="d-flex align-items-center">
                            {avatarUrl ? (
                                <Image src={avatarUrl} roundedCircle width="30" height="30" alt="Avatar" />
                            ) : (
                                <div
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {username.charAt(0)}
                                </div>
                            )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item disabled>{username}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar>
            </Container>
        </Navbar>
    );
};

export default TopMenu;

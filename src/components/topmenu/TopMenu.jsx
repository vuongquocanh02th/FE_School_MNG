
import React from "react";
import { Container, Navbar, Nav, Button, Badge, Dropdown } from "react-bootstrap";
import { FaBars, FaBell, FaUser } from "react-icons/fa";

const TopMenu = ({ toggleDrawer, notificationCount, setNotificationCount, notifications }) => {
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

                    <Button variant="outline-light" className="ms-3">
                        <FaUser />
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TopMenu;

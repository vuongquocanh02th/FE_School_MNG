import React from "react";
import {Container, Navbar, Button, Dropdown, Image} from "react-bootstrap";
import {FaBars, FaBell} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../resources/axiosConfig.js";
import {LOGOUT} from "../../redux/auth/authAction.js";
import {TOGGLE_DRAWER} from "../../redux/dashboard/dashboardAction.js";

const TopMenu = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Guest";
    const avatarUrl = localStorage.getItem("avatar");
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout();
        dispatch({type: LOGOUT})
        navigate("/login");
    };

    const user = useSelector((state) => state.auth.user);
    const userId = user.id || localStorage.getItem("id");


    const handleProfileClick = () => {
            navigate(`/dashboard/users/${userId}`);
    };

    const toHome = () => {
        navigate("/dashboard/home");
    }

    const toggleDrawer = () => {
        dispatch({type: TOGGLE_DRAWER});
    }

    function handlePasswordClick() {
            navigate(`/dashboard/users/${userId}/change-password`);
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3 sticky-top">
            <Container fluid>
                <Button variant="outline-light" onClick={toggleDrawer}>
                    <FaBars/>
                </Button>
                <Navbar.Brand className="ms-2" onClick={toHome} style={{cursor: "pointer"}}>WorkMG</Navbar.Brand>
                <Navbar className="ms-auto d-flex align-items-center">
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="outline-light">
                            <FaBell className="ms-2"/>
                            {/*{notificationCount > 0 && <Badge bg="danger">{notificationCount}</Badge>}*/}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/*{notifications.length > 0 ? (*/}
                            {/*    notifications.map((notification, index) => (*/}
                            {/*        <Dropdown.Item key={index}>{notification}</Dropdown.Item>*/}
                            {/*    ))*/}
                            {/*) : (*/}
                            {/*    <Dropdown.Item disabled>Không có thông báo</Dropdown.Item>*/}
                            {/*)}*/}
                            <Dropdown.Item disabled>Không có thông báo</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown align="end" className="ms-3">
                        <Dropdown.Toggle variant="outline-light" className="d-flex align-items-center">
                            {avatarUrl ? (
                                <Image src={avatarUrl} roundedCircle width="30" height="30" alt="Avatar"/>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold text-uppercase"
                                    style={{ width: "25px", height: "25px" }}
                                >
                                    {username.charAt(0)}
                                </div>
                            )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item disabled>{username}</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handlePasswordClick}>Change password</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar>
            </Container>
        </Navbar>
    );
};

export default TopMenu;

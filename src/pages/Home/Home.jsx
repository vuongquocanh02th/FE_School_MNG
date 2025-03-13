import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="#home">WorkMG</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#products">Products</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#blog">Blog</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title="Menu"
                            id="basic-nav-dropdown"
                            show={showDropdown}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <NavDropdown.Item href="#products">Products</NavDropdown.Item>
                            <NavDropdown.Item href="#pricing">Pricing</NavDropdown.Item>
                            <NavDropdown.Item href="#blog">Blog</NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/login">
                            <Button variant="primary" className="ms-3">Login</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Home;


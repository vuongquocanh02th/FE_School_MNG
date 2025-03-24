import {Container, Navbar, Row} from "react-bootstrap";
import {List} from "../List/List.jsx";

export const BoardMain = () => {

    return (
        <div>
            <Navbar className="navbar navbar-expand-lg bg-info" style={{height: '50px'}}>
                <div className="container-fluid overflow-auto" style={{whiteSpace: 'nowrap'}}>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item d-inline-block text-center" style={{width: '50px'}}>
                            Quản lý công việc
                        </li>
                    </ul>
                </div>
            </Navbar>
            <Container className="w-100" style={{backgroundColor: 'wheat'}}>
                <Row className="overflow-x-scroll overflow-y-hidden" style={{flexWrap: 'nowrap', flexFlow: 'row', height: "580px"}}>
                    <List></List>
                </Row>
            </Container>
        </div>
    );
}
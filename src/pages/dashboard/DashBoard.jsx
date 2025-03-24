import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import Sidebar from "../../components/layout/Sidebar.jsx";
import TopMenu from "../../components/layout/TopMenu.jsx";
import {useDispatch, useSelector} from "react-redux";

//// Truyền dữ liệu giữa component bằng redux, đừng dùng properties
const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openDrawer = useSelector(state => state.dashboard.openDrawer);
    const form = useSelector(state => state.group.formType);

    return (
        <div className="vh-100 d-flex flex-column">
            <TopMenu/>

            <Row className="flex-grow-1 g-0">
                <Col xs={12} sm={6} md={4} lg={3} xl={2} className={`h-100 bg-dark-subtle position-fixed-xs ${openDrawer ? "d-block" : "d-none"}`}>
                    <Sidebar/>
                </Col>

                <Col sm={6} md={8} lg={9} xl={10} className="p-0 d-flex flex-column m-0 overflow-y-hidden overflow-x-auto">
                    <Outlet/>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;

import React from "react";
import {Outlet} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import Sidebar from "../../components/layout/Sidebar.jsx";
import TopMenu from "../../components/layout/TopMenu.jsx";
import {useSelector} from "react-redux";

//// Truyền dữ liệu giữa component bằng redux, đừng dùng properties
const Dashboard = () => {
    const openDrawer = useSelector(state => state.dashboard.openDrawer);

    return (
        <div className="vh-100 d-flex flex-column">
            <TopMenu/>

            <Row className="flex-grow-1 g-0">
                <Col xs={12} sm={6} md={4} lg={3} xl={2} className={`bg-light ${openDrawer ? "d-block" : "d-none"}`}>
                    <Sidebar/>
                </Col>

                <Col xs={12} md={9} lg={10} className="p-3 d-flex flex-column">
                    <Outlet/>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;

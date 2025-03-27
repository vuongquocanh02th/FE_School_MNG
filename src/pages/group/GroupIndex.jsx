import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Eye, Users, Table} from "react-feather";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GET_GROUP_INFO} from "../../redux/group/groupAction.js";
import {useParams} from "react-router";

const GroupIndex = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {groupId} = useParams();
    const location = useLocation();
    const basePath = `/dashboard/group/${groupId}/`;

    const [currentOption, setCurrentOption] = useState("");

    const groupInfo = useSelector(state => state.group.info);

    useEffect(() => {
        dispatch({type: GET_GROUP_INFO, payload: groupId});
        setCurrentOption(location.pathname.replace(basePath, ''));
    }, [dispatch, navigate, groupId, location.pathname, basePath])

    return (
        <Container fluid className="py-3">
            <h5 className="my-3">Tên nhóm: {groupInfo && groupInfo.name}</h5>
            <Container fluid className="py-3 px-0">
                <Button variant="outline-primary" className="me-3"
                        active={currentOption === "info"} inert={currentOption === "info"}
                        onClick={() => navigate(`/dashboard/group/${groupId}/info`)}>
                    <Eye size={20} className="me-1"/> Thông tin nhóm
                </Button>
                <Button variant="outline-primary" className="me-3"
                        active={currentOption === "member"} inert={currentOption === "member"}
                        onClick={() => navigate(`/dashboard/group/${groupId}/member`)}>
                    <Users size={20} className="me-1"/> Thành viên
                </Button>
                <Button variant="outline-primary" className="me-3"
                        active={currentOption === "board"} inert={currentOption === "board"}
                        onClick={() => navigate(`/dashboard/group/${groupId}/board`)}>
                    <Table size={20} className="me-1"/> Bảng
                </Button>
            </Container>
            <hr/>
            <Outlet/>
        </Container>
    );
};

export default GroupIndex;
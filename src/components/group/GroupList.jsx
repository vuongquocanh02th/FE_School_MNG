import {useEffect} from "react";
import {ListGroup, Badge} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {GET_GROUP_INFO, GET_GROUP_LIST, RESET_GROUP} from "../../redux/group/groupAction.js";
import {useParams} from "react-router";
import {toast} from "react-toastify";

export default function GroupList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const groupList = useSelector(state => state.group.list);
    const success = useSelector(state => state.group.success);
    const {groupId} = useParams();

    useEffect(() => {
        dispatch({type: GET_GROUP_LIST});
        switch (success) {
            case "add":
                toast("Thêm nhóm thành công");
                break;
            case "edit":
                toast("Sửa nhóm thành công");
                dispatch({type: GET_GROUP_INFO, payload: groupId});
                break;
            case "delete":
                toast("Xóa nhóm thành công");
                navigate("/dashboard/home");
                break;
        }
        dispatch({type: RESET_GROUP});
    }, [dispatch, navigate, success, groupId]);

    useEffect(() => {
    }, [groupList, groupId])

    const onGroupClick = (group) => {
        navigate("/dashboard/group/" + group.id);
    }

    return (
        <ListGroup>
            {groupList.map((item) => (
                <ListGroup.Item className="d-flex align-items-center"
                                key={item.id} action active={groupId === item.id.toString()}
                                onClick={() => {
                                    onGroupClick(item);
                                }}
                >
                    <Badge bg="primary" className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                           style={{width: '40px', height: '40px', fontSize: '1.2rem'}}>
                        {item.name.charAt(0)}
                    </Badge>
                    <span>{item.name}</span>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

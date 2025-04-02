import {Button, Form} from "react-bootstrap";
import {MoreVertical} from "react-feather";
import React, {useState} from "react";
import {UPDATE_LIST_REQUEST} from "../../redux/list/listAction.js";
import {useDispatch} from "react-redux";
import {ListMenu} from "./ListMenu.jsx";

const listTitleStyle = {
    alignContent: "center",
    flexShrink: 1,
    flexGrow: 1,
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
}

export const ListTitle = ({list}) => {
    const dispatch = useDispatch();
    const [editList, setEditList] = useState(null);
    const [editListName, setEditListName] = useState("");

    const handleEditList = (list) => {
        if (!editListName.trim()) return;
        list = {...list, name: editListName}
        dispatch({type: UPDATE_LIST_REQUEST, payload: list})
        closeEditList();
    };

    const openEditList = (list) => () => {
        setEditList(list.id);
        setEditListName(list.name);
    };

    const closeEditList = () => {
        setEditList(null);
    };

    return (
        <div className="p-1 d-flex justify-content-between">
            {editList === list.id ? (
                    <Form.Control
                        type="text"
                        value={editListName}
                        autoFocus
                        placeholder="Nhập tên danh sách..."
                        onChange={(e) => setEditListName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleEditList(list)}
                        onBlur={closeEditList}
                        style={{fontSize: "14px", padding: "8px", borderRadius: "5px"}}
                    />
                ) :
                <h5 style={listTitleStyle}
                    onClick={openEditList(list)}
                >
                    {list.name}
                </h5>
            }
            <ListMenu listId={list.id}/>
            {/*<Button variant="link" style={{padding: 0}}>*/}
            {/*    <MoreVertical size={24}/>*/}
            {/*</Button>*/}
        </div>
    )
}
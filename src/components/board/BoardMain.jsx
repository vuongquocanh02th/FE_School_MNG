import {Button, Container, Form, Modal, Navbar, Row} from "react-bootstrap";
import {List} from "../List/List.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Edit} from "react-feather";
import React, {useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {EDIT_BOARD_NAME} from "../../redux/board/boardAction.js";

export const BoardMain = () => {
    const dispatch = useDispatch();
    const board = useSelector(state => state.board.details);
    const [openForm, setOpenForm] = useState(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required("Tên bảng không được để trống")
    });

    const handleOpenForm = () => {
        setOpenForm(true)
    }

    const handleCloseForm = () => {
        setOpenForm(false);
    }

    const handleEditBoardName = (data) => {
        dispatch({type: EDIT_BOARD_NAME, payload: {...board, name: data.name}})
        handleCloseForm();
    }

    const formik = useFormik ({
        initialValues: {name: board.name},
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: handleEditBoardName,
    })

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Navbar className="navbar navbar-expand-lg bg-info" style={{height: '50px'}}>
                <div className="container-fluid overflow-auto" style={{whiteSpace: 'nowrap'}}>
                    <ul className="navbar-nav flex-row">
                        <li>
                            <Button variant="link" style={{padding: 0}} onClick={handleOpenForm}>
                                <Edit color="black" size={24}/>
                            </Button>
                        </li>
                        <li className="nav-item d-inline-block text-center">
                            <div className="py-1 px-2" style={{maxWidth: "200px", overflowX: "hidden"}}>
                                {board && board.name}
                            </div>
                        </li>
                    </ul>
                </div>
            </Navbar>
            <Container fluid className="w-100" style={{backgroundColor: 'wheat'}}>
                <Row className="overflow-x-scroll overflow-y-hidden"
                     style={{flexWrap: 'nowrap', flexFlow: 'row', height: "580px"}}>
                    <List></List>
                </Row>
            </Container>
            <Modal show={openForm} onHide={handleCloseForm} centered onExited={formik.handleReset}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa tên bảng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên..."
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.name && formik.touched.name && (
                                <div className="text-danger">{formik.errors.name}</div>)}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseForm}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                        Đổi tên
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
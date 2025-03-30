import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_BOARD, RESET_CREATE_BOARD_STATUS } from "../../redux/board/boardAction";

const BoardForm = ({ open, onClose, onBoardCreated, groupId }) => {
    const dispatch = useDispatch();
    const createSuccess = useSelector((state) => state.board.createSuccess);
    const createError = useSelector((state) => state.board.createError);

    useEffect(() => {
        if (createSuccess) {
            toast.success(`Bảng "${createSuccess.name}" đã được tạo!`);
            onBoardCreated?.(createSuccess);
            onClose();
            dispatch({ type: RESET_CREATE_BOARD_STATUS }); // reset sau khi tạo thành công
        }
    }, [createSuccess, dispatch, onBoardCreated, onClose]);

    useEffect(() => {
        if (createError) {
            toast.error("Lỗi khi tạo bảng, vui lòng thử lại!");
        }
    }, [createError]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(3, "Tiêu đề phải có ít nhất 3 ký tự")
            .max(50, "Tiêu đề không được quá 50 ký tự")
            .required("Vui lòng nhập tiêu đề")
    });

    const handleCreateBoard = (values, { setSubmitting, resetForm }) => {
        if (!groupId) return;
        dispatch({
            type: CREATE_BOARD,
            payload: {
                name: values.name.trim(),
                group_id: groupId,
                created_by: 1,
            },
        });
        setSubmitting(false);
        resetForm();
    };

    return (
        <Formik
            initialValues={{ name: "", type: "PRIVATE" }}
            validationSchema={validationSchema}
            onSubmit={handleCreateBoard}
        >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, resetForm }) => (
                <Modal show={open} onHide={onClose} centered onExited={resetForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo Bảng Mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label column="">Tiêu đề</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tiêu đề..."
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting || !groupId}>
                            {isSubmitting ? "Đang tạo..." : "Tạo Mới"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Formik>
    );
};

export default BoardForm;

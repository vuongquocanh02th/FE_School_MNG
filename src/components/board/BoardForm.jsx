import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

const BoardForm = ({ open, onClose, onBoardCreated, groupId }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(3, "Tiêu đề phải có ít nhất 3 ký tự")
            .max(50, "Tiêu đề không được quá 50 ký tự")
            .required("Vui lòng nhập tiêu đề"),
        type: Yup.string()
            .oneOf(["PRIVATE", "PUBLIC"], "Loại bảng không hợp lệ")
            .required("Vui lòng chọn loại bảng"),
    });

    const handleCreateBoard = async (values, { setSubmitting, resetForm }) => {
        if (!groupId) return;
        try {
            const data = {
                name: values.name,
                group_id: groupId,
                created_by: 1
            };
            console.log(data);

            // const response = await axios.post(`${apiDomain}/api/boards`, data);

            // if (onBoardCreated) {
            //     onBoardCreated(response.data);
            //     toast.success(`Bảng "${response.data.name}" đã được tạo!`);
            // }
            handleClose(resetForm);
        } catch (error) {
            console.error("Lỗi khi tạo bảng:", error.response?.data || error.message);
            toast.error("Lỗi khi tạo bảng, vui lòng thử lại!");
        }
        setSubmitting(false);
    };

    const handleClose = (resetForm) => {
        resetForm();
        onClose();
    };

    return (
        <Formik
            initialValues={{ name: "", type: "private" }}
            validationSchema={validationSchema}
            onSubmit={handleCreateBoard}
        >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, resetForm }) => (
                <Modal show={open} onHide={() => handleClose(resetForm)} centered>
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
                            <Form.Group className="mb-3">
                                <Form.Label column="">Loại bảng</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.type && !!errors.type}
                                >
                                    <option value="PRIVATE">Riêng tư</option>
                                    <option value="PUBLIC">Công khai</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleClose(resetForm)}>
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

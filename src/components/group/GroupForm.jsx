import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";

export default function GroupForm({ closeForm, formType, data, onGroupCreated }) {
    const groupDataTemplate = {
        id: "",
        name: "",
        type: "",
        access: "PUBLIC",
        description: "",
    };

    const initialValues = formType === "add" ? groupDataTemplate : data;

    const validationSchema = Yup.object({
        name: Yup.string().required("Tên nhóm không được để trống"),
        type: Yup.string().required("Loại nhóm không được để trống"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            let response;
            if (formType === "add") {
                response = await axios.post("http://localhost:8080/api/group", values);
            } else {
                response = await axios.put(`http://localhost:8080/api/group/${values.id}`, values);
            }
            onGroupCreated(response?.data);
        } catch (error) {
            console.error("Lỗi khi xử lý nhóm:", error);
        } finally {
            setSubmitting(false);
            closeForm();
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, handleChange, values }) => (
                <FormikForm>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên nhóm</Form.Label>
                        <Field
                            name="name"
                            type="text"
                            className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                            onChange={handleChange}
                            value={values.name}
                        />
                        {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Loại</Form.Label>
                        <Field
                            name="type"
                            type="text"
                            className={`form-control ${touched.type && errors.type ? "is-invalid" : ""}`}
                            onChange={handleChange}
                            value={values.type}
                        />
                        {touched.type && errors.type && <div className="invalid-feedback">{errors.type}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Truy cập</Form.Label>
                        <Field
                            as="select"
                            name="access"
                            className="form-select"
                            onChange={handleChange}
                            value={values.access}
                        >
                            <option value="PUBLIC">Công khai</option>
                            <option value="PRIVATE">Riêng tư</option>
                        </Field>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Field
                            as="textarea"
                            name="description"
                            rows={3}
                            className="form-control"
                            onChange={handleChange}
                            value={values.description}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={closeForm} className="me-2">Đóng</Button>
                        <Button variant="primary" type="submit">{formType === "add" ? "Thêm" : "Sửa"}</Button>
                    </div>
                </FormikForm>
            )}
        </Formik>
    );
}

import React, {useEffect} from "react";
import { Button, Form } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {ADD_GROUP, CLOSE_GROUP_FORM} from "../../redux/group/groupAction.js";
import {toast} from "react-toastify";

export default function GroupForm() {
    const dispatch = useDispatch();
    const success = useSelector(state => state.group.success);
    const formType = useSelector(state => state.group.formType);

    const groupDataTemplate = {
        id: "",
        name: "",
        type: "",
        access: "PUBLIC",
        description: "",
    };

    useEffect(() => {
        if (success.name) {
            toast.success(`Thêm nhóm ${success.name} thành công`);
            dispatch({type: CLOSE_GROUP_FORM});
        }
    }, [dispatch, success])

    const initialValues = formType === "add" ? groupDataTemplate : "";

    const validationSchema = Yup.object({
        name: Yup.string().required("Tên nhóm không được để trống"),
        type: Yup.string().required("Loại nhóm không được để trống"),
    });

    const handleSubmit = async (values) => {
        if (formType === "add") {
            dispatch({type: ADD_GROUP, payload: values});
        }
    };

    const closeForm = () => {
        dispatch({type: CLOSE_GROUP_FORM})
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, handleChange, values }) => (
                <FormikForm>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Tên nhóm</Form.Label>
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
                        <Form.Label column="">Loại</Form.Label>
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
                        <Form.Label column="">Truy cập</Form.Label>
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
                        <Form.Label column="">Mô tả</Form.Label>
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

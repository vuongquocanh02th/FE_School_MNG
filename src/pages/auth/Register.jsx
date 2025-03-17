import React, {useEffect} from 'react';
import {Container, Card, Form, Button} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_RESET, REGISTER} from "../../redux/auth/authAction.js";
import {toast} from "react-toastify";

export default function Register() {
    const formDataTemplate = {
        username: '', email: '', password: '', confirmPassword: ''
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const success = useSelector(state => state.auth.success);
    const error = useSelector(state => state.auth.error);

    const registerSchema = Yup.object({
        username: Yup.string()
            .max(30, "Username không được quá 30 ký tự")
            .matches(/^[a-zA-Z ]*$/, "Username không được chứa số hoặc ký tự đặc biệt")
            .required("Vui lòng nhập tên"), password: Yup.string()
            .min(6, "Mật khẩu phải tối thiểu 6 ký tự")
            .required("Vui lòng nhập mật khẩu"), email: Yup.string()
            .matches(/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "email phải đúng định dạng")
            .required("Vui lòng nhập email"), confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không chính xác')
            .required("Vui lòng nhập lại mật khẩu")
    });

    const handleSubmit = async (data) => {
        dispatch({type: REGISTER, payload: data});
    };

    const switchForm = () => {
        navigate("/login");
    }

    const formik = useFormik({
        initialValues: formDataTemplate,
        validationSchema: registerSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    })

    useEffect(() => {
        if (success) {
            navigate("/login");
        }
        if (error) {
            toast.error(error);
            formik.setSubmitting(false);
            dispatch({type: AUTH_RESET});
        }
    }, [dispatch, success, error, navigate, formik]);

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 w-100 bg-primary"
                   style={{backgroundColor: '#0077be'}}>
            <Card className="p-4 shadow-lg" style={{width: '100%', maxWidth: '400px'}}>
                <h3 className="text-center mb-4">Đăng ký</h3>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Tên tài khoản</Form.Label>
                        <Form.Control type="text" id="username" className="form-control" placeholder="name"
                                      name="username"
                                      value={formik.values.username} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.username && formik.touched.username && (
                            <div className="text-danger">{formik.errors.username}</div>)}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Email</Form.Label>
                        <Form.Control type="email" id="email" className="form-control"
                                      placeholder="example@gmail.com" name="email"
                                      value={formik.values.email} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-danger">{formik.errors.email}</div>)}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Mật khẩu</Form.Label>
                        <Form.Control type="password" id="password" className="form-control" placeholder="password"
                                      name="password"
                                      value={formik.values.password} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className="text-danger">{formik.errors.password}</div>)}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Xác nhận mật khẩu</Form.Label>
                        <Form.Control type="password" id="confirmPassword" className="form-control"
                                      placeholder=" confirm password" name="confirmPassword"
                                      value={formik.values.confirmPassword} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <div className="text-danger">{formik.errors.confirmPassword}</div>)}
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100">
                        Đăng ký
                    </Button>
                    <p className="mt-3 text-center">Đã có tài khoản?
                        <a className="" style={{cursor: "pointer"}} onClick={switchForm}>
                            Đăng nhập
                        </a>
                    </p>
                </Form>
            </Card>
        </Container>
    );
}
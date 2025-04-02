import React, {useEffect, useState} from 'react';
import {Container, Card, Form, Button} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_RESET, REGISTER} from "../../redux/auth/authAction.js";
import {toast} from "react-toastify";
import {Eye, EyeOff} from 'lucide-react';  // Thêm icon

export default function Register() {
    const formDataTemplate = {
        username: '', email: '', password: '', confirmPassword: ''
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const success = useSelector(state => state.auth.success);
    const error = useSelector(state => state.auth.error);

    const registerSchema = Yup.object({
        username: Yup.string()
            .max(30, "Username không được quá 30 ký tự")
            .matches(/^[a-zA-Z ]*$/, "Username không được chứa số hoặc ký tự đặc biệt")
            .required("Vui lòng nhập tên"),
        password: Yup.string()
            .min(6, "Mật khẩu phải tối thiểu 6 ký tự")
            .required("Vui lòng nhập mật khẩu"),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email phải đúng định dạng")
            .required("Vui lòng nhập email"),
        confirmPassword: Yup.string()
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
    });

    useEffect(() => {
        if (success) {
            dispatch({type: AUTH_RESET});
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
                        <Form.Label>Tên tài khoản</Form.Label>
                        <Form.Control type="text" placeholder="name"
                                      name="username"
                                      value={formik.values.username}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.username && formik.touched.username && (
                            <div className="text-danger">{formik.errors.username}</div>)}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@gmail.com" name="email"
                                      value={formik.values.email} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-danger">{formik.errors.email}</div>)}
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                top: '38px',
                                right: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <div className="text-danger">{formik.errors.password}</div>)}
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="confirm password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                top: '38px',
                                right: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </div>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <div className="text-danger">{formik.errors.confirmPassword}</div>)}
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100">Đăng ký</Button>
                    <p className="mt-3 text-center">Đã có tài khoản?
                        <a className="" style={{cursor: "pointer"}} onClick={switchForm}>
                            &nbsp;Đăng nhập
                        </a>
                    </p>
                </Form>
            </Card>
        </Container>
    );
}

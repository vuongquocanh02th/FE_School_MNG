import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, Form, Button} from "react-bootstrap";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {apiDomain, saveUserInfo} from "../../resources/axiosConfig.js";

export default function AuthForm(props) {
    const LOGINTYPE = 'LOGIN';
    const REGISTERTYPE = 'REGISTER';

    const formDataTemplate = {
        username: '', email: '', password: '', confirmPassword: ''
    };

    const [formType, setFormType] = useState(props.type);
    const navigate = useNavigate();

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

    const handleSubmit = async () => {
        if (formType === 'LOGIN') {
            const success = await sendHttpRequestLogin(formik.values);
            if (success) {
                navigate("/dashboard/home");
            }
        } else {
            const success = await sendHttpRequestRegister(formik.values);
            if (success) {
                switchForm();
            }
        }
    };

    const sendHttpRequestLogin = async (data) => {
        try {
            const res = await axios.post(`${apiDomain}/auth/login`, data);
            alert("Đăng nhập thành công");
            saveUserInfo(res.data);
            return true;
        } catch (err) {
            alert(err.response.data);
            return false;
        }
    };

    const sendHttpRequestRegister = async (data) => {
        try {
            await axios.post(`${apiDomain}/auth/register`, data);
            alert("Đăng ký thành công");
            return true;
        } catch (err) {
            alert(err.response.data);
            return false;
        }
    };

    const switchForm = () => {
        formik.resetForm();
        if (formType === 'LOGIN') {
            setFormType(REGISTERTYPE);
            navigate("/register");
        } else {
            setFormType(LOGINTYPE);
            navigate("/login");
        }
    }

    const formik = useFormik({
        initialValues: formDataTemplate,
        validationSchema: formType === LOGINTYPE ? null : registerSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    })

    return (<Container fluid className="d-flex align-items-center justify-content-center vh-100 w-100 bg-primary"
                       style={{backgroundColor: '#0077be'}}>
            <Card className="p-4 shadow-lg" style={{width: '100%', maxWidth: '400px'}}>
                <h3 className="text-center mb-4">
                    {formType !== LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                </h3>
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
                    {formType !== LOGINTYPE ? <Form.Group className="mb-3">
                        <Form.Label column="">Email</Form.Label>
                        <Form.Control type="email" id="email" className="form-control"
                                      placeholder="example@gmail.com" name="email"
                                      value={formik.values.email} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-danger">{formik.errors.email}</div>)}
                    </Form.Group> : ""}
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
                    {formType !== LOGINTYPE ? <Form.Group className="mb-3">
                        <Form.Label column="">Xác nhận mật khẩu</Form.Label>
                        <Form.Control type="password" id="confirmPassword" className="form-control"
                                      placeholder=" confirm password" name="confirmPassword"
                                      value={formik.values.confirmPassword} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <div className="text-danger">{formik.errors.confirmPassword}</div>)}
                    </Form.Group> : ""}
                    <Button type="submit" className="btn btn-primary w-100">
                        {formType !== LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                    </Button>
                    <p className="mt-3 text-center">
                        {formType === LOGINTYPE ? "Chưa có" : "Đã có"}{' tài khoản? '}
                        <a className="" style={{cursor: "pointer"}} onClick={switchForm}>
                            {formType === LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                        </a>
                    </p>
                </Form>
            </Card>
        </Container>);
}
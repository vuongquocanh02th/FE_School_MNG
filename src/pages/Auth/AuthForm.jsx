import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AuthForm() {
    const LOGINTYPE = "LOGIN";
    const REGISTERTYPE = "REGISTER";
    const [formType, setFormType] = useState(LOGINTYPE);
    const navigate = useNavigate(); // Khai báo useNavigate

    const switchForm = () => {
        setFormType(formType === LOGINTYPE ? REGISTERTYPE : LOGINTYPE);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const url = formType === LOGINTYPE ? "/auth/login" : "/auth/register";
            await axios.post(`http://localhost:8080${url}`, values);
            alert(`${formType === LOGINTYPE ? "Đăng nhập" : "Đăng ký"} thành công!`);

            if (formType === LOGINTYPE) {
                navigate("/dashboard/home"); // Điều hướng sau khi đăng nhập
            }
        } catch (error) {
            alert(error.response?.data || "Có lỗi xảy ra!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 w-100 bg-primary">
            <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">{formType === LOGINTYPE ? "Đăng nhập" : "Đăng ký"}</h3>
                <Formik
                    initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            {formType === REGISTERTYPE && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3">
                                <Form.Label>Tên tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Nhập tên tài khoản"
                                    value={values.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {formType === REGISTERTYPE && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            )}
                            <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
                                {formType === LOGINTYPE ? "Đăng nhập" : "Đăng ký"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className="mt-3 text-center">
                    {formType === LOGINTYPE ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                    <span className="text-primary" style={{ cursor: "pointer" }} onClick={switchForm}>
                        {formType === LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                    </span>
                </p>
            </Card>
        </Container>
    );
}
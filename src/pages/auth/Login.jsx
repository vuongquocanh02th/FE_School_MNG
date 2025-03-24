import {useFormik} from "formik";
import {saveUserInfo} from "../../resources/axiosConfig.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_RESET, LOGIN} from "../../redux/auth/authAction.js";

function Login() {
    const formDataTemplate = {
        username: '', password: ''
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const success = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (data) => {
        dispatch({type: LOGIN, payload: data});
    };

    const formik = useFormik({
        initialValues: formDataTemplate,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    })

    const switchForm = () => {
        navigate("/register");
    }

    useEffect(() => {
        if (success.name) {
            saveUserInfo(success);
            navigate("/dashboard/home");
        }
        if (error) {
            toast.error(error);
            formik.setSubmitting(false);
            dispatch({type: AUTH_RESET});
        }
    }, [success, error, navigate, formik, dispatch]);

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 w-100 bg-primary"
                   style={{backgroundColor: '#0077be'}}>
            <Card className="p-4 shadow-lg" style={{width: '100%', maxWidth: '400px'}}>
                <h3 className="text-center mb-4">Đăng nhập</h3>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Tên tài khoản</Form.Label>
                        <Form.Control type="text" id="username" className="form-control" placeholder="name"
                                      name="username"
                                      value={formik.values.username} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column="">Mật khẩu</Form.Label>
                        <Form.Control type="password" id="password" className="form-control" placeholder="password"
                                      name="password"
                                      value={formik.values.password} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100">Đăng nhập</Button>
                    <p className="mt-3 text-center">Chưa có tài khoản?
                        <a className="" style={{cursor: "pointer"}} onClick={switchForm}>
                            Đăng ký
                        </a>
                    </p>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;
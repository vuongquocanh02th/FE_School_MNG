import {useFormik} from "formik";
import {saveUserInfo} from "../../resources/axiosConfig.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_RESET, LOGIN} from "../../redux/auth/authAction.js";
import {Eye, EyeOff} from 'lucide-react'; // Thêm icon từ lucide-react (nếu bạn đã cài)

function Login() {
    const formDataTemplate = {
        username: '', password: ''
    };

    const [showPassword, setShowPassword] = useState(false);
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
        if (success && success.name) {
            saveUserInfo(success);
            localStorage.setItem("userId", success.id);
            localStorage.setItem("userName", success.name);
            localStorage.setItem("userEmail", success.email);
            toast.success("Đăng nhập thành công");
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
                        <Form.Label>Tên tài khoản</Form.Label>
                        <Form.Control type="text" id="username" placeholder="name" name="username"
                                      value={formik.values.username} onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            id="password"
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
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100">Đăng nhập</Button>
                    <p className="mt-3 text-center">Chưa có tài khoản?
                        <a className="" style={{cursor: "pointer"}} onClick={switchForm}>
                            &nbsp;Đăng ký
                        </a>
                    </p>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;

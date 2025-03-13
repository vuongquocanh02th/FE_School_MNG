import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from 'yup';

export default function AuthForm() {
    const LOGINTYPE = 'LOGIN';
    const REGISTERTYPE = 'REGISTER';

    const formDataTemplate = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formType, setFormType] = useState(LOGINTYPE);

    const loginSchema = Yup.object({
        username: Yup.string()
            .max(30, "Username không được quá 30 ký tự")
            .matches(/^[a-zA-Z ]*$/, "Username không được chứa số hoặc ký tự đặc biệt")
            .required("Vui lòng nhập tên"),
        password: Yup.string()
            .min(6, "Mật khẩu phải tối thiểu 6 ký tự")
            .required("Vui lòng nhập mật khẩu"),
    })

    const registerSchema = Yup.object({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "email phải đúng định dạng")
            .required("Vui lòng nhập email"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không chính xác')
            .required("Vui lòng nhập lại mật khẩu")
    });

    const handleSubmit = () => {
        if (formType === 'LOGIN') {
            sendHttpRequestLogin(formik.values);
        } else {
            sendHttpRequestRegister(formik.values);
        }
    };

    const sendHttpRequestLogin = (data) => {
        axios.post("http://localhost:8080/auth/login", data)
            .then((res) => {
                alert("Đăng nhập thành công");
                console.log(res);
            })
            .catch((err) => {
                alert(err.response.data);
                console.log(err);
            })
    };

    const sendHttpRequestRegister = (data) => {
        axios.post("http://localhost:8080/auth/login", data)
            .then((res) => {
                alert("Đăng ký thành công");
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.response.data);
                console.log(err);
            })
    };

    const switchForm = () => {
        if (formType === 'LOGIN') {
            setFormType(REGISTERTYPE);
        } else {
            setFormType(LOGINTYPE);
        }
    }

    const formik = useFormik({
        initialValues: formDataTemplate,
        validationSchema: formType === LOGINTYPE ? loginSchema : registerSchema.concat(loginSchema),
        enableReinitialize: true,
        onSubmit: handleSubmit,
    })

    return (
        <div className="d-flex align-items-center justify-content-center vh-100"
             style={{backgroundColor: '#0077be'}}>
            <div className="card p-4 shadow-lg" style={{width: '100%', maxWidth: '400px'}}>
                <h3 className="text-center mb-4">
                    {formType !== LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                </h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên tài khoản</label>
                        <input type="text" id="username" className="form-control" placeholder="name" name="username"
                               value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        {formik.errors.username && formik.touched.username && (
                            <div className="text-danger">{formik.errors.username}</div>
                        )}
                    </div>
                    {formType !== LOGINTYPE ?
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" className="form-control" placeholder="example@gmail.com" name="email"
                                   value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <div className="text-danger">{formik.errors.email}</div>
                            )}
                        </div> : ""
                    }
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" id="password" className="form-control" placeholder="password" name="password"
                               value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}
                    </div>
                    {formType !== LOGINTYPE ?
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                            <input type="password" id="confirmPassword" className="form-control" placeholder=" confirm password" name="confirmPassword"
                                   value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <div className="text-danger">{formik.errors.confirmPassword}</div>
                            )}
                        </div> : ""
                    }
                    <button type="submit" className="btn btn-primary w-100">
                        {formType !== LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                    </button>
                    <p className="mt-3 text-center">
                        {formType === LOGINTYPE ? "Chưa có" : "Đã có"}{' tài khoản? '}
                        <a className="" style={{cursor: "pointer"}} onClick={switchForm}>
                            {formType === LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
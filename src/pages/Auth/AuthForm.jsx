import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default function AuthForm() {
    const LOGINTYPE = 'LOGIN';
    const REGISTERTYPE = 'REGISTER';

    const formDataTemplate = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formType, setFormType] = useState("LOGIN");
    const [formData, setFormData] = useState(formDataTemplate);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'LOGIN') {
            sendHttpRequestLogin();
        } else {
            sendHttpRequestRegister();
        }
    };

    const sendHttpRequestLogin = () => {
        axios.post("http://localhost:8080/auth/login", formData)
            .then((res) => {
                alert("Đăng nhập thành công");
                console.log(res);
            })
            .catch((err) => {
                alert(err.response.data);
                console.log(err);
            })
    };

    const sendHttpRequestRegister = () => {
        axios.post("http://localhost:8080/auth/login", formData)
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
        setFormData(formDataTemplate);
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100"
             style={{backgroundColor: '#0077be'}}>
            <div className="card p-4 shadow-lg" style={{width: '100%', maxWidth: '400px'}}>
                <h3 className="text-center mb-4">
                    {formType !== LOGINTYPE ? "Đăng ký" : "Đăng nhập"}
                </h3>
                <form>
                    <div className="mb-3" hidden={formType === LOGINTYPE}>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" className="form-control" placeholder="example@gmail.com"
                               name="email"
                               value={formData.email} onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên tài khoản</label>
                        <input type="text" id="username" className="form-control" placeholder="name"
                               name="username"
                               value={formData.username} onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" id="password" className="form-control" placeholder="password"
                               name="password"
                               value={formData.password} onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-3" hidden={formType === LOGINTYPE}>
                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                        <input type="password" id="confirmPassword" className="form-control"
                               placeholder=" confirm password"
                               name="confirmPassword"
                               value={formData.confirmPassword} onChange={handleChange} required
                        />
                    </div>
                    <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
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
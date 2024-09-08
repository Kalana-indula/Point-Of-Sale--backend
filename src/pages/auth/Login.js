import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidPrompt, setInvalidPrompt] = useState('');

    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    useEffect(() => {
        if ((username === '') && (password === '')) {
            setInvalidPrompt('');
        }
    }, [username, password]);


    //Verifying user by entered username and password
    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            "username": username,
            "password": password
        }

        try {
            const response = await axios.post(`http://localhost:8080/auth/login`, loginData);

            if (response.status === 200) {
                console.log(response.data);
                //Storing token in local storage
                localStorage.setItem("token", response.data);

                //Use the generated token as the default token for axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                navigate("/");

                //reload the site after login
                window.location.reload();
            } else {
                console.log("Login Error");
            }
        } catch (error) {
            setInvalidPrompt("Invalid User Details");
            console.log(error.message);
        }
    }

    const handleCancel = (event) => {

        event.preventDefault();

        setUsername('');
        setPassword('');
        setInvalidPrompt('');
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12">
                        <div className="login-body text-center">
                            <div className="login-title mt-2 mb-4">Login</div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control"
                                       id="loginUsernameField"
                                       placeholder="Username" onChange={handleUsername}
                                       onKeyDown={(event) => event.key === 'Enter' && handleLogin(event)}
                                       value={username}/>
                                <label htmlFor="loginUsernameField">Username</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control"
                                       id="loginPasswordField"
                                       placeholder="Password" onChange={handlePassword}
                                       onKeyDown={(event) => event.key === 'Enter' && handleLogin(event)}
                                       value={password}/>
                                <label htmlFor="loginPasswordField">Password</label>

                            </div>
                            {invalidPrompt && <div className="invalid-prompt text-danger mt-2 mb-2">
                                {invalidPrompt}
                            </div>}
                            <div className="button-section d-flex justify-content-center mt-3 mb-3">
                                <div>
                                    <button type="button" className="btn btn-primary mx-2"
                                            onClick={handleLogin}>Login
                                    </button>
                                </div>
                                <div>
                                    <button type="button"
                                            className="btn btn-outline-secondary mx-2"
                                            onClick={handleCancel}>Cancel
                                    </button>
                                </div>


                            </div>
                            <div className="form-text">
                                Click <span className="redirect-text"><Link
                                to={`/register-user`}>here</Link></span> to register
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
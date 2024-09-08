import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPrompt, setErrorPrompt] = useState('');

    const navigate = useNavigate();

    //Fetch username from text field
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    //Fetch email from text field
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    //Fetch password from text field
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    //Fetch confirm password from text field
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }


    //Create a user as 'Add User' button is clicked
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Set error message if passwords are not matching
        if (password !== confirmPassword) {
            setErrorPrompt("Passwords are not matching");
        }

        if (password === confirmPassword) {
            const userData = {
                "username": username,
                "email": email,
                "password": password
            }

            try {
                const response = await axios.post(`http://localhost:8080/auth/register`, userData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);

                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErrorPrompt('');

                if (response.status === 200) {
                    navigate("/login/user");
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log("Mismatch of password");
        }

    }

    //Clear all fields as 'Cancel' button clicked
    const handleCancel = (event) => {
        event.preventDefault();

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12">
                        <div className="register-body text-center">
                            <div className="register-title mt-2 mb-4">Register User</div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput"
                                           onChange={handleUsername} value={username} required={true}
                                           placeholder="username"/>
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput"
                                           placeholder="name@example.com" onChange={handleEmail}
                                           value={email} required={true}/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control"
                                           id="floatingPassword" placeholder="Password"
                                           onChange={handlePassword} value={password} required={true}/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control"
                                           id="floatingPassword" placeholder="Password"
                                           onChange={handleConfirmPassword} value={confirmPassword}
                                           required={true}/>
                                    <label htmlFor="floatingPassword">Confirm Password</label>
                                </div>
                                {errorPrompt &&
                                    <div className="missmatch-prompt text-danger">{errorPrompt}</div>}
                                <div className="button-section d-flex justify-content-center mt-3">
                                    <button type="submit"
                                            className="btn btn-primary mx-2 mt-2">
                                        Add User
                                    </button>
                                    <button type="button"
                                            className="btn btn-outline-secondary mx-2 mt-2"
                                            onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterUser;
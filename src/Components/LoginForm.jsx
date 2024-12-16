import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign in");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSignUpClick = () => {
        setError(null);
        setMessage(null);
        setAction("Sign up");
    }

    const handleSignInClick = () => {
        setError(null);
        setMessage(null);
        setAction("Sign in");
    }

    async function login() {
        setError(null);
        try {
            let item = { username, password }
            let response = await fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Something went wrong, please try again');
            }

            const result = await response.json();
            if (result.token) {
                localStorage.setItem("jwt", result.token)
                navigate("/me");
            }
        } catch (err) {
            setError(err.message);
        }

    }

    async function signUp() {
        setError(null);
        try {
            let item = { email, username, password };
            let response = await fetch(`${process.env.REACT_APP_API_HOST}/auth/new`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (response.status !== 201) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Something went wrong, please try again');
            }
            setMessage("User created successfully")
            setAction("Sign in");
        } catch (err) {
            setError(err.message);
        }

    }

    return (
        <div className="wrapper">

            <h1>{action}</h1>
            {action === "Sign in" ? <div></div> :
                <div className="input-box">
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <FaEnvelope className="icon" />
                </div>
            }

            <div className="input-box">
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <FaUser className="icon" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <FaLock className="icon" />
            </div>

            <button onClick={action === "Sign in" ? login : signUp} >Send</button>

            <div className="submit-container">
                <div className="error">{error}</div>
            </div>
            <div className="submit-container">
                <div className="success-message">{message}</div>
            </div>

            {action === "Sign up" ? <div></div> :
                <div className="submit-container">
                    <div className="create-account">Don´t have an account?<span onClick={() => handleSignUpClick()}> Sign up</span></div>
                </div>
            }

            {action === "Sign in" ? <div></div> :
                <div className="submit-container">
                    <div className="create-account">Already have an account?<span onClick={() => handleSignInClick()}> Sign in</span></div>
                </div>
            }
        </div>
    );
}

export default LoginForm;
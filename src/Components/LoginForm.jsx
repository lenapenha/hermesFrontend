import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    async function login() {
        let item = { username, password }
        let result = await fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        result = await result.json()
        
        localStorage.setItem("jwt", result.token)
        navigate("/me", {replace:true});
    }

    return (
        <div className="wrapper">

            <h1>Login Page</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <FaUser className="icon" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <FaLock className="icon" />
            </div>

            <button onClick={login} >Send</button>

        </div>
    );
}

export default LoginForm;
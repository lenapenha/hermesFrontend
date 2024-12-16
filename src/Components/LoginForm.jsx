import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'
import { FaEnvelope , FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign in")
    const [email, setEmail] = useState("");
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
        if (result.token) {
            localStorage.setItem("jwt", result.token)
            navigate("/me");
        }
    }

    async function signUp() {
        let item = { email, username, password };
        console.log(item);
        let result = await fetch(`${process.env.REACT_APP_API_HOST}/auth/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        result = await result.json();
        console.log(result);
        setAction("Sign in");
    }

    return (
        <div className="wrapper">

            <h1>{action}</h1>
            {action==="Sign in"?<div></div>:
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
            
            {action==="Sign up"?<div></div>:
                <div className="submit-container">
                    <div className="create-account">Don´t have an account?<span onClick={() => setAction("Sign up")}> Sign up</span></div>
                </div>
            }
            
            {action==="Sign in"?<div></div>:
                <div className="submit-container">
                    <div className="create-account">Already have an account?<span onClick={() => setAction("Sign in")}> Sign in</span></div>
                </div>
            }
        </div>
    );
}

export default LoginForm;
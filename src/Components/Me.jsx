import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Me = () => {
    const token = localStorage.getItem("jwt");
    //const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            let result = await fetch(`${process.env.REACT_APP_API_HOST}/user/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
    
            result = await result.json()
            console.log(JSON.stringify(result));

        };

        fetchUserData();
    }, [token, navigate]);

    return (
        <div>
            <h2>My Profile</h2>
            <p>Name: </p>
            <p>Email:</p>
        </div>
    );
}

export default Me;
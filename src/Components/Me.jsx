import React, { useEffect, useState } from "react";
import './Me.css';

const Me = () => {
    const token = localStorage.getItem("jwt");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData () {

            try {
                let result = await fetch(`${process.env.REACT_APP_API_HOST}/user/me`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await result.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

         if (token) {
             fetchUserData();
         }
    }, []);

    return (
        <div className="profile-card">
            <h2>My Profile</h2>
            { userData && 
            <><p>Name: {userData.username} </p>
            <p>Email:  {userData.email} </p></>
            }
        </div>
    );
}

export default Me;
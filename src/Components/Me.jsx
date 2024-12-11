import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Me = () => {
    const token = localStorage.getItem("jwt");
    //const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    //console.log(`Bearer ${token}`);

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
                console.log(data);
                //setUserData(data);
                //console.log(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        };

         if (token) {
             fetchUserData();
         }
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
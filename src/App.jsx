import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Me from "./Components/Me";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element ={<LoginForm/>} />
                <Route path="/me" element ={<Me/>} />
                <Route path="/" element ={<LoginForm/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App; 
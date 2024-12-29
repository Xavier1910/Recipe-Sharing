import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import ViewRecipe from "./Components/Home/ViewRecipe";
import Register from "./Components/Login/Register";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const userEmail = localStorage.getItem("email");
        if (userEmail) {
            setIsAuthenticated(true);  
        } else {
            setIsAuthenticated(false); 
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />

                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
                
                <Route path="/view-recipe/:id" element={isAuthenticated ? <ViewRecipe /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPageLayout from "./layouts/LoginPageLayout";
import HomePageLayout from "./layouts/HomePageLayout";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth && auth.username === "bek@pkfantares" && auth.password === "Calgary2023!#") {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePageLayout />} />
                <Route path="/login" element={<LoginPageLayout />} />
            </Routes>
        </div>
    );
};

export default App;

import React, { useEffect } from "react";
import MainTable from "../components/table/MainTable";
import { useNavigate } from "react-router-dom";

const HomePageLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <MainTable />
        </div>
    );
};

export default HomePageLayout;

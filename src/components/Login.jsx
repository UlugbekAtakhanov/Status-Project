import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if (username === "bek@pkfantares" && password === "Calgary2023!#") {
            localStorage.setItem("auth", JSON.stringify({ username, password }));
            navigate("/");
        } else {
            navigate("/login");
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <form autoComplete="on" onSubmit={submitHandler} className="flex flex-col gap-4 bg-white w-[300px] p-4 rounded-sm shadow">
                <h1 className="text-center text-xl font-semibold text-sky-500">Sign in</h1>
                <p className="text-xs text-center [text-wrap:balance] text-gray-500">Sign in to NTR Caseware Documentation Status</p>
                <label>
                    <input className="w-full placeholder:text-gray-300 rounded-sm" ref={usernameRef} type="text" placeholder="Username" />
                </label>
                <label>
                    <input className="w-full placeholder:text-gray-300 rounded-sm" ref={passwordRef} type="password" placeholder="Password" />
                </label>
                <button className="bg-sky-500 w-full mx-auto py-1 px-3 rounded text-white hover:bg-sky-700">Sign in</button>
            </form>
        </div>
    );
};

export default Login;

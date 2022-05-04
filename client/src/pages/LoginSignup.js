import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function LoginSignup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            username: username,
            password: password,
        }).then((res) => {
            console.log(res);
            if (!res.data.err) {
                toast.success("Account Registered");
            } else {
                toast.error("Failed to register account");
            }
            setUsername("");
            setPassword("");
        });
    };

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((res) => {
            console.log(res);
            if (!res.data.err) {
                toast.success("Login successful");
                navigate("/data");
            } else {
                toast.error("Invalid username or password");
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Your username..."
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" />
                <input type="button" value="Register" onClick={register} />
            </form>
        </div>
    );
}

export default LoginSignup;

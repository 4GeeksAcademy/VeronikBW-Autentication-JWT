import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const initialUserState = {
    email: "",
    password: ""
};

const urlBase = import.meta.env.VITE_BACKEND_URL;



export default function Login() {

    const [user, setUser] = useState(initialUserState);
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${urlBase}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: "SET_TOKEN", payload: data.token })

                const responseUser = await fetch(`${urlBase}/private`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data.token}`
                    }
                    
                })

                const dataUser = await responseUser.json();
                dispatch({ type: "SET_USER", payload: dataUser.user })

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(dataUser.user));

                navigate("/private");
            } 
        }   catch (error) {
            console.error("Error during login:", error);
        }
    };




    return (
        <div className="container vh-100 d-flex flex-column justify-content-center home-container">
            <div className="row justify-content-center"> 
                <h1 className="text-center mb-4">Login with your email</h1>
                <div className="col-12 col-md-6 py-4 border"> 
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="btnEmail">Email address</label>
                            <input
                                type="email"
                                placeholder="username@example.com"
                                className="form-control"
                                id="btnEmail"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="btnPassword">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="form-control"
                                id="btnPassword"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-primary w-100"
                        >Login</button>
                    </form>
                </div>
                <div className="w-100"> </div>
                <div className="col-12 col-md-6 d-flex justify-content-between my-3">
                    <p>Don't have an account yet?</p>
                    <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}


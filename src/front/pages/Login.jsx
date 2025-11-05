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
            const response = await fetch(`${urlBase}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: "SET_TOKEN", payload: data.token })

                const responseUser = await fetch(`${urlBase}/api/private`, {
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
            } else {
                console.error("Login failed:", data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };




    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="btnEmail" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        placeholder="username@example.com"
                                        className="form-control"
                                        id="btnEmail"
                                        name="email"
                                        onChange={handleChange}
                                        value={user.email}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="btnPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="form-control"
                                        id="btnPassword"
                                        name="password"
                                        onChange={handleChange}
                                        value={user.password}
                                        required
                                    />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <hr className="my-3" />

                            <div className="text-center">
                                <p className="mb-2 text-muted">Don't have an account yet?</p>
                                <div className="d-grid">
                                    <Link to="/signup" className="btn btn-outline-secondary">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


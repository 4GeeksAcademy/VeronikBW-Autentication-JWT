import { useState, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner"



const initialUserState = {
    email: "",
    password: ""
};

const urlBase = import.meta.env.VITE_BACKEND_URL;




export default function Signup() {

    const [user, setUser] = useState(initialUserState);
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
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("password", user.password);

        const response = await fetch(`${urlBase}/signup`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            setUser(initialUserState);
            fileInputRef.current.value = null;
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else if (response.status === 400) {
            toast.error("user already exists");
        } else {
            console.error("Signup failed");
    };


    return (
        <div className="vh-100 d-flex flex-column home-container justify-content-center">
            <Toaster position="top-right" richColors />
            <div className="row justify-content-center my-5 p-4">
                <h2 className="text-center">Signup to know the secret</h2>
                <div className="col-12 col-md-6 p-4 border">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="inputEmail">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="username@example.com"
                                id="inputEmail"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="inputPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                            />
                        </div>
                        <button
                            className="btn btn-primary w-100"
                        >Sign Up</button>
                    </form> 
                </div>
            </div>
        </div>
    );
}}
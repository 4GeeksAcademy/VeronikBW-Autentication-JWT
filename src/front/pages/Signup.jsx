import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
            [target.name]: target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${urlBase}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });

            if (response.ok) {
                setUser(initialUserState);
                toast.success("User created successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else if (response.status === 409) {
                toast.error("User already exists");
            } else if (response.status === 400) {
                toast.error("Email and password are required");
            } 
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };


    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <Toaster position="top-right" richColors />
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Sign Up</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="username@example.com"
                                        id="inputEmail"
                                        name="email"
                                        onChange={handleChange}
                                        value={user.email}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="********"
                                        id="inputPassword"
                                        name="password"
                                        onChange={handleChange}
                                        value={user.password}
                                        required
                                    />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary">
                                        Create Account
                                    </button>
                                </div>
                            </form>


                            <hr className="my-3" />


                            <div className="text-center">
                                <p className="mb-2 text-muted">Already have an account?</p>
                                <div className="d-grid">
                                    <Link to="/login" className="btn btn-outline-secondary">
                                        Login
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
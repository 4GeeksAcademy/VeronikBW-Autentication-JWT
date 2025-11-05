import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";


const urlBase = import.meta.env.VITE_BACKEND_URL;

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const isLoggedIn = !!store.token;

	return (
		<div className="text-center mt-5">
			<h1>Want to know how to succeed in life?</h1>
			<p>Join us and discover the secrets to success!</p>

			{!isLoggedIn ? (
				<>
					<Link className="btn btn-outline-secondary" to="/signup">Sign up</Link>
					<p>or</p>
					<Link className="btn btn-outline-secondary" to="/login">Login</Link>
				</>
			) : (
				<>
					<p>Now... look up...</p>
				</>
			)}
		</div>
	);
}; 
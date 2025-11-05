import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Want to know how to succeed in life?</h1>
			<p>Join us and discover the secrets to success!</p>
			<p>Log In or Sign Up</p>
		</div>
	);
}; 
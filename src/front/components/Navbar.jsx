import { Link, NavLink } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	const logout = () => {
		dispatch ({ type: "SET_TOKEN", payload: null })
		dispatch ({ type: "SET_USER", payload: null })
		localStorage.removeItem("token")
		localStorage.removeItem("user")
	}


	return (
		<nav className="navbar navbar-expand-sm bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Success' secret</Link>
				{
					store.token ? (
						<div>
							<button
							className="nav-link active border p-2 border-dark"
							onClick={logout}
							>Log out</button>
						</div>
					) : null
				}
				<ul className="navbar-nav ms-auto my-auto mb-2 mb-lg-0">

					<li className="nav-item ">
						<Link className="nav-link active border-dark" aria-current="page" to="/private">secret is here</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
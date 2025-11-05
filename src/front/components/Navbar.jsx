import { Link, NavLink } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()


	return (
		<nav className="navbar navbar-expand-sm bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Success' Secret</a>
				{
					store.token ? (
						<div>
							<button>Cerrar sesión</button>
						</div>
					) : null
				}
				<ul className="navbar-nav ms-auto my-auto mb-2 mb-lg-0">

					<li className="nav-item ">
						<a className="nav-link active border" aria-current="page" href="#">secret is here</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
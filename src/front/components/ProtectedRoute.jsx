import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { store } = useGlobalReducer();
    if (!store || !store.token) {
        return <Navigate to={"/login"} />;
    }
    return children;
};

export default ProtectedRoute;
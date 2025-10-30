import { Navigate, Outlet } from "react-router";
import { useContext}  from "react";
import SessionContext from "../context/SessionContext";

export default function PublicRoutes({ children }) {
    const { session } = useContext(SessionContext);

    if (session) {
        return <Navigate to="/account" replace />;
    }
    return <Outlet />;
}
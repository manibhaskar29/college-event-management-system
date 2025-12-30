import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
    const user = getUserFromToken();

    // Check if user is logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has the required role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user's actual role
        const redirectPath = user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}
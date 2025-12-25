import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function Navbar() {
    const navigate = useNavigate();
    const user = getUserFromToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav>
            {!user && (
                <>
                    <Link to="/login">Login</Link> | {" "}
                    <Link to="/register">Register</Link> | {" "}
                </>
            )}

            {user && (
                <>
                    <Link to="/events">Events</Link> | {" "}
                    <span>Role: {user.role}</span> | {" "}
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}           
        </nav>
    );
}
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, Container, Typography, IconButton, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import { getUserFromToken } from "../utils/auth";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUserFromToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Don't show navbar on login/register pages
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid #e2e8f0",
                color: "#1e293b",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ px: { xs: 0 }, py: 1.5 }}>
                    {/* Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <SchoolIcon sx={{ fontSize: 32, color: "#3b82f6", mr: 1.5 }} />
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/events"
                            sx={{
                                fontWeight: 700,
                                color: "#1e293b",
                                textDecoration: "none",
                                letterSpacing: "-0.02em",
                                "&:hover": {
                                    color: "#3b82f6",
                                },
                                transition: "color 0.2s ease",
                            }}
                        >
                            Event Hub
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {!user && (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        color: "#64748b",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        px: 2,
                                        "&:hover": {
                                            color: "#3b82f6",
                                            background: "rgba(59, 130, 246, 0.05)",
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="contained"
                                    sx={{
                                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                        color: "white",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        px: 3,
                                        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                                        },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}

                        {user && (
                            <>
                                <Button
                                    component={Link}
                                    to={user?.role === "admin" ? "/admin/events" : "/student/events"}
                                    startIcon={<EventIcon />}
                                    sx={{
                                        color:
                                            location.pathname.includes("/events")
                                                ? "#3b82f6"
                                                : "#64748b",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        px: 2,
                                        background: location.pathname.includes("/events")
                                            ? "rgba(59, 130, 246, 0.08)"
                                            : "transparent",
                                        "&:hover": {
                                            color: "#3b82f6",
                                            background: "rgba(59, 130, 246, 0.08)",
                                        },
                                    }}
                                >
                                    Events
                                </Button>

                                {/* User Info */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        ml: 2,
                                        pl: 2,
                                        borderLeft: "1px solid #e2e8f0",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {user.role === "admin" ? "A" : "S"}
                                        </Avatar>
                                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#334155", lineHeight: 1.2, textTransform: "capitalize" }}>
                                                {user.role}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <IconButton
                                        onClick={handleLogout}
                                        size="small"
                                        sx={{
                                            color: "#64748b",
                                            "&:hover": {
                                                color: "#dc2626",
                                                background: "rgba(220, 38, 38, 0.05)",
                                            },
                                        }}
                                    >
                                        <LogoutIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
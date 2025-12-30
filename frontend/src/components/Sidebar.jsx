import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUserFromToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Role-based menu items
    let menuItems = [];

    if (user?.role === "admin") {
        menuItems = [
            { text: "Dashboard", icon: <DashboardIcon />, path: "/admin-dashboard" },
            { text: "All Events", icon: <EventIcon />, path: "/admin/events" },
            { text: "Create Event", icon: <AddCircleOutlineIcon />, path: "/create-event" },
        ];
    } else if (user?.role === "student") {
        menuItems = [
            { text: "Dashboard", icon: <DashboardIcon />, path: "/student-dashboard" },
            { text: "All Events", icon: <EventIcon />, path: "/student/events" },
            { text: "My Registrations", icon: <CheckCircleIcon />, path: "/student/my-registrations" },
        ];
    }

    return (
        <Box
            sx={{
                width: 240,
                height: "100vh",
                background: "#fff",
                borderRight: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            {/* Logo/Brand */}
            <Box
                sx={{
                    p: 3,
                    pb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CalendarMonthIcon sx={{ color: "#fff", fontSize: 24 }} />
                </Box>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#1e293b",
                    }}
                >
                    College Event Hub
                </Typography>
            </Box>

            {/* Navigation Menu */}
            <List sx={{ px: 2, py: 1, flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 2,
                                    ...(isActive
                                        ? {
                                            background: "#eff6ff",
                                            color: "#3b82f6",
                                            "& .MuiListItemText-primary": {
                                                fontWeight: 600,
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: "#3b82f6",
                                            },
                                        }
                                        : {
                                            color: "#64748b",
                                            "&:hover": {
                                                background: "#f8fafc",
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: "#94a3b8",
                                            },
                                        }),
                                }}
                            >
                                <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                                    {item.icon}
                                </Box>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Logout Section */}
            <Box sx={{ px: 2, pb: 3 }}>
                <Divider sx={{ mb: 2 }} />
                <Button
                    fullWidth
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                        py: 1.5,
                        px: 2,
                        borderRadius: 2,
                        color: "#dc2626",
                        fontWeight: 600,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        "&:hover": {
                            background: "#fef2f2",
                            color: "#b91c1c",
                        },
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}

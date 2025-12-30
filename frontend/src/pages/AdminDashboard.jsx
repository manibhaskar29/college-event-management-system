import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Avatar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalEvents: 0, totalRegistrations: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get("/events/stats");
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)" }}>
            <Sidebar />

            <Box sx={{ flex: 1, ml: "240px", p: 4 }}>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                            Admin Dashboard
                        </Typography>
                        <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                            Manage and monitor college events
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: 14, color: "#64748b" }}>Admin</Typography>
                        <Avatar sx={{ width: 40, height: 40, background: "#3b82f6" }}>A</Avatar>
                    </Box>
                </Box>

                {/* Stats Cards */}
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3, mb: 4 }}>
                    <Card sx={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography sx={{ color: "#64748b", fontSize: 14, mb: 1 }}>
                                        Total Events
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                                        {loading ? "..." : stats.totalEvents}
                                    </Typography>
                                    <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                                        Events created
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        background: "#dbeafe",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <EventIcon sx={{ color: "#3b82f6", fontSize: 24 }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography sx={{ color: "#64748b", fontSize: 14, mb: 1 }}>
                                        Total Registrations
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                                        {loading ? "..." : stats.totalRegistrations}
                                    </Typography>
                                    <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                                        Students registered
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        background: "#dcfce7",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <PeopleIcon sx={{ color: "#22c55e", fontSize: 24 }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Create Event CTA */}
                <Card
                    sx={{
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>
                                    Create a New Event
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                    Start planning your next college event. Add details and let students discover and register.
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => navigate("/create-event")}
                                sx={{
                                    background: "#fff",
                                    color: "#3b82f6",
                                    py: 1.5,
                                    px: 3,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    boxShadow: "none",
                                    "&:hover": {
                                        background: "#f8fafc",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                Create Event
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

import { useState } from "react";
import { Box, Typography, Card, CardContent, TextField, Button, Avatar, Chip, Alert } from "@mui/material";
import Sidebar from "../components/Sidebar";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateEvent() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await api.post("/events", {
                title,
                description,
                event_date: date,
            });

            setSuccess("Event created successfully!");

            // Reset form
            setTitle("");
            setDescription("");
            setDate("");
            setLocation("");

            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create event");
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
            <Sidebar />

            <Box sx={{ flex: 1, ml: "240px", p: 4 }}>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                            Create New Event
                        </Typography>
                        <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                            Fill in the details to create a new college event
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip label="Admin" size="small" sx={{ background: "#eff6ff", color: "#3b82f6", fontWeight: 600 }} />
                        <Avatar sx={{ width: 40, height: 40, background: "#3b82f6" }}>A</Avatar>
                    </Box>
                </Box>

                {/* Form Card */}
                <Card sx={{ maxWidth: 700, borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <CardContent sx={{ p: 4 }}>
                        {/* Success Message */}
                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {success}
                            </Alert>
                        )}

                        {/* Error Message */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            {/* Event Title */}
                            <Box sx={{ mb: 3 }}>
                                <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 14 }}>
                                    Event Title
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="e.g., Annual Tech Fest 2024"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: <DescriptionIcon sx={{ mr: 1.5, color: "#94a3b8", fontSize: 20 }} />,
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            background: "#f8fafc",
                                            "& fieldset": {
                                                borderColor: "#e2e8f0",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#3b82f6",
                                            },
                                            "&.Mui-focused": {
                                                background: "#fff",
                                                "& fieldset": {
                                                    borderColor: "#3b82f6",
                                                    borderWidth: "2px",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Event Description */}
                            <Box sx={{ mb: 3 }}>
                                <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 14 }}>
                                    Event Description
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Describe your event in detail..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            background: "#f8fafc",
                                            "& fieldset": {
                                                borderColor: "#e2e8f0",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#3b82f6",
                                            },
                                            "&.Mui-focused": {
                                                background: "#fff",
                                                "& fieldset": {
                                                    borderColor: "#3b82f6",
                                                    borderWidth: "2px",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Date and Location Row */}
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 4 }}>
                                {/* Event Date */}
                                <Box>
                                    <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 14 }}>
                                        Event Date
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                background: "#f8fafc",
                                                "& fieldset": {
                                                    borderColor: "#e2e8f0",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#3b82f6",
                                                },
                                                "&.Mui-focused": {
                                                    background: "#fff",
                                                    "& fieldset": {
                                                        borderColor: "#3b82f6",
                                                        borderWidth: "2px",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Location */}
                                <Box>
                                    <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 14 }}>
                                        Location
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g., Main Auditorium"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                background: "#f8fafc",
                                                "& fieldset": {
                                                    borderColor: "#e2e8f0",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#3b82f6",
                                                },
                                                "&.Mui-focused": {
                                                    background: "#fff",
                                                    "& fieldset": {
                                                        borderColor: "#3b82f6",
                                                        borderWidth: "2px",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    background: "#3b82f6",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                                    "&:hover": {
                                        background: "#2563eb",
                                        boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
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

import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GoogleIcon from "@mui/icons-material/Google";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#0b1220" }}>
      {/* LEFT SIDE */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          color: "#fff",
          p: 6,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          College Event Dashboard
        </Typography>

        <Typography sx={{ mb: 4, color: "#cbd5e1" }}>
          Manage and participate in college events with ease.
        </Typography>

        {[
          "Create and manage events",
          "Student event registration",
          "Role-based access control",
          "Secure JWT authentication",
        ].map((text) => (
          <Box key={text} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CheckCircleIcon sx={{ mr: 1, color: "#38bdf8" }} />
            <Typography>{text}</Typography>
          </Box>
        ))}
      </Grid>

      {/* RIGHT SIDE */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        sx={{
          bgcolor: "#020617",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Sign in
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: "#94a3b8" } }}
              InputProps={{ style: { color: "#fff" } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Enter your registered email"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: "#94a3b8" } }}
              InputProps={{ style: { color: "#fff" } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Minimum 6 characters"
            />

            <FormControlLabel
              control={<Checkbox sx={{ color: "#38bdf8" }} />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign in
            </Button>

            <Divider sx={{ my: 2, color: "#475569" }}>or</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              disabled
            >
              Sign in with Google (Coming soon)
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

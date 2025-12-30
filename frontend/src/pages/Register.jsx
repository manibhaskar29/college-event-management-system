import { useState } from "react";
import { Box, TextField, Button, Typography, Link, Paper, IconButton, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: 2,
          p: 4,
          borderRadius: 3,
          background: "#fff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Box>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 0.5,
            }}
          >
            Create Account
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 14 }}>
            Join the College Event Hub today
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: "#fef2f2",
              border: "1px solid #fecaca",
            }}
          >
            <Typography sx={{ color: "#dc2626", fontSize: 14 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 13 }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              placeholder="John Doe"
              type="text"
              required
              InputProps={{
                startAdornment: <PersonOutlineIcon sx={{ mr: 1.5, color: "#94a3b8", fontSize: 20 }} />,
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 14px",
                  fontSize: 14,
                },
              }}
            />
          </Box>

          {/* Email Address */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 13 }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              placeholder="your.email@college.edu"
              type="email"
              required
              InputProps={{
                startAdornment: <EmailOutlinedIcon sx={{ mr: 1.5, color: "#94a3b8", fontSize: 20 }} />,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 14px",
                  fontSize: 14,
                },
              }}
            />
          </Box>

          {/* Password */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 13 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              required
              InputProps={{
                startAdornment: <LockOutlinedIcon sx={{ mr: 1.5, color: "#94a3b8", fontSize: 20 }} />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#94a3b8" }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 14px",
                  fontSize: 14,
                },
              }}
            />
          </Box>

          {/* Confirm Password */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#334155", fontSize: 13 }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              required
              InputProps={{
                startAdornment: <LockOutlinedIcon sx={{ mr: 1.5, color: "#94a3b8", fontSize: 20 }} />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: "#94a3b8" }}
                    >
                      {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 14px",
                  fontSize: 14,
                },
              }}
            />
          </Box>

          {/* Role Selector */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1.5, fontWeight: 600, color: "#334155", fontSize: 13 }}>
              I am a...
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant={role === "student" ? "contained" : "outlined"}
                onClick={() => setRole("student")}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  ...(role === "student"
                    ? {
                      background: "#3b82f6",
                      color: "#fff",
                      "&:hover": {
                        background: "#2563eb",
                      },
                    }
                    : {
                      borderColor: "#e2e8f0",
                      color: "#64748b",
                      "&:hover": {
                        borderColor: "#3b82f6",
                        background: "#f8fafc",
                      },
                    }),
                }}
              >
                Student
              </Button>
              <Button
                fullWidth
                variant={role === "admin" ? "contained" : "outlined"}
                onClick={() => setRole("admin")}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  ...(role === "admin"
                    ? {
                      background: "#3b82f6",
                      color: "#fff",
                      "&:hover": {
                        background: "#2563eb",
                      },
                    }
                    : {
                      borderColor: "#e2e8f0",
                      color: "#64748b",
                      "&:hover": {
                        borderColor: "#3b82f6",
                        background: "#f8fafc",
                      },
                    }),
                }}
              >
                Admin
              </Button>
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
              transition: "all 0.2s ease",
              "&:hover": {
                background: "#2563eb",
                boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
                transform: "translateY(-1px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Create Account
          </Button>
        </Box>

        {/* Sign In Link */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography sx={{ color: "#64748b", fontSize: 14 }}>
            Already have an account?{" "}
            <Link
              href="/login"
              underline="hover"
              sx={{
                color: "#3b82f6",
                fontWeight: 600,
                "&:hover": {
                  color: "#2563eb",
                },
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

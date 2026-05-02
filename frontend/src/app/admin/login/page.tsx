"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

const API = "http://127.0.0.1:8000";
const LOGO_BLUE = "#3AB0FF";
const WAFFLE_BROWN = "#5D3A1A";
const OFF_WHITE = "#FAF9F6";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        router.replace("/admin");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: OFF_WHITE,
      }}
    >
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{ width: 200, height: 60, position: "relative", mx: "auto", mb: 2 }}
          >
            <Image
              src="/assets/images/logo.svg"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography variant="h5" fontWeight={900} color={WAFFLE_BROWN}>
            Admin Login
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
            autoComplete="current-password"
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <Button
            variant="contained"
            onClick={login}
            disabled={loading}
            fullWidth
            sx={{
              bgcolor: LOGO_BLUE,
              fontWeight: 900,
              py: 1.5,
              borderRadius: "50px",
              "&:hover": { bgcolor: "#2990D6" },
            }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Bloodtype, Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import API from "../../utils/api";
import { deepOrange } from "@mui/material/colors";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    const loginData = {
      email,
      password,
    };
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (password.length < 3) {
      alert("Invalid Password");
      return;
    }

    try {
      const response = await API.post("/users/login", loginData, {
        withCredentials: true,
      });

      console.log("✅ Login successful:", response);
      if (response.data) {
        alert("Login successful!");
        navigate("/home", { state: { user: response.data.user } });
      } else {
        console.error("❌ Login failed:", response);
        alert(response.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("User is not Exist");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box textAlign="center" mb={4}>
        <Bloodtype
          sx={{
            fontSize: 32,
            mr: 1,
            color: deepOrange[500],
          }}
        />
        <Typography variant="h4" color="error" fontWeight="bold" gutterBottom>
          Blood Donor Finder System
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Sign in to save lives
        </Typography>
      </Box>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form">
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="error" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="error" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              onClick={handleLogin}
              sx={{ mt: 3, py: 1.5 }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box textAlign="center" mt={3}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link to="/" style={{ color: "#d32f2f", fontWeight: "bold" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;

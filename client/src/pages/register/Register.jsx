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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Phone,
  LocationOn,
  Home,
  Flag,
  Public,
  LocalHospital,
  Bloodtype,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { deepOrange } from "@mui/material/colors";
import { validateUserForm } from "../../utils/validateForm";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [blood, setBlood] = useState();
  const [donate, setDonate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (pincode.length === 6) {
      async function fetchAddress() {
        const res = await fetch(`https://api.zippopotam.us/in/${pincode}`);
        const data = await res.json();
        console.log("data:", data);
        setCountry(data.country);
        setState(data.places[0].state);
        setCity(data.places[0]["place name"]);
      }
      fetchAddress();
    }
  }, [pincode]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const error = validateUserForm({
      name,
      email,
      phone,
      password,
      pincode,
      country,
      state,
      city,
      blood,
    });

    if (error) {
      alert(error); // or setError(error) to show inline
      return;
    }

    const userData = {
      name,
      email,
      phone,
      password,
      pincode,
      country,
      state,
      city,
      blood,
      donate,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Convert data to JSON format
      });

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        console.error("❌ Registration failed:", data);
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box textAlign="center" mb={0}>
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
          Register to save lives in your community
        </Typography>
      </Box>

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form">
            <Grid container spacing={2}>
              {/* Personal Information */}
              {/* name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* phone */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number (Only visible to you)"
                  margin="normal"
                  type="number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  required
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
              </Grid>
              {/* pincode */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode/Zip Code"
                  margin="normal"
                  value={pincode}
                  type="number"
                  onChange={(e) => setPincode(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* country */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Country"
                  margin="normal"
                  disabled
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Flag color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* state */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  margin="normal"
                  disabled
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Public color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* city */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  margin="normal"
                  disabled
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* blood group */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" sx={{ width: "100px" }}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    value={blood}
                    onChange={(e) => setBlood(e.target.value)}
                    label="Blood Group"
                    startAdornment={
                      <InputAdornment position="start">
                        <LocalHospital color="error" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>

                {/* Display selected blood group */}
                <p>Selected Blood Group: {blood}</p>
              </Grid>
              {/* donate */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="error"
                      checked={donate}
                      onChange={(e) => setDonate(e.target.checked)}
                    />
                  }
                  label="Willing to donate in future"
                  sx={{ mt: 2 }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                  onClick={handleSubmit}
                >
                  Submit to Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Box textAlign="center" mt={3}>
        <Typography variant="body2">
          Already registered?{" "}
          <Link to="/login" style={{ color: "#d32f2f", fontWeight: "bold" }}>
            Login here
          </Link>
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          By registering, you agree to our terms and confirm you meet all donor
          eligibility requirements.
        </Typography>
      </Box>
    </Container>
  );
};
export default Register;

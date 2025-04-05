import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import API from "../utils/api";
import dayjs from "../utils/dayjsConfig";
import Admin_navbar from "./Admin_navbar";
import Admin_Profile from "./AdminProfile";
import { LocalHospital } from "@mui/icons-material";
import FooterNote from "../FooterNote";

const DonorCard = ({ donor }) => {
  const initials = donor.name[0].toUpperCase();

  return (
    <Card
      sx={{
        background: "#fff",
        width: "100%",
        // mb: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "#1976d2" }}>{initials}</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{donor.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            📍 {donor.city}, {donor.state}, {donor.country}
          </Typography>
          <Typography variant="body2">📞 {donor.phone}</Typography>
          <Typography variant="body2">✉️ {donor.email}</Typography>
          <Typography variant="body2">
            🩸 Last Donation:{" "}
            {donor.lastDonate
              ? dayjs(donor.lastDonate).fromNow()
              : "Not donated yet"}
          </Typography>
        </Box>
        <Stack spacing={1} alignItems="flex-end">
          <Chip
            icon={<BloodtypeIcon />}
            label={donor.bloodGroup}
            color="error"
            variant="outlined"
          />
          <Typography
            variant="caption"
            sx={{ color: donor.willingToDonate ? "green" : "red" }}
          >
            {donor.willingToDonate
              ? "✅ Willing to Donate"
              : "❌ Not willing to donate"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Donations Made: {donor.donate_made}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

const user = {
  _id: "67ef9017122e987a8b3dacec",
  name: "Swapnil Gupta",
  email: "swapnil@gmail.com",
  password: "$2b$10$NQvoDJh64PVc6ljsFtNuJe1PsQ5QGbnYqv/vg1mPqv0VIu1opxfx6",
  phone: "888732848",
  pincode: "450221",
  country: "India",
  state: "Madhya Pradesh",
  city: "Burhanpur",
  bloodGroup: "B+",
  willingToDonate: true,
  usersIdWhoSendRequest: [],
  lastDonate: null,
  __v: 0,
  donate_made: 0,
};
const Admin_home = () => {
  const [pincode, setPincode] = useState("");
  const [blood, setBlood] = useState("");
  const [donors, setDonors] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const open = Boolean(anchorEl);
  // fetch donors
  async function fetchDonors(code) {
    try {
      const res = await API.get(`/users/get-donors-for-admin/${code}`);
      console.log("res:", res);

      let allDonors = res.data;

      // Only filter by bloodGroup if blood is selected AND not "Clear All"
      if (blood && blood !== "Clear All") {
        allDonors = allDonors.filter((donor) => donor.bloodGroup === blood);
      }
      setDonors(allDonors);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  }

  useEffect(() => {
    const code = pincode.length === 6 ? pincode : 0;
    fetchDonors(code);
  }, [pincode, blood]);

  // profile page handle
  const handleClose = () => {
    setAnchorEl(null);
  };

  //handle profile
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        {/* App Bar */}
        <Admin_navbar
          pincode={pincode}
          setPincode={setPincode}
          setOpenPopup={setOpenPopup}
          handleProfileClick={handleProfileClick}
          user={user}
        />
        {/* Profile Menu */}
        <Admin_Profile
          open={open}
          user={user}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
        {/* donors list */}
        <Box
          sx={{
            backgroundColor: "#F9F9F9",
            minHeight: "90vh",
            py: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              maxHeight: "80vh",
              overflowY: "auto",
              bgcolor: "#F9F9F9",
              px: 2,
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={600}
              mb={3}
              color="primary"
            >
              💉 Donor List
            </Typography>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" sx={{ width: "100px" }}>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  sx={{ width: "140px" }}
                  value={blood}
                  onChange={(e) => setBlood(e.target.value)}
                  label="Blood Group"
                  startAdornment={
                    <InputAdornment position="start">
                      <LocalHospital color="error" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="Clear All">Clear All</MenuItem>
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
            </Grid>
            <List disablePadding>
              {donors.length > 0 ? (
                donors.map((donor) => (
                  <ListItem key={donor._id} disableGutters>
                    <DonorCard donor={donor} />
                  </ListItem>
                ))
              ) : (
                <Box sx={{ ...styles.infoBox, marginTop: 3 }}>
                  No donor added yet !
                </Box>
              )}
            </List>
          </Box>
        </Box>
      </Box>
      <FooterNote />
    </>
  );
};

// Styles
const styles = {
  infoBox: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#1565c0",
    padding: "8px 12px",
    backgroundColor: "#E3F2FD",
    borderRadius: "6px",
    display: "inline-block",
    marginBottom: "3px",
  },
};
export default Admin_home;

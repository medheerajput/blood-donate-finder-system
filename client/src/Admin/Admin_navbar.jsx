import { Bloodtype, Notifications, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { deepOrange, grey, teal } from "@mui/material/colors";
import React from "react";

const Admin_navbar = ({ pincode, setPincode, handleProfileClick, user }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: teal[800],
        borderBottom: `1px solid ${grey[200]}`,
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Bloodtype
            sx={{
              fontSize: 32,
              mr: 1,
              color: deepOrange[500],
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Blood Donor <span style={{ color: deepOrange[500] }}>Finder </span>
            <span style={{ color: deepOrange[500] }}>System</span>(Admin page)
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: "auto",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
              mr: 2,
              borderRadius: 2,
              boxShadow: "none",
              border: `1px solid ${grey[300]}`,
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Search by pincode..."
              variant="standard"
              size="small"
              type="number"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <Button
              variant="contained"
              // onClick={handleSearch}
              sx={{
                backgroundColor: teal[500],
                color: "white",
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  backgroundColor: teal[600],
                },
              }}
            >
              Find
            </Button>
          </Paper>
          <Button
            // onClick={() => setStep(0)}
            variant="outlined"
            sx={{
              backgroundColor: "#00897B",
              color: "white",
              borderColor: "#00897B",
              "&:hover": {
                backgroundColor: "#00695C",
              },
            }}
          >
            Home
          </Button>

          <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: teal[500],
              }}
            >
              {user?.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Admin_navbar;

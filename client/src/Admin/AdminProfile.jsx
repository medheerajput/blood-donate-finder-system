import {
  Edit,
  Email,
  Favorite,
  LocationOn,
  Logout,
  Phone,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deepOrange, teal } from "@mui/material/colors";
import React from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Admin_Profile = ({ open, user, anchorEl, handleClose }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/login");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 3,
        sx: {
          width: 320,
          p: 2,
          borderRadius: 2,
          mt: 1,
        },
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            mx: "auto",
            mb: 1,
            backgroundColor: teal[500],
            fontSize: 32,
          }}
        >
          {user?.name.charAt(0)}
        </Avatar>
        <Typography variant="h6">{user?.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          I am Admin
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <MenuItem dense>
        <ListItemIcon>
          <Email fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">{user?.email}</Typography>
      </MenuItem>

      <MenuItem dense>
        <ListItemIcon>
          <Phone fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">{user?.phone}</Typography>
      </MenuItem>

      <MenuItem dense>
        <ListItemIcon>
          <LocationOn fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">
          {user?.city}, {user?.pincode}
        </Typography>
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default Admin_Profile;

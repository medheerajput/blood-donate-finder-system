import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Card,
  CardContent,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import {
  Search,
  Notifications,
  Person,
  Edit,
  Email,
  LocationOn,
  Send,
  Favorite,
  Bloodtype,
  CalendarToday,
  Phone,
} from "@mui/icons-material";
import { teal, blue, grey, deepOrange } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import API from "../../utils/api";
import MessageBox from "./MessageBox";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Main from "./Main";

const HomePage = () => {
  const [pincode, setPincode] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [donors, setDonors] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [step, setStep] = useState(0);
  const location = useLocation();

  const { user } = location.state || {};
  console.log("user:", user);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (pincode.length === 6 || user?.pincode) {
      async function name() {
        const res = await API.get(
          `/users/get-donors/${pincode || user?.pincode}`
        );
        const extractedDonerExceptMe = res.data?.filter(
          (u) => u._id !== user._id
        );
        console.log("extractedDonerExceptMe:", extractedDonerExceptMe);

        setDonors(extractedDonerExceptMe);
      }
      name();
    }
  }, [pincode, user?.pincode, refresh]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendRequest = async (donorId) => {
    const res = await API.post("/contacts/request", {
      donorId,
      msg: "I am facing an emergency and would truly appreciate it if you could consider donating your blood.",
    });
    setRefresh(!refresh);
    console.log("sendreqres:", res);
  };

  const tabs = [
    {
      name: "home",
      component: (props) => (
        <Main
          {...props}
          user={user}
          donors={donors}
          sendRequest={sendRequest}
          pincode={pincode}
        />
      ),
    },
    {
      name: "msg",
      component: (props) => (
        <MessageBox
          {...props}
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          donors={donors}
          step={step}
        />
      ),
    },
  ];
  const Component = tabs[step].component;
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* App Bar */}
      <Navbar
        setStep={setStep}
        pincode={pincode}
        setPincode={setPincode}
        setOpenPopup={setOpenPopup}
        handleProfileClick={handleProfileClick}
        user={user}
        step={step}
      />
      {/* Profile Menu */}
      <Profile
        open={open}
        user={user}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />

      {/* Main Content */}
      <Component />
    </Box>
  );
};

export default HomePage;

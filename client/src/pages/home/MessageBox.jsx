import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import API from "../../utils/api";

const MessageBox = ({ step, onClose }) => {
  const [donors, setDonors] = useState([]);
  const [receivedReqs, setReceivedReqs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch contacts when dialog opens or refresh is triggered
  useEffect(() => {
    getRequestedDoner();
  }, [step, refresh]);

  async function getRequestedDoner() {
    try {
      const res = await API.get(`/contacts/get-contacts`);
      const { contacts, receivedReqs } = res.data;
      setDonors(contacts);
      setReceivedReqs(receivedReqs);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  const handleChange = async (checked, id) => {
    setRefresh(!refresh);
    try {
      await API.get(`/contacts/request-isAllow/${id}/${checked}`);
      // Toggle refresh to trigger re-fetch
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 900, margin: "auto" }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Blood Donors List
      </Typography>

      {/* Donors Section */}
      <Box sx={styles.infoBox}>
        Donors you have requested for blood donation
      </Box>
      {donors.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {[
                  "Name",
                  "Location",
                  "Email",
                  "Phone",
                  "Blood Group",
                  "Request",
                ].map((label, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell align="center">
                    {donor.requestedUserId.name}
                  </TableCell>
                  <TableCell align="center">
                    {donor.requestedUserId.city}, {donor.requestedUserId.state}
                  </TableCell>
                  <TableCell align="center">
                    {donor.requestedUserId.email}
                  </TableCell>
                  <TableCell align="center">
                    {!donor.accepted ? (
                      <Chip
                        label="Waiting for approval"
                        sx={{ backgroundColor: "red", color: "white" }}
                      />
                    ) : (
                      donor.requestedUserId.phone
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={donor.requestedUserId.bloodGroup}
                      sx={{ backgroundColor: "#d32f2f", color: "white" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {!donor.accepted ? (
                      <Chip
                        label="Pending"
                        sx={{ backgroundColor: "red", color: "white" }}
                      />
                    ) : (
                      <Chip
                        label="Available"
                        sx={{ backgroundColor: "green", color: "white" }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="error" align="center">
          No request sent yet!
        </Typography>
      )}

      {/* Received Requests Section */}
      <Box sx={{ ...styles.infoBox, marginTop: 3 }}>
        You have received a request from a person in need of blood
      </Box>
      {receivedReqs.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {[
                  "Name",
                  "Location",
                  "Email",
                  "Phone",
                  "Blood Group",
                  "Request",
                ].map((label, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {receivedReqs.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell align="center">{donor.userId.name}</TableCell>
                  <TableCell align="center">
                    {donor.userId.city}, {donor.userId.state}
                  </TableCell>
                  <TableCell align="center">{donor.userId.email}</TableCell>
                  <TableCell align="center">{donor.userId.phone}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={donor.userId.bloodGroup}
                      sx={{ backgroundColor: "#d32f2f", color: "white" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={donor?.accepted}
                          onChange={(e) =>
                            handleChange(e.target.checked, donor._id)
                          }
                          color="primary"
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="error" align="center">
          No request received yet!
        </Typography>
      )}
    </Box>
  );
};

// Styles
const styles = {
  infoBox: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1565c0",
    padding: "8px 12px",
    backgroundColor: "#E3F2FD",
    borderRadius: "6px",
    display: "inline-block",
    marginBottom: "3px",
  },
};

export default MessageBox;

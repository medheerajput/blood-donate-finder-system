import {
  CalendarToday,
  DoneSharp,
  Email,
  Favorite,
  LocationOn,
  Send,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { blue, deepOrange, red, teal } from "@mui/material/colors";
import React from "react";
import dayjs from "../../utils/dayjsConfig";

const Main = ({ user, donors, sendRequest, step, pincode }) => {
  console.log("donersssss:", donors, pincode);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: teal[800],
          fontWeight: 600,
        }}
      >
        Donors near {pincode ? pincode : user?.pincode}
      </Typography>

      {/* user doner list */}
      {donors.length > 0 ? (
        donors.map((donor) => (
          <Card
            key={donor._id}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    mr: 3,
                    backgroundColor: blue[500],
                  }}
                >
                  {donor.name.charAt(0)}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mr: 2,
                      }}
                    >
                      {donor.name}
                    </Typography>
                    <Chip
                      label={donor.bloodGroup}
                      size="small"
                      sx={{
                        backgroundColor: "#ffeeee",
                        color: deepOrange[600],
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Email sx={{ fontSize: 16, mr: 1 }} />
                    {donor.email}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <LocationOn sx={{ fontSize: 16, mr: 1 }} />
                    {`${donor.city}, ${donor.state}`}
                    {/* {donor.distance} */}
                  </Typography>

                  {/* how many times user donated */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 0.5,
                    }}
                  >
                    <Favorite sx={{ fontSize: 16, mr: 1, color: red[400] }} />
                    Donated: {donor?.donate_made}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
                    Last donated :{" "}
                    {donor.lastDonate
                      ? dayjs(donor.lastDonate).fromNow()
                      : "Not donated yet"}
                  </Typography>
                </Box>
                {/* request button */}
                {donor.usersIdWhoSendRequest.filter((i) => i === user._id)
                  .length > 0 ? (
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    // onClick={() => sendRequest(donor._id)}
                    sx={{
                      backgroundColor: teal[500],
                      color: "white",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      "&:hover": {
                        backgroundColor: teal[600],
                      },
                    }}
                  >
                    Sent
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    onClick={() => sendRequest(donor._id)}
                    sx={{
                      backgroundColor: teal[500],
                      color: "white",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      "&:hover": {
                        backgroundColor: teal[600],
                      },
                    }}
                  >
                    Request
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Box sx={styles.infoBox}>Search doners by pincode</Box>
      )}
    </Box>
  );
};
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
export default Main;

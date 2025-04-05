import { Typography } from "@mui/material";

const FooterNote = () => (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "0.75rem",
        opacity: 0.6,
      }}
    >
      © {new Date().getFullYear()} Created by Shubhangi & Priyanka
    </Typography>
  );
  
  export default FooterNote;
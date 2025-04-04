const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

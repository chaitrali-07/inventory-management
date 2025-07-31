require("dotenv").config();
const express = require("express");
const app = express();
const uploadRoute = require("./uploadRoute");

app.use(express.json());
app.use("/api", uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

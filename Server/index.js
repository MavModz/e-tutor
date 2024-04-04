require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connection");
const router = require("./routes/router");
const PORT = process.env.instance_Port;


//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
    console.log("server listening on port: " + PORT);
});

// MODULE EXPORT FOR PRODUCTION SERVER
// module.exports = app;
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connection");
const router = require("./routes/router");
const PORT = process.env.instance_Port;


//MIDDLEWARE
app.use(express.json());

// CORS OPTIONS TO ALLOW ALL ORIGINS
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use(cors(corsOptions));

app.use("/", router);

// app.listen(PORT, () => {
//     console.log("server listening on port: " + PORT);
// });

// MODULE EXPORT FOR PRODUCTION SERVER
module.exports = app;
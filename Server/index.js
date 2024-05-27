require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require('socket.io');
const chatSockets = require('./lib/Services/chatSockets');
const app = express();
const cors = require("cors");
require("./db/connection");
const router = require("./routes/router");
const PORT = process.env.instance_Port;


//MIDDLEWARE
app.use(express.json());

//SOCKET.IO CODE
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://e-tutor-gules.vercel.app', 'http://localhost:3000'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

chatSockets(io);

// CORS OPTIONS TO ALLOW ALL ORIGINS
const corsOptions = {
    origin: ['*', 'https://e-tutor-gules.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log("Origin header:", req.headers.origin);
    next();
});


app.use("/", router);

server.listen(PORT, () => {
    console.log("server listening on port: " + PORT);
});

// MODULE EXPORT FOR PRODUCTION SERVER
module.exports = app;
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

// Routers
const tourRouter = require("./routes/TourRoutes");

// Utilites
const DBConnectionHandler = require("./utilities/DBConnectionHandler");

// Database Connection
DBConnectionHandler();

// Connecting routes
app.use("/api/v1/Tour", tourRouter);

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Listening at port: http://localhost:${port}/`);
});

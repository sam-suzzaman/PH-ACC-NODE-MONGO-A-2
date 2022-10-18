const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Listening at port: `, port);
});

const cors = require("cors");
const express = require("express");
const app = express();

app.use("/api", cors(), apiRouter);
// This will enable CORS for all routes and origins

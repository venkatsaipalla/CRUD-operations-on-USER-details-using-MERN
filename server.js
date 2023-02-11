const express = require("express");
const cors = require("cors");
//mongoDB Connection
require("./config/db");
//Importing Routes
const users = require("./routes/api/user");

const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("hello"));

// Use Routes
app.use("/api/users", users);
//change the port number to react server port then it will work fine
app.use(
  cors({
    origin: "http://localhost:3004",
  })
);

const port = process.env.PORT || 3008;

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);

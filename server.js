const express = require("express");

//mongoDB Connection
require("./config/db");
//Importing Routes
const users = require("./routes/api/user");

const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("hello"));

// Use Routes
app.use("/api/users", users);

const port = process.env.PORT || 3008;

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);

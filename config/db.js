const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");
mongoose.set("strictQuery", true);

mongoose
  .connect(db)
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

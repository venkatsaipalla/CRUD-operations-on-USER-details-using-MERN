const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
  id: {
    type: "string",
    unique : true,
    required: true,
  },
  imageUrl: {
    type: "string",
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  gender: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    },
});
module.exports = UserTable = mongoose.model("UserTable", addSchema);

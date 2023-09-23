const mongoose = require("mongoose");

const technologySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestaps: true }
);

const Technology = mongoose.model("Technology", technologySchema);

module.exports = Technology;

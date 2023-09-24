const mongoose = require("mongoose");

const smartSearchHistorySchema = mongoose.Schema(
  {
    query: { type: String },
    smartSearchResponse: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
  },
  { timestaps: true }
);

const SmartSearchHistory = mongoose.model("SmartSearchHistory", smartSearchHistorySchema);

module.exports = SmartSearchHistory;

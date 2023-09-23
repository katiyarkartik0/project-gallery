const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    project: {
      title: { type: String, required: true },
      technologies: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Technology" },
      ],
    },
    technicalSkillSet: {
      frontend: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technology" }],
      backend: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technology" }],
      databases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technology" }],
      infrastructure: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Technology" },
      ],
    },
  },
  { timestaps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

const mongoose = require("mongoose");

const { trainOpenAiAndStoreEmbeddings } = require("./smartSearch");
const Project = require("../models/project");
const Technology = require("../models/technology");

const training = async () => {
  try {
    const projects = await Project.find()
      .populate("project.technologies") // Populate the "technologies" field within the "project" field
      .populate("technicalSkillSet.frontend") // Populate the "frontend" field within "technicalSkillSet"
      .populate("technicalSkillSet.backend") // Populate the "backend" field within "technicalSkillSet"
      .populate("technicalSkillSet.databases") // Populate the "databases" field within "technicalSkillSet"
      .populate("technicalSkillSet.infrastructure");

    await trainOpenAiAndStoreEmbeddings({ data: projects });
  } catch (err) {
    console.log(err);
  }
};

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await training();
  })
  .catch((err) => console.log(err));

const Project = require("../models/project");
const Technology = require("../models/technology");

const getProjects = async (req, res) => {
  try {
    const project = await Project.find()
      .populate("project.technologies") // Populate the "technologies" field within the "project" field
      .populate("technicalSkillSet.frontend") // Populate the "frontend" field within "technicalSkillSet"
      .populate("technicalSkillSet.backend") // Populate the "backend" field within "technicalSkillSet"
      .populate("technicalSkillSet.databases") // Populate the "databases" field within "technicalSkillSet"
      .populate("technicalSkillSet.infrastructure");
    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { getProjects };

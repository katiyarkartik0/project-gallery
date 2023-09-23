const { index, createEmbeddings } = require("../SmartSearch/smartSearch");
const { Validator } = require("../helpers/validator");
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

const searchProjects = async (req, res) => {
  let { clientQuery: query } = req.query;
  console.log(query);
  if (!query) {
    return res.status(400).json({ msg: "please send a valid query" });
  }
  query = query.replace("+", " ");
  console.log(query);

  const smartSearchQuery = async ({
    index,
    query,
    defaultNumOfQueries = 3,
  }) => {
    const queryEmbeddings = await createEmbeddings(query);
    const embedding = queryEmbeddings.data[0].embedding;

    const config = {
      vector: embedding,
      topK: defaultNumOfQueries,
      includeMetadata: true,
      includeValues: false,
    };
    const { matches } = await index.query(config);
    return matches.map(({ metadata }) => JSON.parse(metadata.dataObj));
  };
  try {
    const queryResponse = await smartSearchQuery({ index, query });
    console.log(queryResponse);
    return res.status(200).json({ queryResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { getProjects, searchProjects };

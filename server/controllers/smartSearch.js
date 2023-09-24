const { index, createEmbeddings } = require("../SmartSearch/smartSearch");
const SmartSearchHistory = require("../models/smartSearchHistory");
const Project = require("../models/project");
const Technology = require("../models/technology");
const mongoose = require("mongoose");

const smartSearchQuery = async ({ query, defaultNumOfQueries = 4 }) => {
  const queryEmbeddings = await createEmbeddings(query);
  const embedding = queryEmbeddings.data[0].embedding;

  const config = {
    vector: embedding,
    topK: defaultNumOfQueries,
    includeMetadata: true,
    includeValues: false,
  };
  const { matches } = await index.query(config);
  const queryResponse = matches.map(({ metadata }) =>
    JSON.parse(metadata.dataObj)
  );

  return queryResponse;
};

const createSmartSearchHistory = async ({ query, queryResponse }) => {
  const ObjectId = mongoose.Types.ObjectId;
  const smartSearchHistory = new SmartSearchHistory({
    query,
    smartSearchResponse: queryResponse.map(({ _id }) => new ObjectId(_id)),
  });
  console.log(
    queryResponse.map(({ _id }) => new ObjectId(_id)),
    "0000000000000000000000000000000000"
  );
  return await smartSearchHistory.save();
};

const searchProjects = async (req, res) => {
  let { clientQuery: query } = req.query;
  console.log(query);
  if (!query) {
    return res.status(400).json({ msg: "please send a valid query" });
  }
  query = query.replace("+", " ");
  console.log(query);

  try {
    const queryResponse = await smartSearchQuery({ query });
    console.log(queryResponse);
    await createSmartSearchHistory({ query, queryResponse });
    return res.status(200).json({ queryResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getSmartSearchHistory = async (req, res) => {
  try {
    const history = await SmartSearchHistory.find().populate({
      path: "smartSearchResponse",
      populate: [
        { path: "project.technologies" },
        { path: "technicalSkillSet.frontend" },
        { path: "technicalSkillSet.backend" },
        { path: "technicalSkillSet.databases" },
        { path: "technicalSkillSet.infrastructure" },
      ],
    });

    return res.status(200).json({ history });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { searchProjects, getSmartSearchHistory };

const express = require("express");
const smartSearchRoutes = express.Router();
const bodyParser = require("body-parser");
const { searchProjects, getSmartSearchHistory } = require("../controllers/smartSearch");

smartSearchRoutes.use(bodyParser.urlencoded({ extended: false }));
smartSearchRoutes.use(bodyParser.json());

smartSearchRoutes.get("/search",searchProjects)
smartSearchRoutes.get("/getHistory",getSmartSearchHistory)

module.exports = { smartSearchRoutes };
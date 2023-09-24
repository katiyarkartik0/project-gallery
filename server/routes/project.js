const express = require("express");
const projectRoutes = express.Router();
const bodyParser = require("body-parser");
const { getProjects } = require("../controllers/project");
const { searchProjects } = require("../controllers/smartSearch");

projectRoutes.use(bodyParser.urlencoded({ extended: false }));
projectRoutes.use(bodyParser.json());

projectRoutes.get("/getProjects",getProjects)
projectRoutes.get("/smartSearch",searchProjects)

module.exports = { projectRoutes };
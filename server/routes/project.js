const express = require("express");
const projectRoutes = express.Router();
const bodyParser = require("body-parser");
const { getProjects, searchProjects } = require("../controllers/project");

projectRoutes.use(bodyParser.urlencoded({ extended: false }));
projectRoutes.use(bodyParser.json());

projectRoutes.get("/getProjects",getProjects)
projectRoutes.get("/smartSearch",searchProjects)

module.exports = { projectRoutes };
const express = require("express");
const projectRoutes = express.Router();
const bodyParser = require("body-parser");
const { getProjects } = require("../controllers/project");

projectRoutes.use(bodyParser.urlencoded({ extended: false }));
projectRoutes.use(bodyParser.json());

projectRoutes.get("/getProjects",getProjects)

module.exports = { projectRoutes };
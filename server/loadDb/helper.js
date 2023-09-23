const Project = require("../models/project");
const Technology = require("../models/technology");

var XLSX = require("xlsx");

const createNewTechnology = async (tech) => {
  const technology = new Technology({ title: tech });
  let createdObj = {};
  try {
    createdObj = await technology.save();
  } catch (err) {
    console.log(err);
  }
  return createdObj;
};

const convertXlsxIntoJson = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const collectionOfJsonData = workbook.SheetNames.map((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const currJsonData = XLSX.utils.sheet_to_json(sheet);
    return currJsonData;
  });
  return collectionOfJsonData;
};

const isKeyEquivalentToAttribute = (key, attribute) =>
  key.toLowerCase().includes(attribute.toLowerCase());

const getObjectIdOfTech = async (tech) => {
  const { _id: techId } =
    (await Technology.findOne({ title: tech.trim() })) ||
    (await createNewTechnology(tech.trim()));
  return techId;
};

const getArrayOfTech = async (listOfTechInStrFormat) => {
  const arrayOfTech = listOfTechInStrFormat.split(",");
  let arrayOfTechObjId = [];
  for (let i = 0; i < arrayOfTech.length; i++) {
    const tech = arrayOfTech[i].trim();
    const objId = await getObjectIdOfTech(tech);
    arrayOfTechObjId.push(objId);
  }
  return arrayOfTechObjId;
};

const createNewProject = async ({
    title,
    arrayOfTechObjId,
    arrayOfFrontendTechObjId,
    arrayOfBackendTechObjId,
    arrayOfDatabaseTechObjId,
    arrayOfInfrastructureTechObjId,
}) => {
  const projectCollection = new Project({
    project: { title, technologies: arrayOfTechObjId },
    technicalSkillSet: {
      frontend: arrayOfFrontendTechObjId,
      backend: arrayOfBackendTechObjId,
      databases: arrayOfDatabaseTechObjId,
      infrastructure: arrayOfInfrastructureTechObjId,
    },
  });
  await projectCollection.save();
};

module.exports = {
  convertXlsxIntoJson,
  isKeyEquivalentToAttribute,
  getObjectIdOfTech,
  getArrayOfTech,
  createNewProject,
};

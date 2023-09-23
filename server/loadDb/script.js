const path = require("path");

const {
  convertXlsxIntoJson,
  isKeyEquivalentToAttribute,
  getArrayOfTech,
  createNewProject,
} = require("./helper");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const filePath = path.join(__dirname, "Parsed_FE Interviews_Cleaned.xlsx");
const collectionOfJsonData = convertXlsxIntoJson(filePath);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    for (let k = 0; k < collectionOfJsonData.length; k++) {
      const currJsonData = collectionOfJsonData[0];
      for (let j = 0; j < currJsonData.length; j++) {
        const project = currJsonData[j];
        const projectKeys = Object.keys(project);
        let title = "";
        let arrayOfTechObjId = [];
        let arrayOfFrontendTechObjId = [];
        let arrayOfBackendTechObjId = [];
        let arrayOfDatabaseTechObjId = [];
        let arrayOfInfrastructureTechObjId = [];
        for (let i = 0; i < projectKeys.length; i++) {
          const key = projectKeys[i];
          if (isKeyEquivalentToAttribute(key, "title")) {
            title = project[key];
          } else if (isKeyEquivalentToAttribute(key, "technologies")) {
            const listOfTechInStrFormat = project[key];
            arrayOfTechObjId = await getArrayOfTech(listOfTechInStrFormat);
          } else if (isKeyEquivalentToAttribute(key, "frontend")) {
            const listOfFrontendTechInStrFormat = project[key];
            arrayOfFrontendTechObjId = await getArrayOfTech(
              listOfFrontendTechInStrFormat
            );
          } else if (isKeyEquivalentToAttribute(key, "backend")) {
            const listOfBackendTechInStrFormat = project[key];
            arrayOfBackendTechObjId = await getArrayOfTech(
              listOfBackendTechInStrFormat
            );
          } else if (isKeyEquivalentToAttribute(key, "databases")) {
            const listOfDatabaseTechInStrFormat = project[key];
            arrayOfDatabaseTechObjId = await getArrayOfTech(
              listOfDatabaseTechInStrFormat
            );
          } else if (isKeyEquivalentToAttribute(key, "infra")) {
            const listOfInfrastructureTechInStrFormat = project[key];
            arrayOfInfrastructureTechObjId = await getArrayOfTech(
              listOfInfrastructureTechInStrFormat
            );
          }
        }
        await createNewProject({
          title,
          arrayOfTechObjId,
          arrayOfFrontendTechObjId,
          arrayOfBackendTechObjId,
          arrayOfDatabaseTechObjId,
          arrayOfInfrastructureTechObjId,
        });
      }
    }
  })

  .catch((err) => console.log(err));

const { isKeyEquivalentToAttribute } = require("./compareStrings");

const convertJsonToText = (chunk) => {
  chunk = JSON.parse(JSON.stringify(chunk))
  let text = "";
  const keysOfJsonChunk = Object.keys(chunk);
  for (let i = 0; i < keysOfJsonChunk.length; i++) {
    let tempText = "";
    const key = keysOfJsonChunk[i];
    if (isKeyEquivalentToAttribute(key, "project")) {
      const keysOfProject = Object.keys(chunk["project"]);
      for (let j = 0; j < keysOfProject.length; j++) {
        const currKey = keysOfProject[j];
        if (isKeyEquivalentToAttribute(currKey, "title")) {
          tempText += `The title of this project is ${chunk["project"]["title"]}. `;
        } else if (
          isKeyEquivalentToAttribute(currKey, "technologies") &&
          chunk["project"]["technologies"].length > 0
        ) {
          tempText += `The technologies used in this project includes ${chunk[
            "project"
          ]["technologies"]
            .map(({ title }) => title)
            .join(", ")}. `;
        }
      }
    } else if (isKeyEquivalentToAttribute(key, "technicalSkillSet")) {
      const keysOfProject = Object.keys(chunk[key]);
      for (let j = 0; j < keysOfProject.length; j++) {
        const currKey = keysOfProject[j];
        if (
          isKeyEquivalentToAttribute(currKey, "frontend") &&
          chunk["technicalSkillSet"]["frontend"].length > 0
        ) {
          tempText += `The frontend technologies used in this project includes ${chunk[
            "technicalSkillSet"
          ]["frontend"]
            .map(({ title }) => title)
            .join(", ")}. `;
        } else if (
          isKeyEquivalentToAttribute(currKey, "backend") &&
          chunk["technicalSkillSet"]["backend"].length > 0
        ) {
          tempText += `The backend technologies used in this project includes ${chunk[
            "technicalSkillSet"
          ]["backend"]
            .map(({ title }) => title)
            .join(", ")}. `;
        } else if (
          isKeyEquivalentToAttribute(currKey, "databases") &&
          chunk["technicalSkillSet"]["databases"].length > 0
        ) {
          tempText += `The databases technologies used in this project includes ${chunk[
            "technicalSkillSet"
          ]["databases"]
            .map(({ title }) => title)
            .join(", ")}. `;
        } else if (
          isKeyEquivalentToAttribute(currKey, "infra") &&
          chunk["technicalSkillSet"]["infrastructure"].length > 0
        ) {
          tempText += `The infrastructure technologies used in this project includes ${chunk[
            "technicalSkillSet"
          ]["infrastructure"]
            .map(({ title }) => title)
            .join(", ")}. `;
        }
      }
    }
    text += tempText;
  }
  return text;
};

// const text = convertJsonToText({
//   project: {
//     title: "Project 41",
//     technologies: [
//       { _id: "650ecb95bace77ef0624fe4c", title: "Java", __v: 0 },
//       { _id: "650ecb94bace77ef0624fe2c", title: "HTML", __v: 0 },
//     ],
//   },
//   technicalSkillSet: {
//     frontend: [{ _id: "650ecb95bace77ef0624fe5d", title: "React", __v: 0 }],
//     backend: [
//       { _id: "650ecb95bace77ef0624fe4c", title: "Java", __v: 0 },
//       { _id: "650ecb96bace77ef0624fe66", title: "Flask", __v: 0 },
//     ],
//     databases: [
//       { _id: "650ecb95bace77ef0624fe46", title: "MySQL", __v: 0 },
//       { _id: "650ecb96bace77ef0624fe6d", title: "Postgres", __v: 0 },
//     ],
//     infrastructure: [],
//   },
// });

// console.log(text);

module.exports = { convertJsonToText };

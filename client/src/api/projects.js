import { ENDPOINT } from "helpers/constants";

export const getProjects = async (accessToken) =>
  await fetch(`${ENDPOINT}/api/projects/getProjects`, {
    method: "GET",
    headers: { authorization: `JWT ${accessToken}` },
  });

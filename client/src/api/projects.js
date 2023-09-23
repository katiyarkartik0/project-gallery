import { ENDPOINT } from "helpers/constants";

export const getProjects = async (accessToken) =>
  await fetch(`${ENDPOINT}/api/projects/getProjects`, {
    method: "GET",
    headers: { authorization: `JWT ${accessToken}` },
  });

export const smartSearch = async ({ accessToken, query }) =>
  await fetch(`${ENDPOINT}/api/projects/smartSearch?clientQuery=${query}`, {
    method: "GET",
    headers: { authorization: `JWT ${accessToken}` },
  });

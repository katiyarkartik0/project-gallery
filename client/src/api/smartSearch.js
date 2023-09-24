import { ENDPOINT } from "helpers/constants";

export const smartSearch = async ({ accessToken, query }) =>
  await fetch(`${ENDPOINT}/api/smartSearch/search?clientQuery=${query}`, {
    method: "GET",
    headers: { authorization: `JWT ${accessToken}` },
  });

export const getSmartSearchHistory = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/smartSearch/getHistory`, {
    method: "GET",
    headers: { authorization: `JWT ${accessToken}` },
  });

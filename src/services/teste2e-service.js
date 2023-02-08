import apiFetch from "./api-fetch";

export async function sendUrl(body) {
  const responseTest = await apiFetch(`teste2e`, {
    body: body,
  })
  return responseTest;
}
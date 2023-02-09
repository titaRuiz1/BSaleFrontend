import apiFetch from "./api-fetch";

export async function sendUrl(body) {
  const responseTest = await apiFetch(`teste2e`, {
    body: body,
  })
  return responseTest;
}

export async function sendDataTestE2E(body){
  return await apiFetch('create_teste2e',{
    body:body
  })
}

export async function sendGithubUrl(body){
  return await apiFetch('github_repo',{
    body:body
  })
}
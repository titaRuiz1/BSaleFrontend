import apiFetch from "./api-fetch";

// export async function getAllResults() {
//   const allResults = await apiFetch(`admin/results`);
//   return allResults
// }

export async function getResult() {
  const result = await apiFetch(`result`);
  return result
}

export async function getApplicantResult(userId){
  return await apiFetch(`result/`+ userId);
}


export async function sendResults(body) {
  const results = await apiFetch(`result_create_or_update`, {
    body: body,
  })
  return results;
}


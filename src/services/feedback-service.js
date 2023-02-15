import apiFetch from "./api-fetch";


export async function sendFeedbacks(body) {
  const feedback = await apiFetch(`feedback`, {
    body: body,
  })
  return feedback;
}

export async function getApplicantFeedback(userId){
  return await apiFetch(`feedback/`+ userId);
}

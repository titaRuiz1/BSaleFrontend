import apiFetch from "./api-fetch";

export async function getAllPositions() {
  const allPositions = await apiFetch(`admin/index`);
  return allPositions
}


export async function getPositions() {
  const positions = await apiFetch(`positions`);
  return positions;
}

export async function getMultipleChoiceQuestions() {
  return await apiFetch(`positions_mchq`);
}

export async function getTestQuestions() {
  return await apiFetch(`positions_tq`);
}
export async function getChallengeEvaluations() {
  const challenge = await apiFetch(`positions_ev`);
  console.log('CHALLENGE:', challenge)
  return challenge
}

export async function getSolutions() {
  const solutions = await apiFetch(`solutions`);
  return solutions;
}


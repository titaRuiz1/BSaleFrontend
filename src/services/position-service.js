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
  return challenge
}

export async function getSolutions() {
  const solutions = await apiFetch(`solutions`);
  return solutions;
}


export async function getSolutionsByPosition(position_id) {
  const solutions = await apiFetch(`solutions/${position_id}`);
  return solutions;
}

export async function getStages() {
  const stages = await apiFetch(`positions_stg`);
  return stages;
}

export async function getCriterias() {
  return await apiFetch(`criterias`);
}

export async function createPosition(body) {
  const position = await apiFetch(`/admin/create_position`, {
    body: body,
  })
  return position;
}


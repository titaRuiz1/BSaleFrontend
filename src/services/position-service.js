import apiFetch from "./api-fetch";


export async function getPositions() {
  const positions = await apiFetch(`positions`);
  return positions;
}

export async function getMultipleChoiceQuestions() {
  return await apiFetch(`positions_mchq`);
}

export async function getSolutions() {
  const solutions = await apiFetch(`solutions`);
  return solutions;
}
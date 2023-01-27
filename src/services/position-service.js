import apiFetch from "./api-fetch";


export async function getPositions(){
  const positions = await apiFetch(`positions`);
  return positions;
}

export async function getMultipleChoiceQuestions(){
  return await apiFetch(`positions_mchq`);
}

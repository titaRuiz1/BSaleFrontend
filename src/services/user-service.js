import apiFetch from "./api-fetch";

export async function getPositionApplicants(positionId){
  console.log("ID", positionId);
  return await apiFetch(`position_applicants/`+ positionId);
}

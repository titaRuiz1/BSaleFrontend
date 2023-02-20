import { tokenKey } from "../config";
import apiFetch from "./api-fetch";

export async function getPositionApplicants(positionId) {
  return await apiFetch(`position_applicants/` + positionId);
}

export async function createUser(newUser) {
  return await apiFetch("admin/create", { body: newUser });
}

export async function updateUser(body) {
  return await apiFetch("update_current", {
    body: body,
    method: "PATCH",
  });

}

export async function deleteUser(user_id) {
  return await apiFetch(`/user/${user_id}`, {
    method: "DELETE",
  });
}
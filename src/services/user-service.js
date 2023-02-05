import apiFetch from "./api-fetch";


export async function stateUser() {
  await apiFetch("state", { method: "PATCH" });
}

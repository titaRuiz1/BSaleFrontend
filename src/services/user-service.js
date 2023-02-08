import { tokenKey } from "../config";
import apiFetch from "./api-fetch";



export async function createUser(newUser) {
  const { token, ...user } = await apiFetch("admin/create", { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}
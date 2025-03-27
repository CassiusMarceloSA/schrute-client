import { request } from "@/utils";

export async function getTasks() {
  const { data } = await request.get("/tasks");
  return data;
}
export async function createTask() {}
export async function updateTask() {}
export async function deleteTask() {}

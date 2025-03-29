import { CreateTaskPayload } from "@/app/api/tasks/models";
import { Task } from "@/models";
import { request } from "@/utils";

type GetTasksResponse = {
  tasks: Task[];
  total: number;
};

export async function getTasks(): Promise<GetTasksResponse> {
  const { data } = await request.get("/tasks");
  return data;
}

export async function updateTaskStatus(
  id: string,
  status: string
): Promise<Task> {
  const { data } = await request.put(`/tasks/${id}/status`, { status });
  return data;
}

export async function createTask(payload: CreateTaskPayload) {
  const { data } = await request.post("/tasks", payload);
  return data;
}

export async function updateTask() {}
export async function deleteTask() {}

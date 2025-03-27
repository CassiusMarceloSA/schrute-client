import { Task } from "@/models";

export type CreateTaskPayload = Pick<Task, "description" | "title" | "status" | "duration">;

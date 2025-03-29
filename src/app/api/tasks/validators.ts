import { z } from "zod";

const statusValidator = z.enum(["backlog", "doing", "done", "todo"], {
  message:
    "Status is required and should be one of the following: backlog, doing, done, todo",
});

const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: statusValidator,
  duration: z.number().min(1, { message: "Duration is required" }),
});

const updateStatusSchema = z.object({
  status: statusValidator,
});

export function validateUpdateStatus(body: Record<string, string>) {
  return updateStatusSchema.safeParse(body);
}

export function validateCreateTask(body: Record<string, string>) {
  return createTaskSchema.safeParse(body);
}

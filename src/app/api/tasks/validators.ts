import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["backlog", "doing", "done", "todo"], {
    message:
      "Status is required and should be one of the following: backlog, doing, done, todo",
  }),
  duration: z.string().min(1, { message: "Duration is required" }),
});

export function validateCreateTask(body: any) {
  return createTaskSchema.safeParse(body);
}

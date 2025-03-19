import { Task } from ".";

export type ColumnEnum = "backlog" | "todo" | "doing" | "done";

export type Column = {
  id: ColumnEnum;
  tasks: Task[];
};
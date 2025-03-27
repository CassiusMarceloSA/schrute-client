import { Board, ColumnEnum, Task } from "@/models";

const getByStatus = (list: Task[], status: ColumnEnum) => {
  return list.filter((task) => task.status === status);
};

export const mapTasksToBoard = (tasks: Task[]) => {
  return {
    columns: {
      backlog: {
        id: "backlog",

        tasks: getByStatus(tasks, "backlog"),
      },
      todo: {
        id: "todo",
        tasks: getByStatus(tasks, "todo"),
      },
      doing: {
        id: "doing",

        tasks: getByStatus(tasks, "doing"),
      },
      done: {
        id: "done",

        tasks: getByStatus(tasks, "done"),
      },
    },
  } satisfies Board;
};

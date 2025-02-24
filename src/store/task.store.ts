import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  duration: number;
};

type TaskState = {
  tasks: Task[];
  idIncrementor: number;
};

type TaskActions = {
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (task: Task) => void;
};

type TaskStore = TaskState & TaskActions;

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      idIncrementor: 1,
      addTask: (task: Task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
          idIncrementor: state.idIncrementor + 1,
        })),
      removeTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (task: Task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
    }),
    { name: "task-storage" }
  )
);

export default useTaskStore;

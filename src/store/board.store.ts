import { Board, Column, ColumnEnum, Task } from "@/models";
import { create } from "zustand";
import { mapTasksToBoard } from "./utils";

type BoardState = {
  board: Board;
  searchString: string;
  image: File | null;
  draggedItem?: Task;
};

type BoardActions = {
  setBoard: (tasks: Task[]) => void;
  setColumn: (columnId: ColumnEnum, column: Column) => void;
  updateTodoInDB?: (task: Task, columnId: ColumnEnum) => void;
  setSearchString: (searchString: string) => void;
  setNewTask: (task: Task) => void;
  setImage: (image: File | null) => void;
  setDraggedItem: (task?: Task) => void;
};

type BoardStore = BoardState & BoardActions;

const useTaskStore = create<BoardStore>()((set) => {
  return {
    board: {
      columns: {
        backlog: {
          id: "backlog",
          title: "Backlog",
          tasks: [],
        },
        todo: {
          id: "todo",
          title: "To Do",
          tasks: [],
        },
        doing: {
          id: "doing",
          title: "Doing",
          tasks: [],
        },
        done: {
          id: "done",
          title: "Done",
          tasks: [],
        },
      },
    },
    searchString: "",
    image: null,
    setBoard: (tasks) => {
      set({ board: mapTasksToBoard(tasks) });
    },
    setSearchString: (searchString) => {
      set({ searchString });
    },
    setImage: (image) => {
      set({ image });
    },
    setNewTask: (task) => {
      set((state) => ({
        ...state,
        board: {
          ...state.board,
          columns: {
            ...state.board.columns,
            [task.status]: {
              ...state.board.columns[task.status],
              tasks: [...state.board.columns[task.status].tasks, task],
            },
          },
        },
      }));
    },
    setColumn: (columnId, column) => {
      set((state) => ({
        ...state,
        board: {
          ...state.board,
          columns: {
            ...state.board.columns,
            [columnId]: column,
          },
        },
      }));
    },
    setDraggedItem: (task) => {
      set((state) => ({
        ...state,
        draggedItem: task,
      }));
    },
  };
});

export default useTaskStore;

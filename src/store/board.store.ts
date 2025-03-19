import { Board, Column, ColumnEnum, Task } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BoardState = {
  board: Board;
  searchString: string;
  image: File | null;
};

type BoardActions = {
  getBoard?: () => Board;
  setBoard: (board: Board) => void;
  setColumn: (columnId: ColumnEnum, column: Column) => void;
  updateTodoInDB?: (task: Task, columnId: ColumnEnum) => void;
  setSearchString: (searchString: string) => void;
  setNewTask: (task: Task) => void;
  setImage: (image: File | null) => void;
};

type BoardStore = BoardState & BoardActions;

const getByStatus = (list: Task[], status: ColumnEnum) => {
  return list.filter((task) => task.status === status);
};

export const INITIAL_STATE = [
  { title: "Definir escopo do projeto", id: "1", status: "backlog" },
  { title: "Reunir requisitos", id: "2", status: "backlog" },
  { title: "Criar wireframes", id: "3", status: "backlog" },
  { title: "Configurar ambiente de desenvolvimento", id: "4", status: "todo" },
  { title: "Criar repositório no GitHub", id: "5", status: "todo" },
  { title: "Escrever documentação inicial", id: "6", status: "todo" },
  { title: "Desenvolver autenticação de usuários", id: "7", status: "doing" },
  { title: "Implementar API de produtos", id: "8", status: "doing" },
  { title: "Criar interface de usuário", id: "9", status: "doing" },
  { title: "Testar funcionalidades básicas", id: "10", status: "done" },
  { title: "Revisar código", id: "11", status: "done" },
  { title: "Realizar deploy inicial", id: "12", status: "done" },
  { title: "Coletar feedback dos usuários", id: "13", status: "backlog" },
  { title: "Planejar iterações futuras", id: "14", status: "backlog" },
  { title: "Atualizar documentação", id: "15", status: "todo" },
  { title: "Otimizar performance do sistema", id: "16", status: "doing" },
  { title: "Corrigir bugs reportados", id: "17", status: "doing" },
  { title: "Finalizar relatório de projeto", id: "18", status: "done" },
  {
    title: "Apresentar resultados para stakeholders",
    id: "19",
    status: "done",
  },
  { title: "Arquivar projeto", id: "20", status: "done" },
] as Task[];

const useTaskStore = create<BoardStore>()(
  persist(
    (set) => ({
      board: {
        columns: {
          backlog: {
            id: "backlog",
            title: "Backlog",
            tasks: getByStatus(INITIAL_STATE, "backlog"),
          },
          todo: {
            id: "todo",
            title: "To Do",
            tasks: getByStatus(INITIAL_STATE, "todo"),
          },
          doing: {
            id: "doing",
            title: "Doing",
            tasks: getByStatus(INITIAL_STATE, "doing"),
          },
          done: {
            id: "done",
            title: "Done",
            tasks: getByStatus(INITIAL_STATE, "done"),
          },
        },
      },
      searchString: "",
      image: null,
      setBoard: (board) => {
        set({ board });
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
    }),
    { name: "task-storage" }
  )
);

export default useTaskStore;

import { type Task as TaskType } from "@/store/task.store";
import { Button } from "@/components";
import { Column, Container, Task } from ".";
import { move, reorder } from "./utils";
import { useState } from "react";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { Plus } from "lucide-react";

export type BoardColumn = {
  title: string;
  tasks: TaskType[];
  action?: typeof Button;
};

type Props = {
  columns: BoardColumn[];
};

const Board = () => {
  const [cards, setCards] = useState(items);
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <div className="flex h-full w-full gap-3 overflow-scroll p-12">
        <Column
          column="backlog"
          title="Backlog"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          column="todo"
          title="To Do"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          column="doing"
          title="Doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          column="done"
          title="Done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
        />
      </div>
    </div>
  );
};

export default Board;

const items = [
  { title: "Definir escopo do projeto", id: "1", column: "backlog" },
  { title: "Reunir requisitos", id: "2", column: "backlog" },
  { title: "Criar wireframes", id: "3", column: "backlog" },
  { title: "Configurar ambiente de desenvolvimento", id: "4", column: "todo" },
  { title: "Criar repositório no GitHub", id: "5", column: "todo" },
  { title: "Escrever documentação inicial", id: "6", column: "todo" },
  { title: "Desenvolver autenticação de usuários", id: "7", column: "doing" },
  { title: "Implementar API de produtos", id: "8", column: "doing" },
  { title: "Criar interface de usuário", id: "9", column: "doing" },
  { title: "Testar funcionalidades básicas", id: "10", column: "done" },
  { title: "Revisar código", id: "11", column: "done" },
  { title: "Realizar deploy inicial", id: "12", column: "done" },
  { title: "Coletar feedback dos usuários", id: "13", column: "backlog" },
  { title: "Planejar iterações futuras", id: "14", column: "backlog" },
  { title: "Atualizar documentação", id: "15", column: "todo" },
  { title: "Otimizar performance do sistema", id: "16", column: "doing" },
  { title: "Corrigir bugs reportados", id: "17", column: "doing" },
  { title: "Finalizar relatório de projeto", id: "18", column: "done" },
  {
    title: "Apresentar resultados para stakeholders",
    id: "19",
    column: "done",
  },
  { title: "Arquivar projeto", id: "20", column: "done" },
];

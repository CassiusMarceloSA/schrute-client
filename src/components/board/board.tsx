import { type Task as TaskType } from "@/store/task.store";
import { Button } from "@/components";
import { Column, Container, Task } from ".";
import { move, reorder } from "./utils";
import { useState } from "react";
import { OnDragEndResponder } from "react-beautiful-dnd";

export type BoardColumn = {
  title: string;
  tasks: TaskType[];
  action?: typeof Button;
};

type Props = {
  columns: BoardColumn[];
};

export function Board(props: Props) {
  const [state, setState] = useState(props.columns);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd].tasks, source.index, destination.index);
      const newState = Array.from(state);
      newState[sInd].tasks = items as TaskType[];
      setState(newState);
    } else {
      const result = move(
        state[sInd].tasks,
        state[dInd].tasks,
        source,
        destination
      );
      const newState = [...state];
      newState[sInd].tasks = result[sInd];
      newState[dInd].tasks = result[dInd];

      setState(newState);
    }
  };

  return (
    <Container onDragEnd={onDragEnd}>
      {state.map((column, index) => (
        <Column
          droppableId={index.toString()}
          title={column.title}
          tasks={column.tasks}
          key={index}
        />
      ))}
    </Container>
  );
}

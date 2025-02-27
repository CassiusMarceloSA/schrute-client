"use client";

import { Board } from "@/components";
import { TaskFormModal, formSchema } from "@/components/task-form";
import { useTaskStore } from "@/store";
import { useState } from "react";
import { Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd";
import { z } from "zod";

const TASKS = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    duration: 10,
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    duration: 20,
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    duration: 30,
    completed: false,
    createdAt: new Date(),
  },
];

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  console.log({ source, destination, droppableSource, droppableDestination });
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {} as any;
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function Home() {
  const { addTask, idIncrementor } = useTaskStore();
  const [state, setState] = useState(TASKS);

  const onSubmitTask = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    return;
    addTask({
      id: idIncrementor,
      title: data.title,
      description: data.description,
      duration: data.duration,
      completed: false,
      createdAt: new Date(),
    });
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state, source.index, destination.index);
      const newState = [...items] as typeof TASKS;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <TaskFormModal onSubmit={onSubmitTask} closeAfterSubmit />
      <div className="flex bg-zinc-400">
        <Board.Container onDragEnd={onDragEnd}>
          <Droppable
            droppableId="1"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
            direction="vertical"
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {state.map((item, index) => (
                  <Draggable
                    draggableId={item.id.toString()}
                    index={index}
                    key={item.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </Board.Container>
      </div>
    </div>
  );
}

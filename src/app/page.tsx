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
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
    duration: 30,
    completed: false,
    createdAt: new Date(),
  },
];

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

  const getTasks = (idx: number) => {
    if (idx === 0) return [TASKS[0], TASKS[1]];
    return [TASKS[idx + 1]];
  };

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="flex bg-zinc-400">
        <Board
          columns={["TO DO", "DOING", "DONE"].map((title, index) => ({
            tasks: getTasks(index),
            title,
          }))}
        />
      </div>
    </div>
  );
}

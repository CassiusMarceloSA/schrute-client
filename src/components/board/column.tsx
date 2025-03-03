import { type Task as TaskType } from "@/store/task.store";
import { JSX } from "react";
import { Draggable, Droppable, DroppableProps } from "react-beautiful-dnd";
import { Task } from ".";
import { getItemStyle, getListStyle } from "./utils";

type Props = {
  title: string;
  tasks: TaskType[];
} & Omit<DroppableProps, "children">;

export function Column({ title, ...props }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      <Droppable
        isDropDisabled={false}
        isCombineEnabled={true}
        ignoreContainerClipping={false}
        direction="vertical"
        {...props}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => (
              <Task
                item={task}
                index={index}
                draggableId={task.id.toString()}
                key={task.id}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

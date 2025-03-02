import { Task } from "@/store/task.store";
import {
  Draggable,
  DraggableProps
} from "react-beautiful-dnd";

type Props = Omit<DraggableProps, "children"> & {
  item: Task;
  // children?: React.ReactElement;
};

export function Task({ ...props }: Props) {
  return (
    <Draggable key={props.item.id} {...props}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.item.title}
        </div>
      )}
    </Draggable>
  );
}

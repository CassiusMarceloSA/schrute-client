import { Task } from "@/store/task.store";
import { Draggable, DraggableProps } from "react-beautiful-dnd";
import { getItemStyle } from "./utils";

type Props = Omit<DraggableProps, "children"> & {
  item: Task;
  // children?: React.ReactElement;
};

export function Task({ ...props }: Props) {
  return (
    <Draggable key={props.item.id} {...props}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.item.title}
        </div>
      )}
    </Draggable>
  );
}

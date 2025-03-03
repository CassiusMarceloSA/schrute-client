import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

export function BoardContainer(props: DragDropContextProps) {
  return <DragDropContext {...props}></DragDropContext>;
}

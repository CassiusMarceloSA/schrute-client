import { Task as TaskType } from "@/models";
import DropIndicator from "./drop-indicator";

type Props = {
  item: TaskType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: TaskType) => void;
};

const Card = (props: Props) => {
  return (
    <>
      <DropIndicator beforeId={props.item?.id} column={props.item?.status} />
      <div
        draggable
        onDragStart={(e) => props.handleDragStart(e, props?.item)}
        className="cursor-grab rounder border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{props.item?.title}</p>
      </div>
    </>
  );
};

export default Card;

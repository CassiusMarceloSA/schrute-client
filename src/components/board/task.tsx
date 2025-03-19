import { Task as TaskType } from "@/models";
import DropIndicator from "./drop-indicator";
import { useState } from "react";

type Props = {
  item: TaskType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: TaskType) => void;
};

const Card = (props: Props) => {
  const [dragging, setDragging] = useState(false);
  const bg = !dragging ? "bg-neutral-800" : "bg-yellow-800";
  return (
    <>
      <DropIndicator beforeId={props.item?.id} column={props.item?.status} />
      <div
        draggable
        onDragStart={(e) => {
          props.handleDragStart(e, props?.item);
          setDragging(true);
        }}
        onDragEnd={() => setDragging(false)}
        className={`cursor-grab rounder border border-neutral-700 p-3 active:cursor-grabbing my-1 ${bg}`}
      >
        <p className="text-sm text-neutral-100">{props.item?.title}</p>
      </div>
    </>
  );
};

export default Card;

import { Task as TaskType } from "@/models";
import DropIndicator from "./drop-indicator";
import { useState } from "react";
import { TwBackgroundColor } from "@/utils";

type Props = {
  item: TaskType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: TaskType) => void;
};

const Card = (props: Props) => {
  const [dragging, setDragging] = useState(false);
  const bg = !dragging ? "bg-neutral-800" : "bg-purple-950";
  const border = !dragging ? "border-neutral-700" : "border-purple-800";
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
        className={`cursor-grab rounder border overflow-hidden p-3 active:cursor-grabbing my-1 ${border} ${bg}`}
      >
        <p className="text-sm text-neutral-100 my-2">{props.item?.title}</p>
        <p className="text-xs text-neutral-400">{props.item?.description}</p>
      </div>
    </>
  );
};

export default Card;

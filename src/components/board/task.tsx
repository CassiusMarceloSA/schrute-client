import { Task as TaskType } from "@/models";
import { useState } from "react";
import DropIndicator from "./drop-indicator";
import { getColumnColor } from "./utils";

type Props = {
  item: TaskType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: TaskType) => void;
  handleClick: () => void;
  isDraggable?: boolean;
  showDescription?: boolean;
};

const Card = ({ isDraggable = true, ...props }: Props) => {
  const [dragging, setDragging] = useState(false);
  const bg = !dragging ? "bg-neutral-800" : "bg-neutral-800/30";
  const border = !dragging
    ? "border-neutral-700"
    : getColumnColor("border", props.item?.status, 50);
  const cursor = isDraggable
    ? "cursor-grab active:cursor-grabbing"
    : "cursor-default";
  const textSize = props.showDescription ? "text-base" : "text-sm";

  return (
    <>
      <DropIndicator
        withHighlight={!dragging}
        beforeId={props.item?.id}
        column={props.item?.status}
      />
      <div
        draggable={isDraggable}
        onDragStart={(e) => {
          props.handleDragStart(e, props?.item);
          setDragging(true);
        }}
        onDragEnd={() => setDragging(false)}
        className={`rounded-sm border overflow-hidden p-3  my-1 ${border} ${bg} ${cursor}`}
        onClick={props.handleClick}
      >
        <p className={` text-neutral-100 my-2 ${textSize}`}>
          {props.item?.title}
        </p>
        {props.showDescription && (
          <p className="text-xs text-neutral-400">{props.item?.description}</p>
        )}
      </div>
    </>
  );
};

export default Card;

import { Task as TaskType } from "@/models";
import { useState } from "react";
import DropIndicator from "./drop-indicator";
import { getColumnColor } from "./utils";

type Props = {
  item: TaskType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: TaskType) => void;
};

const Card = (props: Props) => {
  const [dragging, setDragging] = useState(false);
  const bg = !dragging ? "bg-neutral-800" : "bg-neutral-800/30";
  const border = !dragging
    ? "border-neutral-700"
    : getColumnColor("border", props.item?.status, 50);

  return (
    <>
      <DropIndicator
        withHighlight={!dragging}
        beforeId={props.item?.id}
        column={props.item?.status}
      />
      <div
        draggable
        onDragStart={(e) => {
          props.handleDragStart(e, props?.item);
          setDragging(true);
        }}
        onDragEnd={() => setDragging(false)}
        className={`cursor-grab rounded-sm border overflow-hidden p-3 active:cursor-grabbing my-1 ${border} ${bg}`}
      >
        <p className="text-base text-neutral-100 my-2">{props.item?.title}</p>
        <p className="text-xs text-neutral-400">{props.item?.description}</p>
      </div>
    </>
  );
};

export default Card;

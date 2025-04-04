import { ColumnEnum } from "@/models";
import { useBoardStore } from "@/store";
import { useState } from "react";
import { getColumnColor } from "./utils";

type Props = {
  beforeId: string;
  column: ColumnEnum;
  withHighlight?: boolean;
  fullHeight?: boolean;
};

const DropIndicator = ({ withHighlight = true, ...props }: Props) => {
  const [active, setActive] = useState(false);
  const { draggedItem } = useBoardStore();
  const isSameColumn = props.column === draggedItem?.status;
  const highlightColor = getColumnColor("border", props.column, 40);
  const height =
    (isSameColumn && active && withHighlight) || props.fullHeight
      ? `h-24`
      : "h-1";
  const opacity =
    isSameColumn && active && withHighlight ? "opacity-1" : "opacity-0";

  const handleActive = () => {
    if (isSameColumn) {
      setActive(true);
    }
  };

  const resetActive = () => {
    if (active) {
      setActive(false);
    }
  };

  return (
    <div
      data-before={props.beforeId || "-1"}
      data-column={props.column}
      onDragEnter={handleActive}
      onDragEnd={resetActive}
      onDrop={resetActive}
      onDragLeave={resetActive}
      className={`${height} w-full h- border border-dashed rounded-sm ${highlightColor} ${opacity}`}
    ></div>
  );
};

export default DropIndicator;

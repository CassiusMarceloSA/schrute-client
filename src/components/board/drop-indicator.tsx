import { ColumnEnum } from "@/models";
import { useBoardStore } from "@/store";
import { TW_BOARD_COLORS } from "@/utils";
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
  const height = (isSameColumn && active) || props.fullHeight ? `h-32` : "h-1";
  const opacity =
    isSameColumn && active && withHighlight ? "opacity-1" : "opacity-0";

  return (
    <div
      data-before={props.beforeId || "-1"}
      data-column={props.column}
      onDragEnter={() => setActive(true)}
      onDragEnd={() => setActive(false)}
      onDrop={() => setActive(false)}
      onDragLeave={() => setActive(false)}
      className={`${height} w-full border border-dashed ${highlightColor} ${opacity}`}
    ></div>
  );
};

export default DropIndicator;

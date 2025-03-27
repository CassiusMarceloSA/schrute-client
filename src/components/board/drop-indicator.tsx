import { ColumnEnum } from "@/models";
import { useEffect, useState } from "react";

type Props = {
  beforeId: string;
  column: ColumnEnum;
  withHighlight?: boolean;
  fullHeight?: boolean;
};

const DropIndicator = ({ withHighlight = true, ...props }: Props) => {
  const [active, setActive] = useState(false);
  const height = active || props.fullHeight ? `h-32` : "h-1";
  const opacity = active && withHighlight ? "opacity-1" : "opacity-0";
  useEffect(() => {
    return () => setActive(false);
  }, []);

  return (
    <div
      data-before={props.beforeId || "-1"}
      data-column={props.column}
      onDragEnter={() => setActive(true)}
      onDragEnd={() => setActive(false)}
      onDrop={() => setActive(false)}
      onDragLeave={() => setActive(false)}
      className={`${height} w-full border border-dashed border-purple-700 ${opacity}`}
    ></div>
  );
};

export default DropIndicator;

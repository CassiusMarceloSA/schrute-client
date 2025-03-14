import { ColumnEnum } from "@/models";

type Props = {
  beforeId: string;
  column: ColumnEnum;
};

const DropIndicator = (props: Props) => {
  return (
    <div
      data-before={props.beforeId || "-1"}
      data-column={props.column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
};

export default DropIndicator;

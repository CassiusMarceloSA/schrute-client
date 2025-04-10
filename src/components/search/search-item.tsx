import { Badge } from "@/components/shared";
import { ColumnEnum, Task } from "@/models";
import { TW_BOARD_COLORS } from "@/utils";

type Props = {
  task: Task;
  handleClick: () => void;
};
const BOARD_ORDER = ["backlog", "todo", "doing", "done"] satisfies ColumnEnum[];

export const SearchItem = ({ task, handleClick }: Props) => {
  const color = TW_BOARD_COLORS[BOARD_ORDER.indexOf(task.status)].replace(
    "-500",
    ""
  ) as any;
  return (
    <li
      onClick={handleClick}
      key={task.id}
      className="bg-neutral-900 flex flex-row justify-between items-center border border-neutral-800 text-neutral-300 p-4 rounded-md shadow-md w-[600px] cursor-pointer"
    >
      <h3 className="text-base font-semibold">{task.title}</h3>
      <Badge variant={color}>{task.status.toUpperCase()}</Badge>
    </li>
  );
};

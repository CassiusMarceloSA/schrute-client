import { cn } from "@/lib/utils";
import { ColumnEnum, Task } from "@/models";
import { TW_BOARD_COLORS } from "@/utils";

type Props = {
  task: Task;
};
const BOARD_ORDER = ["backlog", "todo", "doing", "done"] satisfies ColumnEnum[];

export const SearchItem = ({ task }: Props) => {
  const color = TW_BOARD_COLORS[BOARD_ORDER.indexOf(task.status)];
  const style = {
    bg: `bg-${color}`,
    text: `text-${color}`.replace("-500", "-800"),
  };
  const badgeClasses = "text-sm font-medium rounded-sm text-center px-4 py-1 w-24";

  return (
    <li
      key={task.id}
      className="bg-neutral-900 flex flex-row justify-between items-center border border-neutral-800 text-neutral-300 p-4 rounded-md shadow-md w-[600px] cursor-pointer"
    >
      <h3 className="text-base font-semibold">{task.title}</h3>
      <span className={cn(badgeClasses, style.bg, style.text)}>
        {task.status.toUpperCase()}
      </span>
    </li>
  );
};

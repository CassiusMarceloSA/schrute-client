import { Task } from "@/models";
import { SearchItem } from "./search-item";

type Props = {
  tasks: Task[];
  setSelectedTask: (task: Task) => void;
};

export const SearchContent = ({ tasks, setSelectedTask }: Props) => {
  return (
    <ul className="max-h-[450px] scrollbar-hide flex items-center flex-col gap-3 overflow-y-auto z-50">
      {tasks?.map((task) => (
        <SearchItem
          key={task.id}
          task={task}
          handleClick={() => setSelectedTask(task)}
        />
      ))}
    </ul>
  );
};

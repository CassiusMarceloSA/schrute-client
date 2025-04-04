import { Loader } from "@/components/shared";
import { ColumnEnum } from "@/models";
import { taskService } from "@/services";
import { useBoardStore } from "@/store";
import { TW_BOARD_COLORS } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Column } from ".";
import { CreateTaskPayload } from "@/app/api/tasks/models";

const Board = () => {
  const { board, setColumn, setBoard } = useBoardStore();
  const fetchTasks = async () => {
    const { tasks } = await taskService.getTasks();
    setBoard(tasks);
    return tasks;
  };

  const updateTask = async (id: string, status: ColumnEnum) => {
    await taskService.updateTaskStatus(id, status);
  };

  const { refetch, isFetching, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateTaskMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ColumnEnum }) =>
      updateTask(id, status),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: addTaskMutation, isPending: isAdding } = useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskService.createTask(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const columns = Object.values(board.columns);

  const isRefetching = !isLoading && (isFetching || isUpdating);

  return (
    <div className="h-full px-8 overflow-hidden text-neutral-200 rounded-lg">
      {isRefetching && <Loader />}
      <div className="flex justify-center h-full w-full gap-3 py-8">
        {columns.map((item, index) => (
          <Column
            isLoading={isLoading}
            key={item.id}
            column={item.id}
            title={item.id}
            color={TW_BOARD_COLORS[index]}
            cards={item.tasks}
            setColumn={setColumn}
            updateCardStatus={(taskId, status) =>
              updateTaskMutation({ id: taskId, status })
            }
            addTask={addTaskMutation}
            isAdding={isAdding}
          />
        ))}
      </div>
    </div>
  );
};
export default Board;

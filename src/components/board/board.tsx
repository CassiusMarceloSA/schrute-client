import { Loader } from "@/components/shared";
import { ColumnEnum } from "@/models";
import { taskService } from "@/services";
import { useBoardStore } from "@/store";
import { TW_BOARD_COLORS } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Column } from ".";
import { CreateTaskPayload } from "@/app/api/tasks/models";
import { useFetchTasks } from "@/hooks";
import { BoardInsights } from "./board-insights";

const Board = () => {
  const { board, setColumn, setBoard } = useBoardStore();
  const { refetch, isFetching, isLoading } = useFetchTasks({
    select: setBoard,
  });
  const updateTask = async (id: string, status: ColumnEnum) => {
    await taskService.updateTaskStatus(id, status);
  };

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
    <div className="h-full overflow-hidden text-neutral-200 rounded-lg">
      {isRefetching && <Loader />}
      <div className="grid grid-cols-12 gap-4 h-full py-8">
        <BoardInsights />
        <div className="flex justify-between col-span-8 h-full w-full gap-3">
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
    </div>
  );
};
export default Board;

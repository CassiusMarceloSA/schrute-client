import { Board } from "@/models";
import { taskService } from "@/services";
import { useBoardStore } from "@/store";
import { TW_BOARD_COLORS } from "@/utils";
import { useCallback, useEffect } from "react";
import { Column } from ".";


const Board = () => {
  const { board, setColumn, setBoard } = useBoardStore();
  const columns = Object.values(board.columns);

  const fetchTasks = useCallback(async () => {
    console.log('rerendered')
    const { tasks } = await taskService.getTasks();
    setBoard(tasks);
  }, [setBoard]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="h-screen w-full bg-neutral-900 overflow-x-hidden overflow-y-auto text-neutral-50">
      <div className="flex h-full w-full gap-3 px-12">
        {columns.map((item, index) => (
          <Column
            key={item.id}
            column={item.id}
            title={item.id}
            color={TW_BOARD_COLORS[index]}
            cards={item.tasks}
            setColumn={setColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;

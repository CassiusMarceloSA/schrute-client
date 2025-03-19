import { Column } from ".";
import { useState } from "react";
// import { Board as BoardType, Task as TaskType } from "@/models";
import { INITIAL_STATE } from "@/store/board.store";
import { useBoardStore } from "@/store";
import { TwTextColor } from "@/utils";

// type Props = BoardType;

const Board = () => {
  const { board, setColumn } = useBoardStore();
  const columns = Object.values(board.columns);
  const COLORS = [
    "text-orange-500",
    "text-yellow-500",
    "text-blue-500",
    "text-emerald-500",
  ] satisfies TwTextColor[];
  
  return (
    <div className="h-screen w-full bg-neutral-900 overflow-x-hidden overflow-y-auto text-neutral-50">
      <div className="flex h-full w-full gap-3 p-12">
        {columns.map((item, index) => (
          <Column
            key={item.id}
            column={item.id}
            title={item.id}
            headingColor={COLORS[index]}
            cards={item.tasks}
            setColumn={setColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;

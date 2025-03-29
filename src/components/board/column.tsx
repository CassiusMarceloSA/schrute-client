import { ColumnEnum, Column as ColumnType, Task as TaskType } from "@/models";
import { useBoardStore } from "@/store";
import { TwBackgroundColor, Color as TwColor } from "@/utils";
import { useState } from "react";
import { TaskFormModal } from "../task-form";
import { Skeleton } from "../ui/skeleton";
import DropIndicator from "./drop-indicator";
import Task from "./task";
import { getIndicators, getNearestIndicator, reorder } from "./utils";
import { CreateTaskPayload } from "@/app/api/tasks/models";

type DragEvent = React.DragEvent<HTMLDivElement>;

type ColumnProps = {
  title: string;
  color: TwColor;
  column: ColumnEnum;
  cards: TaskType[];
  addTask: (payload: CreateTaskPayload) => void;
  setColumn: (columnId: ColumnEnum, column: ColumnType) => void;
  updateCardStatus: (cardId: string, status: ColumnEnum) => void;
  isLoading?: boolean;
  isAdding?: boolean;
};

const ColumnLoader = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="bg-neutral-800 h-32 w-full mt-2 mb-3" />
      <Skeleton className="bg-neutral-800 h-32 w-full mt-2 mb-3" />
      <Skeleton className="bg-neutral-800 h-32 w-full mt-2 mb-3" />
    </div>
  );
};

const Column = ({
  cards,
  column,
  color,
  setColumn,
  title,
  updateCardStatus,
  addTask,
  isLoading = false,
  isAdding = false,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const { draggedItem, setDraggedItem } = useBoardStore();

  const indicatorColor = `bg-${color}` satisfies TwBackgroundColor;

  const updateColumn = (cards: TaskType[]) => {
    const newColumn = {
      id: column,
      tasks: cards,
    } satisfies ColumnType;
    setColumn(column, newColumn);
  };

  const handleDragStart = (e: DragEvent, card: TaskType) => {
    e.dataTransfer.setData("cardId", card.id);
    setDraggedItem(card);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    setActive(false);

    if (!draggedItem) return;
    const cardId = draggedItem.id;
    const indicators = getIndicators(column);
    const { element: el } = getNearestIndicator(e, indicators);
    const before = el.dataset.before || "-1";
    if (before === cardId) {
      return;
    }

    let copy = [...cards];

    const isDifferentColumn = draggedItem?.status !== column;
    if (isDifferentColumn) {
      updateCardStatus(cardId, column);
      setDraggedItem();
      updateColumn(copy);
      return;
    }

    copy = reorder(copy, draggedItem, before);
    setDraggedItem();
    updateColumn(copy);
  };

  return (
    <div
      className={`w-56 gap-2 h-full transition-colors shrink-0 pt-12 flex flex-col ${
        active ? "bg-neutral-800/50" : "bg-neutral-800/0"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-4 px-2">
        <h3 className={`font-medium flex gap-2 items-center`}>
          <span className={`rounded-full h-2 w-2 ${indicatorColor}`}></span>
          {title}
        </h3>
        <span className="bg-neutral-800 rounded-full flex items-center justify-center h-7 w-7 text-center text-sm">
          {cards.length}
        </span>
      </div>
      <TaskFormModal isAdding={isAdding} closeAfterSubmit onSubmit={addTask} />
      {isLoading ? (
        <ColumnLoader />
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragEnd}
          className={`h-full w-full`}
        >
          {cards.map((card) => (
            <Task key={card.id} item={card} handleDragStart={handleDragStart} />
          ))}
          <DropIndicator fullHeight beforeId="-1" column={column} />
        </div>
      )}
    </div>
  );
};

export default Column;

import { useState } from "react";
import AddCard from "./add-task-button";
import Task from "./task";
import DropIndicator from "./drop-indicator";
import { TwTextColor } from "@/utils";
import { Column, ColumnEnum, Task as TaskType } from "@/models";
import { getIndicators, getNearestIndicator, reorder } from "./utils";
import { useBoardStore } from "@/store";

type DragEvent = React.DragEvent<HTMLDivElement>;

type ColumnProps = {
  title: string;
  headingColor: TwTextColor;
  column: ColumnEnum;
  cards: TaskType[];
  setColumn: (columnId: ColumnEnum, column: Column) => void;
};

const Column = ({
  cards,
  column,
  headingColor,
  setColumn,
  title,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [movingCard, setMovingCard] = useState<TaskType | null>(null);
  const { board } = useBoardStore();
  const allItems = Object.values(board.columns).reduce<TaskType[]>(
    (acc, item) => {
      return [...acc, ...item.tasks];
    },
    []
  );
  console.log(allItems);
  const updateColumn = (cards: TaskType[]) => {
    const newColumn = {
      id: column,
      tasks: cards,
    } satisfies Column;
    setColumn(column, newColumn);
  };

  const updateCardStatus = (card: TaskType, list: TaskType[]) => {
    card.status = column;
    const copy = list.filter((item) => item.id !== card.id);
    copy.push(card);
    return copy;
  };

  const handleDragStart = (e: DragEvent, card: TaskType) => {
    console.log(card);
    e.dataTransfer.setData("cardId", card.id);
    setMovingCard(card);
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
    const cardId = movingCard?.id || e.dataTransfer.getData("cardId");
    console.log(cardId);
    const indicators = getIndicators(column);
    const { element: el } = getNearestIndicator(e, indicators);
    const before = el.dataset.before || "-1";
    if (before === cardId) {
      return;
    }

    let copy = [...cards];
    const cardToTransfer = allItems.find((card) => card.id === cardId);
    copy.forEach((item) => console.log(item.id, cardId));
    console.log(cardToTransfer);
    if (!cardToTransfer) return;

    const isDifferentColumn = !movingCard && cardId;
    if (isDifferentColumn) {
      copy = updateCardStatus(cardToTransfer, copy);
      setMovingCard(null);
      updateColumn(copy);
      return;
    }

    copy = reorder(copy, cardToTransfer, before);
    setMovingCard(null);
    updateColumn(copy);
  };

  const addNewCard = (card: TaskType) => {
    updateColumn([...cards, card]);
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{cards.length}</span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        <AddCard column={column} setCards={addNewCard} />
        {cards.map((card) => (
          <Task key={card.id} item={card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator fullHeight beforeId="-1" column={column} />
      </div>
    </div>
  );
};

export default Column;

import { useState } from "react";
import AddCard from "./add-task-button";
import Task from "./task";
import DropIndicator from "./drop-indicator";
import { Color as TwColor, TwTextColor } from "@/utils";
import { Column as ColumnType, ColumnEnum, Task as TaskType } from "@/models";
import { getIndicators, getNearestIndicator, reorder } from "./utils";
import { useBoardStore } from "@/store";

type DragEvent = React.DragEvent<HTMLDivElement>;

type ColumnProps = {
  title: string;
  color: TwColor;
  column: ColumnEnum;
  cards: TaskType[];
  setColumn: (columnId: ColumnEnum, column: ColumnType) => void;
};

const Column = ({ cards, column, color, setColumn, title }: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [movingCard, setMovingCard] = useState<TaskType | null>(null);
  const { board } = useBoardStore();
  const allItems = Object.values(board.columns).reduce<TaskType[]>(
    (acc, item) => {
      return [...acc, ...item.tasks];
    },
    []
  );

  const headingColor = `text-${color}` satisfies TwTextColor;

  const updateColumn = (cards: TaskType[]) => {
    const newColumn = {
      id: column,
      tasks: cards,
    } satisfies ColumnType;
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
    <div
      className={`w-56 h-full transition-colors shrink-0 pt-12 ${
        active ? "bg-neutral-800" : "bg-neutral-800/0"
      }`}
    >
      <div className="mb-3 flex items-center gap-4 px-2">
        <h3 className={`font-medium  ${headingColor}`}>{title}</h3>
        <span className="bg-neutral-800 rounded-full flex items-center justify-center h-7 w-7 text-center text-sm">
          {cards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full`}
      >
        {/* <AddCard column={column} setCards={addNewCard} /> */}
        {cards.map((card) => (
          <Task key={card.id} item={card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator fullHeight beforeId="-1" column={column} />
      </div>
    </div>
  );
};

export default Column;

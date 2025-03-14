import { useState } from "react";
import AddCard from "./add-task-button";
import Task from "./task";
import DropIndicator from "./drop-indicator";
import { TwTextColor } from "@/utils";
import { ColumnEnum, Task as TaskType } from "@/models";

type DragEvent = React.DragEvent<HTMLDivElement>;

type ColumnProps = {
  title: string;
  headingColor: TwTextColor;
  column: ColumnEnum;
  cards: TaskType[];
  setCards: (args: TaskType[]) => void;
};

const Column = ({
  cards,
  column,
  headingColor,
  setCards,
  title,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [draggingCardColumn, setDraggingCardColumn] = useState("");
  const filteredCards = cards.filter((card) => card.status === column);

  const handleDragStart = (e: DragEvent, card: TaskType) => {
    e.dataTransfer.setData("cardId", card.id);
    setDraggingCardColumn(card.status);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);

    if (draggingCardColumn === column) {
      el.element.style.opacity = "1";
    }
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getIndicators = () => {
    const indicators = Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    );
    return indicators as HTMLElement[];
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child: HTMLElement) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }

        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e: DragEvent) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators();
    const { element: el } = getNearestIndicator(e, indicators);
    const before = el.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((card) => card.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, status: column };
      copy = copy.filter((card) => card.id !== cardId);
      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const index = copy.findIndex((card) => card.id === before);
        if (index === undefined) return;
        copy.splice(index, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const addNewCard = (card: TaskType) => {
    setCards([...cards, card]);
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
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
        {filteredCards.map((card) => (
          <Task key={card.id} item={card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
      </div>
    </div>
  );
};

export default Column;

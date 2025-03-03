import { useState } from "react";
import AddCard from "./add-task-button";
import Task from "./task";
import DropIndicator from "./drop-indicator";

type ColumnProps = {
  title: string;
  headingColor: string;
  column: any;
  cards: any;
  setCards: (args: any) => void;
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
  const filteredCards = cards.filter((card: any) => card.column === column);

  const handleDragStart = (e: any, card: any) => {
    e.dataTransfer.setData("cardId", card.id);
    setDraggingCardColumn(card.column);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);

    if (draggingCardColumn === column) {
      el.element.style.opacity = "1";
    }
  };

  const clearHighlights = (els?: any) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };

  const getIndicators = () => {
    const indicators = Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    );
    return indicators;
  };

  const getNearestIndicator = (e: any, indicators: Element[]) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest: any, child: Element) => {
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

  const handleDragEnd = (e: any) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators();
    const { element: el } = getNearestIndicator(e, indicators);
    const before = el.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((card: any) => card.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((card: any) => card.id !== cardId);
      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const index = copy.findIndex((card: any) => card.id === before);
        if (index === undefined) return;
        copy.splice(index, 0, cardToTransfer);
      }

      setCards(copy);
    }
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
        <AddCard column={column} setCards={setCards} />
        {filteredCards.map((card: any) => (
          <Task key={card.id} item={card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
      </div>
    </div>
  );
};

export default Column;

import { ColumnEnum, Task } from "@/models";

export const getIndicators = (column: ColumnEnum) => {
  const indicators = Array.from(
    document.querySelectorAll(`[data-column="${column}"]`)
  );
  return indicators as HTMLElement[];
};

export const getNearestIndicator = (
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

export const reorder = (list: Task[], card: Task, before: string) => {
  const copy = list.filter((item) => item.id !== card.id);
  const moveToBack = before === "-1";
  if (moveToBack) {
    copy.push(card);
  } else {
    const index = copy.findIndex((card) => card.id === before);
    if (index === undefined) return list;
    copy.splice(index, 0, card);
  }

  return copy;
};

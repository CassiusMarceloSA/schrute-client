import { ColumnEnum, Task } from "@/models";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  column: ColumnEnum;
  setCards: (args: Task) => void;
};

const AddCard = (props: Props) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim().length) return;

    const newCard = {
      id: Date.now().toString(),
      title: text,
      status: props.column,
      description: "",
      createdAt: new Date(),
      duration: 30,
    } satisfies Task;

    props.setCards(newCard);
    setAdding(false);
    setText("");
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add a new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setText("");
              }}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button className="flex rounded items-center gap-1.5 px-3 py-1.5 text-xs bg-neutral-50 text-neutral-950 transition-colors hover:bg-neutral-300">
              <span>Add Card</span>
              <Plus size={14} />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <Plus size={14} />
        </button>
      )}
    </>
  );
};

export default AddCard;

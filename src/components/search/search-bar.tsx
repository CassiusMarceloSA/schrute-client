import { useDebounce, useFetchTasks } from "@/hooks";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../shared";
import { SearchContent } from "./search-content";
import { Task } from "@/models";
import { TaskModal } from "../task-modal/task-modal";

const Overlay = ({
  active,
  children,
  ...props
}: {
  active: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 h-screen w-screen z-40 bg-black/70 grid place-items-center",
        {
          "pointer-events-none opacity-0": !active,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [term, setTerm] = useState("");
  const debouncedQuery = useDebounce(term, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: tasks, refetch } = useFetchTasks({
    enabled: false,
    query: debouncedQuery,
    queryKey: "filtered-tasks",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }, []);

  const handleActive = () => {
    if (active) return;
    setActive(true);
  };

  const handleSelectedTask = (task: Task) => {
    setSelectedTask(task);
    setOpenTaskModal(true);
  };

  const resetSelectedTask = () => {
    setSelectedTask(null);
    setOpenTaskModal(false);
  };

  const reset = useCallback(() => {
    setActive(false);
    setTerm("");
  }, []);

  const checkIsEditableElement = () => {
    const element = document.activeElement;
    return element?.tagName === "INPUT" || element?.tagName === "TEXTAREA";
  };

  const handlePress = useCallback(
    (e: KeyboardEvent) => {
      const isSlashKey = e.key === "/";
      if (isSlashKey) {
        if (checkIsEditableElement()) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      const isEscapeKey = e.key === "Escape";
      if (isEscapeKey) {
        reset();
        inputRef.current?.blur();
        return;
      }
    },
    [reset]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress);
    };
  }, [handlePress]);

  useEffect(() => {
    if (debouncedQuery) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  return (
    <>
      <Overlay
        active={active}
        onClick={(e) => {
          const element = e.target as HTMLElement;
          if (element.tagName === "DIV") {
            reset();
          }
        }}
      >
        <SearchContent
          tasks={tasks || []}
          setSelectedTask={handleSelectedTask}
        />
        <TaskModal
          task={selectedTask}
          open={openTaskModal}
          onClose={resetSelectedTask}
        />
      </Overlay>
      <Input.Container
        className={cn("w-auto", {
          "bg-purple-900": active,
          "border-purple-800": active,
          "z-50": active,
        })}
      >
        <Search size={18} />
        <Input.Field
          autoComplete="off"
          onFocus={handleActive}
          onChange={handleChange}
          value={term}
          className={cn("transition-all", {
            "w-96": active,
            "placeholder:text-neutral-200": active,
          })}
          name="search"
          placeholder="Search..."
          ref={inputRef}
        />
      </Input.Container>
    </>
  );
};
export default SearchBar;
